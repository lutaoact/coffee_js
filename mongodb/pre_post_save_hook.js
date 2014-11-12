var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://localhost/ft').connection;

var Schema = mongoose.Schema;
var schema = new Schema({name: String, value: Number});

schema.pre('save', function (next) {
  console.log(this.isNew);//新文档，这个值为true
  console.log('this fired before a document was saved');
  next();
});

schema.post('save', function (doc) {
  console.log('this fired after a document was saved');
  console.log(this.isNew);//保存之后，这个值始终为false
  console.log(doc);
});

var Model = mongoose.model('model', schema);

var m = new Model({name: 'hello', value: 10});
m.save(function (err) {
  console.log('this fired after the `post` hook');
  Model.findOne({name: 'hello'}, function(err, doc) {
    doc.name = 'good'
    doc.save(function(err) {
      console.log('run finally');
    });
  });
});
