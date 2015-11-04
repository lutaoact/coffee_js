db.students.save({ "_id" : 1, "semester" : 1, "grades" : [ 70, 87, 90 ] });
db.students.save({ "_id" : 2, "semester" : 1, "grades" : [ 90, 88, 92 ] });
db.students.save({ "_id" : 3, "semester" : 1, "grades" : [ 85, 100, 90 ] });
db.students.save({ "_id" : 4, "semester" : 2, "grades" : [ 79, 85, 80 ] });
db.students.save({ "_id" : 5, "semester" : 2, "grades" : [ 88, 88, 92 ] });
db.students.save({ "_id" : 6, "semester" : 2, "grades" : [ 95, 90, 96 ] });

db.students.find({semester: 1, grades: {$gte: 85}}, {"grades.$": 1});
