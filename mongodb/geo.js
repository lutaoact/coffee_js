db.places.find(
   { loc: { $geoWithin: { $center: [ [-74, 40.74], 10 ] } } }
)

// 2d索引
// location range
db.collection.createIndex( { <location field> : "2d" } ,
                           { min : <lower bound> , max : <upper bound> } )
db.places.createIndex( { "locs": "2d" } )

//可手动调整精度，默认为26位，精度并不影响查询精确性，但可以降低插入操作的处理负荷，减少存储空间。
//Precision is measured by the size in bits of the geohash values used to store location data. You can configure geospatial indexes with up to 32 bits of precision
//Index precision does not affect query accuracy. The actual grid coordinates are always used in the final query processing. Advantages to lower precision are a lower processing overhead for insert operations and use of less space. An advantage to higher precision is that queries scan smaller portions of the index to return results.
db.<collection>.createIndex( {<location field> : "<index type>"} ,
                             { bits : <bit precision> } )

//The geoNear command and the $geoNear pipeline stage require that a collection have at most only one 2d index and/or only one 2dsphere index whereas geospatial query operators (e.g. $near and $geoWithin) permit collections to have multiple geospatial indexes.

//Points within a Shape Defined on a Flat Surface
db.<collection>.find( { <location field> :
                         { $geoWithin :
                            { $box|$polygon|$center : <coordinates>
                      } } } )
//$box
db.places.find( { loc :
                  { $geoWithin :
                     { $box : [ [ 0 , 0 ] ,
                                [ 100 , 100 ] ]
                 } } } )
//$center
db.places.find( { loc: { $geoWithin :
                          { $center : [ [-74, 40.74 ] , 10 ]
                } } } )
//MongoDB supports rudimentary spherical queries on flat 2d indexes for legacy reasons. In general, spherical calculations should use a 2dsphere index, as described in 2dsphere Indexes.

//Proximity to a Point on a Flat Surface
//Proximity queries return the 100 legacy coordinate pairs closest to the defined point and sort the results by distance. Use either the $near operator or geoNear command. Both require a 2d index.
db.<collection>.find( { <location field> :
                         { $near : [ <x> , <y> ]
                      } } )

//You cannot use a 2d index to return an exact match for a coordinate pair. Use a scalar, ascending or descending, index on a field that stores coordinates to return exact matches.
//In the following example, the find() operation will return an exact match on a location if you have a { 'loc': 1} index:
//确切匹配需要建立标量的升序或降序索引
db.<collection>.find( { loc: [ <x> , <y> ] } )
//This query will return any documents with the value of [ <x> , <y> ]


// 2dsphere索引
db.places.createIndex( { loc : "2dsphere" } )

//$geoWithin
db.<collection>.find( { <location field> :
                         { $geoWithin :
                           { $geometry :
                             { type : "Polygon" ,
                               coordinates : [ <coordinates> ]
                      } } } } )
//$geoIntersects
db.<collection>.find( { <location field> :
                         { $geoIntersects :
                           { $geometry :
                             { type : "<GeoJSON object type>" ,
                               coordinates : [ <coordinates> ]
                      } } } } )
//Proximity queries return the points closest to the defined point and sorts the results by distance. A proximity query on GeoJSON data requires a 2dsphere index.
db.<collection>.find( { <location field> :
                         { $near :
                           { $geometry :
                              { type : "Point" ,
                                coordinates : [ <longitude> , <latitude> ] } ,
                             $maxDistance : <distance in meters>
                      } } } )
//Points within a Circle Defined on a Sphere
db.<collection>.find( { <location field> :
                         { $geoWithin :
                           { $centerSphere :
                              [ [ <x>, <y> ] , <radius> ] }
                      } } )
db.places.find( { loc :
                  { $geoWithin :
                    { $centerSphere :
                       [ [ -88 , 30 ] , 10 / 3963.2 ]
                } } } )
//The equatorial radius of the Earth is approximately 3,963.2 miles or 6,378.1 kilometers.



//A haystack index is a special 2d geospatial index that is optimized to return results over small areas.
//Haystack indexes are not suited to queries for the complete list of documents closest to a particular location. The closest documents could be more distant compared to the bucket size.
//Spherical query operations are not currently supported by haystack indexes.




//$geoWithin does not require a geospatial index. However, a geospatial index will improve query performance.
//The $geoWithin operator does not return sorted results. As such, MongoDB can return $geoWithin queries more quickly than geospatial $near or $nearSphere queries, which sort results.
//如果单环多边形的面积大于半个球体的，$geometry表达式必须指定自定义mongodb坐标参考系统(crs coordinate reference system)
{
   <location field>: {
      $geoWithin: {
         $geometry: {
            type: <"Polygon" or "MultiPolygon"> ,
            coordinates: [ <coordinates> ]
         }
      }
   }
}

{
  <location field>: {
     $geoIntersects: {
        $geometry: {
           type: "<GeoJSON object type>" ,
           coordinates: [ <coordinates> ]
        }
     }
  }
}
