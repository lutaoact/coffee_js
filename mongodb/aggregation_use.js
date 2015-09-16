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
