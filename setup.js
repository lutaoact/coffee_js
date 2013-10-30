var util = require('util');
var async = require('async');
var notesdb = require('./notesdb-sqlite3');

notesdb.connect(function(err) {
    if (err) throw err;
});

notesdb.setup(function(err) {
    if (err) {
        util.log('ERROR ' + err);
        throw err;
    }
    async.series([
        function(cb) {
            notesdb.add(
                'Lorem Ipsum ',
                'CRAS metus. SEd aliquet risus a tortor.',
                function(error) {
                    if (error) util.log('ERROR ' + error);
                    cb(error);
                }
            );
        }
    ], function(error, result) {
        if (error) util.log('ERROR ' + error);
        notesdb.disconnect(function(err) {});
    });
});
