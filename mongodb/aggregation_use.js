/** $group操作 **/
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
)

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
