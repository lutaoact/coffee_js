var Service = require('./Service').Service;
var _ = require('underscore');
var sendmailAll = require('../../lib/util').sendmailAll;

exports.MonitorService = Service.subclass({
    classname: 'MonitorService',

    startMonitor: function(monitorConfig, cb) {
        var worldIds = _.keys(monitorConfig);
        this.forEachSeries(worldIds, function(worldId, next) {
            this.seriesCallMonitorFunc(monitorConfig, worldId, next);
        }, function(err, res) {
            if (err) {
                this.handleError('startMonitor', err);
            }
            cb(err);
        });
    },

    seriesCallMonitorFunc : function(monitorConfig, worldId, cb) {
        var self = this;
        this.forEachSeries(monitorConfig[worldId], function(monitor, next) {
            this.callMonitorFunc(worldId, monitor, function(err, res) {
                if (err) {
                    self.handleError(monitor.func, err, worldId);
                }
                next();
            });
        }, cb);
    },

    callMonitorFunc: function(worldId, monitor, cb) {
        monitor.params.unshift(worldId);
        monitor.params.push(cb);
        this[monitor.func].apply(this, monitor.params);
    },

    monitorExpenseLog: function(worldId, timeSpan, cb) {
        var ActiveModel = this.model('ActiveModel');
        ActiveModel.query(
            'read',
            'select count(*) as count from sango_' + worldId + '.expense_log where bought_at > unix_timestamp() - ?',
            [timeSpan],
            function(err, res) {
                if (err) {
                    cb(err);
                    return;
                }

                if (!res[0].count) {
                    cb(timeSpan / 3600 + '小时之内，未出现元宝消费记录');
                    return;
                }

                cb();
            }
        );
    },

    monitorBankTranStatus : function(worldId, timeSpan, cb) {
        var ActiveModel = this.model('ActiveModel');
        ActiveModel.query(
            'read',
            'select count(*) as count from sango_' + worldId + '.bank_tran_status where reg_date > unix_timestamp() - ?',
            [timeSpan],
            function(err, res) {
                if (err) {
                    cb(err);
                    return;
                }

                if (!res[0].count) {
                    cb(timeSpan / 3600 + '小时之内，未出现充值记录');
                    return;
                }

                cb();
            }
        );
    },

    monitorGachaLog : function(worldId, timeSpan, cb) {
        var ActiveModel = this.model('ActiveModel');
        ActiveModel.query(
            'read',
            'select count(*) as count from sango_' + worldId + '.gacha_log where created_at > unix_timestamp() - ?',
            [timeSpan],
            function(err, res) {
                if (err) {
                    cb(err);
                    return;
                }

                if (!res[0].count) {
                    cb(timeSpan / 3600 + '小时之内，未出现招募记录');
                    return;
                }

                cb();
            }
        );
    },

    monitorUserCard : function(worldId, timeSpan, cb) {
        var ActiveModel = this.model('ActiveModel');
        ActiveModel.query(
            'read',
            'select count(*) as count from sango_' + worldId + '.user_card where updated_at > unix_timestamp() - ?',
            [timeSpan],
            function(err, res) {
                if (err) {
                    cb(err);
                    return;
                }

                if (!res[0].count) {
                    cb(timeSpan / 3600 + '小时之内，没有出现变强（升强、强化、进阶、分解）记录');
                    return;
                }

                cb();
            }
        );
    },

    monitorUserLogin : function(worldId, timeSpan, cb) {
        var ActiveModel = this.model('ActiveModel');
        ActiveModel.query(
            'read',
            'select count(*) as count from sango_' + worldId + '.user where updated_at > unix_timestamp() - ?',
            [timeSpan],
            function(err, res) {
                if (err) {
                    cb(err);
                    return;
                }

                if (!res[0].count) {
                    cb(timeSpan / 60 + '分钟之内，没有新用户登录');
                    return;
                }

                cb();
            }
        );
    },

    monitorServerError : function(worldId, timeSpan, cb) {
        var ActiveModel = this.model('ActiveModel');
        ActiveModel.query(
            'read',
            'select count(*) as count from sango_' + worldId + '.server_error where created_at > unix_timestamp() - ?',
            [timeSpan],
            function(err, res) {
                if (err) {
                    cb(err);
                    return;
                }

                if (res[0].count >= 10) {
                    cb(timeSpan / 3600 + '小时之内，服务器错误爆表');
                    return;
                }

                cb();
            }
        );
    },

    monitorClientError : function(worldId, timeSpan, cb) {
        var ActiveModel = this.model('ActiveModel');
        ActiveModel.query(
            'read',
            'select count(*) as count from sango_' + worldId + '.client_error where created_at > unix_timestamp() - ?',
            [timeSpan],
            function(err, res) {
                if (err) {
                    cb(err);
                    return;
                }

                if (res[0].count >= 10) {
                    cb(timeSpan / 3600 + '小时之内，客户端错误爆表');
                    return;
                }

                cb();
            }
        );
    },


    handleError : function(monitorName, err, worldId) {
        logger.error(
            'monitorError:' + monitorName + " worldId:" + worldId + " " + err
        );
        sendmailAll(
            'monitorError:' + monitorName + " worldId:" + worldId + " region:" + process.env.NODE_ENV.substr(0,2), err
        );
    },
});
