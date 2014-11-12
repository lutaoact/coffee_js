var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://localhost/ft').connection;

var Schema = mongoose.Schema;
var schema = new Schema({name: String, value: Number});

schema.post('save', function (doc) {
  console.log('this fired after a document was saved');
});

var Model = mongoose.model('model', schema);

var m = new Model({name: 'hello', value: 10});
m.save(function (err) {
  console.log('this fired after the `post` hook');
});
