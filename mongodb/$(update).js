db.students.save({
  _id: 4,
  grades: [
     { grade: 80, mean: 75, std: 8 },
     { grade: 85, mean: 90, std: 5 },
     { grade: 90, mean: 85, std: 3 }
  ]
});

db.students.update(
   { _id: 4, "grades.grade": 85 },
   { $set: { "grades.$.std" : 6 } }
);

db.students.find({"grades.grade": 85}, {"grades.$.std": 1});
