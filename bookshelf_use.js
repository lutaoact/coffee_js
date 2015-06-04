'use strict';
var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : '127.0.0.1',
    user     : 'development',
    password : '',
    database : 'mydb2'
  }
});

var bookshelf = require('bookshelf')(knex);

var Weather = bookshelf.Model.extend({
  tableName: 'weather',
  hasTimestamps: ['createdAt', 'updatedAt'],
});

//Weather.fetchAll().then(function(weathers) {
//  console.log(weathers.toJSON());
//});

//Weather.where({temp_hi: 55}).fetchAll().then(function(weathers) {
//  console.log(weathers.toJSON());
//});

//Weather.where('temp_lo', '>', 30).fetchAll().then(function(weathers) {
//  console.log(weathers.toJSON());
//});

Weather.query(function(qb) {
  qb.where('temp_lo', '>', 30).andWhere('temp_lo', '<', 40);
}).fetchAll().then(function(weathers) {
  console.log(weathers.toJSON());
  console.log(weathers);
});


//var User = bookshelf.Model.extend({
//  tableName: 'users'
//});
//
//var Summary = bookshelf.Model.extend({tableName: 'summaries'});
//
//var Author = bookshelf.Model.extend({tableName: 'authors'});
//
//var Owner  = bookshelf.Model.extend({tableName: 'owners'});
//
//var Pages  = bookshelf.Model.extend({tableName: 'pages'});
//
//var Book = bookshelf.Model.extend({
//  summary: function() {
//    return this.hasOne(Summary);
//  },
//  owner: function() {
//    return this.belongsTo(Owner);
//  },
//  pages: function() {
//    return this.hasMany(Pages);
//  },
//  author: function() {
//    return this.belongsToMany(Author);
//  }
//});
//
//new Book({id: 1}).related('summary').fetch().then(function(summary) {
//  console.log(summary.toJSON());
//});
//
//// or:
//
//new Book({id: 1}).summary().fetch().then(function(summary) {
//  console.log(summary.toJSON());
//});
