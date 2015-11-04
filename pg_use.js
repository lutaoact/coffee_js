var pg = require('pg');
var conString = "postgres://sequelize@localhost/development";
var async = require('async');

/*
//this initializes a connection pool
//it will keep idle connections open for a (configurable) 30 seconds
//and set a limit of 20 (also configurable)
pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT $1::int AS number', ['1'], function(err, result) {
    //call `done()` to release the client back to the pool
    done();

    if(err) {
      return console.error('error running query', err);
    }
    console.log(result);
    console.log(result.rows[0].number);
    //output: 1
  });
});
*/

var QueryStream = require('pg-query-stream')
var JSONStream = require('JSONStream')

//pipe 1,000,000 rows to stdout without blowing up your memory usage
pg.connect(conString, function(err, client, done) {
  if(err) throw err;
//  var query = new QueryStream('SELECT * FROM generate_series(0, $1) num', [1000000]);
  var query = new QueryStream('SELECT * FROM trade_records WHERE "paidAt" IS NULL');
  var stream = client.query(query);
  //release the client when the stream is finished
  stream.on('end', done);
  stream.on('error', function(err) {
    console.log(err);
    done(err);
  });
  stream.on('data', function(data) {
    console.log(data);
  });
//  stream.pipe(function(data) {
//    console.log(data);
//  });
//  stream.pipe(JSONStream.stringify()).pipe(process.stdout)
})
