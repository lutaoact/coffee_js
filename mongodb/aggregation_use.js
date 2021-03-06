/** $group **/
db.sales.save({ "_id" : 1, "item" : "abc", "price" : 10, "quantity" : 2, "date" : ISODate("2014-03-01T08:00:00Z") });
db.sales.save({ "_id" : 2, "item" : "jkl", "price" : 20, "quantity" : 1, "date" : ISODate("2014-03-01T09:00:00Z") });
db.sales.save({ "_id" : 3, "item" : "xyz", "price" : 5, "quantity" : 10, "date" : ISODate("2014-03-15T09:00:00Z") });
db.sales.save({ "_id" : 4, "item" : "xyz", "price" : 5, "quantity" : 20, "date" : ISODate("2014-04-04T11:21:39.736Z") });
db.sales.save({ "_id" : 5, "item" : "abc", "price" : 10, "quantity" : 10, "date" : ISODate("2014-04-04T21:23:13.331Z") });

db.sales.aggregate(
   [
      {
        $group : {
           _id : { month: { $month: "$date" }, day: { $dayOfMonth: "$date" }, year: { $year: "$date" } },
           totalPrice: { $sum: { $multiply: [ "$price", "$quantity" ] } },
           averageQuantity: { $avg: "$quantity" },
           count: { $sum: 1 }
        }
      }
   ]
);
db.sales.aggregate( [ { $group : { _id : "$item" } } ] );
db.sales.aggregate(
   [
      {
        $group : {
           _id : null,
           totalPrice: { $sum: { $multiply: [ "$price", "$quantity" ] } },
           averageQuantity: { $avg: "$quantity" },
           count: { $sum: 1 }
        }
      }
   ]
);
//日期操作
db.sales.aggregate(
   [
     {
       $project:
         {
           year: { $year: "$date" },
           month: { $month: "$date" },
           day: { $dayOfMonth: "$date" },
           hour: { $hour: "$date" },
           minutes: { $minute: "$date" },
           seconds: { $second: "$date" },
           milliseconds: { $millisecond: "$date" },
           dayOfYear: { $dayOfYear: "$date" },
           dayOfWeek: { $dayOfWeek: "$date" },
           week: { $week: "$date" }
         }
     }
   ]
);

db.books.save({ "_id" : 8751, "title" : "The Banquet", "author" : "Dante", "copies" : 2 });
db.books.save({ "_id" : 8752, "title" : "Divine Comedy", "author" : "Dante", "copies" : 1 });
db.books.save({ "_id" : 8645, "title" : "Eclogues", "author" : "Dante", "copies" : 2 });
db.books.save({ "_id" : 7000, "title" : "The Odyssey", "author" : "Homer", "copies" : 10 });
db.books.save({ "_id" : 7020, "title" : "Iliad", "author" : "Homer", "copies" : 10 });

db.books.aggregate(
   [
     { $group : { _id : "$author", books: { $push: "$title" } } }//得到title数组
   ]
);
db.books.aggregate(
   [
     { $group : { _id : "$author", books: { $push: "$$ROOT" } } }//使用$$ROOT系统变量
   ]
);
db.books.aggregate( [
                      { $group : { _id : "$author", books: { $push: "$title" } } },
                      { $out : "authors" }//写入collection
                  ] );


/** group命令 **/
db.orders.save({
  _id: ObjectId("5085a95c8fada716c89d0021"),
  ord_dt: ISODate("2012-07-01T04:00:00Z"),
  ship_dt: ISODate("2012-07-02T04:00:00Z"),
  item:
    {
      sku: "abc123",
      price: 1.99,
      uom: "pcs",
      qty: 25
    }
});
db.runCommand(
   {
     group:
       {
         ns: 'orders',
         $keyf: function(doc) {
                    return { day_of_week: doc.ord_dt.getDay() };
                },
         cond: { ord_dt: { $gt: new Date( '01/01/2012' ) } },
         $reduce: function( curr, result ) {
                      result.total += curr.item.qty;
                      result.count++;
                  },
         initial: { total : 0, count: 0 },
         finalize: function(result) {
                      var weekdays = [
                           "Sunday", "Monday", "Tuesday",
                           "Wednesday", "Thursday",
                           "Friday", "Saturday"
                          ];
                      result.day_of_week = weekdays[result.day_of_week];
                      result.avg = Math.round(result.total / result.count);
                   }
       }
   }
);

/** $and **/
db.inventory.save({ "_id" : 1, "item" : "abc1", description: "product 1", qty: 300 });
db.inventory.save({ "_id" : 2, "item" : "abc2", description: "product 2", qty: 200 });
db.inventory.save({ "_id" : 3, "item" : "xyz1", description: "product 3", qty: 250 });
db.inventory.save({ "_id" : 4, "item" : "VWZ1", description: "product 4", qty: 300 });
db.inventory.save({ "_id" : 5, "item" : "VWZ2", description: "product 5", qty: 180 });

db.inventory.aggregate(
   [
     {
       $project:
          {
            item: 1,
            qty: 1,
            result: { $and: [ { $gt: [ "$qty", 100 ] }, { $lt: [ "$qty", 250 ] } ] },
            testField: { $and: [ '', { $lt: [ "$qty", 250 ] } ] }//空字符串为true
          }
     }
   ]
);

