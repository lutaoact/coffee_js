/** Sort and Index Prefix **/
//如果排序keys对应索引keys或索引前缀，索引可被用于对查询结果排序。复合索引的前缀是指index key pattern的从头开始的一个或多个key的子集。
//If the sort keys correspond to the index keys or an index prefix, MongoDB can use the index to sort the query results. A prefix of a compound index is a subset that consists of one or more keys at the start of the index key pattern.
