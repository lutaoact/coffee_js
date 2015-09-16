//比起聚合管道，自定义的js可以提供更大的灵活性，一般来说，map-reduce会比聚合管道略低效并且更复杂。
//While the custom JavaScript provide great flexibility compared to the aggregation pipeline, in general, map-reduce is less efficient and more complex than the aggregation pipeline.

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
//在mongo shell中，有一个包装方法db.collection.group()，接受的参数是keyf和reduce，而在执行group命令的时候，用的是$keyf和$reduce字段。（真是受不了……）
For the shell, MongoDB provides a wrapper method db.collection.group(). However, the db.collection.group() method takes the keyf field and the reduce field whereas the group command takes the $keyf field and the $reduce field.
*/

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

/** $group
_id为必须字段，但是可以将_id设为null来计算所有输入文档的累加值
The _id field is mandatory; however, you can specify an _id value of null to calculate accumulated values for all the input documents as a whole.
$sum 会忽略非数字值
$avg 会忽略非数字值
$first Only meaningful when documents are in a defined order. 只在排序时有意义
$last Only meaningful when documents are in a defined order. 只在排序时有意义

$group stage有100M的内存限制。默认情况下，超过限制，将会引发错误。但可以通过设置allowDiskUse选项为true来使$group操作可写临时文件，以此来允许操作处理大数据集
The $group stage has a limit of 100 megabytes of RAM. By default, if the stage exceeds this limit, $group will produce an error. However, to allow for the handling of large datasets, set the allowDiskUse option to true to enable $group operations to write to temporary files.
*/
