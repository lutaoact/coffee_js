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
如果group操作针对的不是已经存在的文档字段，而是计算得出的，则用$keyf关键字代替key
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
