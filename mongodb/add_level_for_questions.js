var count = 0;
db.questions.find().forEach(function(question) {
  count += 3;
  db.questions.update({_id: question._id}, {$set: {level: count % 100}});
});
