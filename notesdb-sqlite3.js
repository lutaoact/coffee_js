var util = require('util');
var sqlite3 = require('sqlite3');
sqlite3.verbose();
var db = undefined;
exports.connect = function(callback) {
    db = new sqlite3.Database(
        "chap06.sqlite3",
        sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
        function(err) {
            if (err) {
                util.log('FAIL on creating database ' + err);
                callback(err);
            } else {
                util.log('success on creating database');
                callback(null);
            }
        }
    );
};

exports.disconnect = function(callback) {
    callback(null);
};

exports.setup = function(callback) {
    db.run(
        "create table if not exists notes (ts DATETIME, author VARCHAR(255), note TEXT);",
        function(err) {
            if (err) {
                util.log('FAIL on creating table ' + err);
                callback(err);
            } else {
                util.log('success on creating table');
                callback(null);
            }
        }
    );
};

exports.emptyNote = { ts: '', author: '', note: '' };
exports.add = function(author, note, callback) {
    db.run(
        "INSERT INTO notes values(?, ?, ?);",
        [new Date(), author, note],
        function (error) {
            if (error) {
                util.log('FAIL to add ' + error);
                callback(error);
            } else {
                util.log('success to add');
                callback(null);
            }
        }
    );
};

exports.delete = function(ts, callback) {
    db.run(
        "delete from notes where ts = ?;",
        [ ts ],
        function(err) {
            if (err) {
                util.log('Fail to delete ' + err);
                callback(err);
            } else {
                callback(null);
            };
        }
    );
};

exports.edit = function(ts, author, note, callback) {
    db.run(
        'update notes set ts = ?, author = ?, note = ? where ts = ?',
        [ ts, author, note, ts ],
        function(err) {
            if (err) {
                util.log('Fail to edit ' + err);
                callback(err);
            } else {
                callback(null);
            };
        }
    );
}

exports.allNotes = function(callback) {
    util.log(' in allNotes');
    db.all('select * from notes', callback);
};

exports.forAll = function(doEach, done) {
    db.each(
        'select * from notes',
        function(err, row) {
            if (err) {
                util.log('FAIL to retrieve row' + err);
                done(err, null);
            } else {
                doEach(null, row);
            }
        },
        done
    );
};

exports.findNoteById = function(ts, callback) {
    db.each(
        'select * from notes where ts = ? ',
        [ ts ],
        function(err, row) {
            if (err) {
                util.log('FAIL to retrieve row' + err);
                callback(err, null);
            } else {
                callback(null, row);
            }
        }
    );
};
