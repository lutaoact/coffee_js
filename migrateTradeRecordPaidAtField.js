'use strict';

var _ = require('underscore');
var async = require('async');
var moment = require('moment');
var pg = require('pg');
var QueryStream = require('pg-query-stream')

var constants = require('../config/constants');
var config = require('../config/config');
var _u = require('../helpers/utils');
var TradeRecord = _u.getModel('tradeRecord');

var inProduction = process.env.NODE_ENV === 'production';
var bulkSize = inProduction ? 1000 : 10;

pg.connect(config.postgres, function(err, client, done) {
  if(err) throw err;

  var wrongIds = [];
  var queue = async.queue(function(doc, _cb) {
    if (!doc.notifyInfo) {
      wrongIds.push(doc._id);
      return _cb();
    }
    var paidAt;
    switch (doc.payType) {
      case 'tenpay':
      case 'wxpay':
        paidAt = moment(doc.notifyInfo.time_end, 'YYYYMMDDHHmmss');
        break;
      case 'alipay':
      case 'alipaywap':
        paidAt = moment(doc.notifyInfo.notify_time, 'YYYY-MM-DD HH:mm:ss');
        break;
    }
    console.log(paidAt.toString());
    TradeRecord.updateOne({paidAt: paidAt}, {_id: doc._id}).nodeify(function(err) {
      if (err) console.log(err);
      _cb();
    });
  }, 100);

  var query = new QueryStream('SELECT _id, "payType", "paidAt", "notifyInfo" FROM trade_records WHERE "payType" IN (\'tenpay\', \'wxpay\', \'alipay\', \'alipaywap\') AND "paidAt" IS NULL AND "status" IN (30, 40, 50)');
  var stream = client.query(query);

  queue.drain = function() {
    console.log('now resume ...');
    stream.resume();
  };

  stream.on('end', function() {
    console.log('end');
    queue.drain = function() {
      console.log('wrong id list:', wrongIds);
      done();
    };
  });
  stream.on('error', function(err) {
    console.log(err);
    done(err);
  });
  var i = 0;
  stream.on('data', function(data) {
    console.log(i++);
    queue.push(data, _.noop);
    if (queue.length() > bulkSize) {
      console.log('now pause ...');
      stream.pause();
    }
  });
});