/** $setIsSubset **/
db.experiments.save({ "_id" : 1, "A" : [ "red", "blue" ], "B" : [ "red", "blue" ] });
db.experiments.save({ "_id" : 2, "A" : [ "red", "blue" ], "B" : [ "blue", "red", "blue" ] });
db.experiments.save({ "_id" : 3, "A" : [ "red", "blue" ], "B" : [ "red", "blue", "green" ] });
db.experiments.save({ "_id" : 4, "A" : [ "red", "blue" ], "B" : [ "green", "red" ] });
db.experiments.save({ "_id" : 5, "A" : [ "red", "blue" ], "B" : [ ] });
db.experiments.save({ "_id" : 6, "A" : [ "red", "blue" ], "B" : [ [ "red" ], [ "blue" ] ] });
db.experiments.save({ "_id" : 7, "A" : [ "red", "blue" ], "B" : [ [ "red", "blue" ] ] });
db.experiments.save({ "_id" : 8, "A" : [ ], "B" : [ ] });
db.experiments.save({ "_id" : 9, "A" : [ ], "B" : [ "red" ] });

db.experiments.aggregate(
   [
     { $project: { A:1, B: 1, AisSubset: { $setIsSubset: [ "$A", "$B" ] }, _id:0 } }
   ]
);

/** $divide **/
db.planning.save({ "_id" : 1, "name" : "A", "hours" : 80, "resources" : 7 });
db.planning.save({ "_id" : 2, "name" : "B", "hours" : 40, "resources" : 4 });

db.planning.aggregate(
   [
     { $project: { name: 1, workdays: { $divide: [ "$hours", 9 ] } } }
   ]
);

/** $meta **/
db.articles.save({ "_id" : 1, "title" : "cakes and ale" });
db.articles.save({ "_id" : 2, "title" : "more cakes" });
db.articles.save({ "_id" : 3, "title" : "bread" });
db.articles.save({ "_id" : 4, "title" : "some cakes" });

db.articles.createIndex( { title: "text" } );

db.articles.aggregate(
   [
     { $match: { $text: { $search: "cake" } } },
     { $sort: { score: { $meta: "textScore" } } },//根据评分排序
     { $project: { title: 1, _id: 0, score: { $meta: "textScore" } } },//查看分数
   ]
);
db.articles.aggregate(
   [
     { $match: { $text: { $search: "cake" } } },
     { $group: { _id: { $meta: "textScore" }, count: { $sum: 1 } } }
   ]
);

db.grades.save({ "_id" : 3, "quizzes" : [ 3, 8, 9 ] });
db.grades.save({ "_id" : 1, "quizzes" : [ 5, 6, 7 ] });

//Using a simple $map:
db.grades.aggregate([{
  $project: {
    adjustedGrades: {
      $map: {
        input: "$quizzes",
        as: "grade",
        in: { $add: [ "$$grade", 2 ] }
      }
    }
  }
}]);
db.grades.aggregate([{
  $project: {
    adjustedGrades: {
      $map: {
        input: "$quizzes",
        as: "grade",
        in: {
          $let: {
            vars: { varin: "$$grade" },
            in: { $add: [ "$$varin", 4 ] }
          }
        }
      }
    }
  }
}]);

db.orders.aggregate([{
  $group: {
    _id: '$cellphone',
    count: {$sum: 1}
  },
}, {
  $sort: {count: -1}
}, {
  $limit: 10,
}]);

db.forecasts.save({
  _id: 1,
  title: "123 Department Report",
  tags: [ "G", "STLW" ],
  year: 2014,
  subsections: [
    {
      subtitle: "Section 1: Overview",
      tags: [ "SI", "G" ],
      content:  "Section 1: This is the content of section 1."
    },
    {
      subtitle: "Section 2: Analysis",
      tags: [ "STLW" ],
      content: "Section 2: This is the content of section 2."
    },
    {
      subtitle: "Section 3: Budgeting",
      tags: [ "TK" ],
      content: {
        text: "Section 3: This is the content of section3.",
        tags: [ "HCS" ]
      }
    }
  ]
});
var userAccess = [ "STLW", "G" ];
db.forecasts.aggregate(
   [
     { $match: { year: 2014 } },
     { $redact: {
        $cond: {
           if: { $gt: [ { $size: { $setIntersection: [ "$tags", userAccess ] } }, 0 ] },
           then: "$$DESCEND",
           else: "$$PRUNE"
         }
       }
     }
   ]
);

db.forecasts.aggregate(
   [
     { $match: { year: 2014 } },
     { $redact: {
        $cond: {
           if: { $gt: [ { $size: { $setIntersection: [ "$tags", userAccess ] } }, 0 ] },
           then: "$$PRUNE",
           else: "$$KEEP"
         }
       }
     }
   ]
);

db.forecasts.aggregate([{
  $match: { year: 2014 }
}, {
  $redact: {$cond: {
    if: {
      $or: [{
        $not: '$tags'
      }, {
        $gt: [
          {$size: { $setIntersection: [ "$tags", userAccess ] } },
          0
        ]
      }]
    },
    then: '$$DESCEND',
    else: '$$PRUNE'
  }}
}]);

db.forecasts.aggregate([{
  $match: { year: 2014 }
}, {
  $redact: {$cond: {
//    if: {
//      $not: "$tags"
//    },
    if: "$tags",
    then: '$$PRUNE',
    else: '$$DESCEND'
  }}
}]);
db.forecasts.aggregate([{
  $match: { year: 2014, tags: null}
}]);
