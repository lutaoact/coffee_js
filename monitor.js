var myInitializer = require('../../ngCore/src/core/initializers/mysqlInitializer');
var serviceInitializer = require('../../config/initializers/serviceInitializer');
var modelInitializer = require('../../config/initializers/modelInitializer');
var mgServerInitializer = require('../../config/initializers/mgServerInitializer');
var async = require('async');
var Filter = require('../../app/controllers/Filter');
var _ = require('underscore');

function Run(cb) {
    var configPath = process.argv[4];//absolute path

    async.waterfall([
        function(next) {
            logger.info('initialize');
            init(next);
        },
        function(req, next) {
            startMonitor(req, configPath, next);
        },
        function(next) {
            logger.info('done');
            next();
        },
    ], function(err, res) {
        if (err) {
            logger.info(err);
        }

        setTimeout(function() {
            process.exit(0);
        }, 10000);
    });
}

function startMonitor(req, configPath, cb) {
    var MonitorService = req.getService('MonitorService');
    MonitorService.startMonitor(require(configPath), cb);
}

function init(cb) {
    var req = {};
    async.series([
        function(next) {
            myInitializer.init(next);
        },
        function(next) {
            serviceInitializer.init(next);
        },
        function(next) {
            modelInitializer.init(next);
        },
        function(next) {
            mgServerInitializer.init(next);
        },
        function(next) {
            Filter.beforeInitClient(req, {}, next);
        },
        function(next) {
            Filter.beforeInitVersion(req, {}, next);
        },
        function(next) {
            Filter.beforeExtendRequest(req, {}, next);
        },
        function(next) {
            next(null, req);
        }
    ], function(err, res){
        if (err)
            cb(err);
        else
            cb(null, res[res.length-1]);
    });
}

function inputConfirm(message, cb) {
    logger.info(message);
    var stdin = process.openStdin();
    stdin.setEncoding('utf8');
    stdin.on('data', function(chunk){
        if (chunk.indexOf('yes') !== -1) {
            stdin.destroy();
            cb();
        } else {
            logger.info('Canceled!');
            process.exit();
        }
    });
}

exports.Run = Run;
