//比起聚合管道，自定义的js可以提供更大的灵活性，一般来说，map-reduce会比聚合管道略低效并且更复杂。
//While the custom JavaScript provide great flexibility compared to the aggregation pipeline, in general, map-reduce is less efficient and more complex than the aggregation pipeline.
db.orders.mapReduce(
  function() { emit(this.manicurist, this.real_price); },
  function(key, values) { return Array.sum(values); },
  {
    query: {status: 7, real_price: {$ne: null}},
    out: 'order_totals'
  }
);


/* Pipeline Operators and Indexes */
//$match和$sort操作符出现在管道开始时，可以使用到索引
//The $match and $sort pipeline operators can take advantage of an index when they occur at the beginning of the pipeline.

/**
如果group操作针对的不是已经存在的文档字段，而是运算得出的，则用$keyf关键字代替key
Use $keyf instead of key to group by calculated fields rather than existing document fields.
{
  group:
   {
     ns: <namespace>,
     key: <key>,
     $reduce: <reduce function>,
     $keyf: <key function>,
     cond: <query>,
     finalize: <finalize function>
   }
}
//在mongo shell中，有一个包装方法提供快捷操作，接受的参数是keyf和reduce，而在执行group命令的时候，用的是$keyf和$reduce字段。（真是受不了……）
For the shell, MongoDB provides a wrapper method db.collection.group(). However, the db.collection.group() method takes the keyf field and the reduce field whereas the group command takes the $keyf field and the $reduce field.
*/
/** orders的数据结构
{
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
}
*/
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

/** 操作符列表：
* $project 重塑每个文档，按需求增删字段。每一个输入文档，产生一个输出文档
* $match 使用标准的mongoDB查询
* $let 可以构建临时变量，只在$let中有效
* $map 输入和输出都是一个数组
* $redact Restricts the contents of the documents based on information stored in the documents themselves.（水太深，搞不太明白）
  基于文档自身存储的信息来限制文档内容 $$DESCEND $$PRUNE $$KEEP
* $limit 确定最大的文档传递个数。
* $unwind 解构数组字段，并输出文档，包含所有字段，并会用数组的一个元素来代替之前的数组，所以一个输入文档，可能会产生多个输出文档
* $group 注意与group命令和collection的group快捷操作区分开
*/
var fenFactor = 100;
db.sales.aggregate( [
   {
      $project: {
         finalTotal: {
            $let: {
               vars: {
                  total: { $add: [ '$price', '$tax' ] },
                  discounted: { $cond: { if: '$applyDiscount', then: 0.9, else: 1 } },
                  fenFactor: '$$fenFactor'
               },
               in: { $multiply: [ "$$total", "$$discounted", "$$fenFactor" ] }
            }
         }
      }
   }
] );

db.sales.aggregate( [
   {
      $project: {
         finalTotal: {
          $multiply: [{
             $add: [ '$price', '$tax' ],
          }, {
             $cond: { if: '$applyDiscount', then: 0.9, else: 1 }
          }],
         }
      }
   }
] );
/** $group
_id为必须字段，但是可以将_id设为null来计算所有输入文档的累加值
The _id field is mandatory; however, you can specify an _id value of null to calculate accumulated values for all the input documents as a whole.
$sum 会忽略非数字值
$avg 会忽略非数字值
$first Only meaningful when documents are in a defined order. 只在排序时有意义
$last Only meaningful when documents are in a defined order. 只在排序时有意义
*/
