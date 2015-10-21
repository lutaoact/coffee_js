var cursor = db.orders.aggregate([{
  $match: {
    manicurist: '0210001',
  },
}, {
  $group: {
    _id: '$cellphone',
    ordersCount: {$sum: 1},
    totalRealPrice: {$sum: '$real_price'},
  },
}, {
  $project: {
    _id: 0,
    cellphone: '$_id',
    ordersCount: 1,
    totalRealPrice: 1,
    avgRealPrice: {$divide: ['$totalRealPrice', '$ordersCount']},
  },
}, {
  $sort: {ordersCount: -1},
}, {
  $skip: 10
}, {
  $limit: null
}], {
  allowDiskUse: true,
});

cursor.forEach(function(doc) {
  printjson(doc);
});

db.orders.aggregate([{
  $match: {
    manicurist: '0210001',
  },
}, {
  $group: {
    _id: '$cellphone',
    ordersCount: {$sum: 1},
    totalRealPrice: {$sum: {
      $add: [
        '$real_price',
        {$ifNull: ['$additionalOrderPriceSum', 0]}
      ]
    }},
  },
}, {
  $project: {
    _id: 0,
    cellphone: '$_id',
    ordersCount: 1,
    totalRealPrice: 1,
    avgRealPrice: {$divide: ['$totalRealPrice', '$ordersCount']},
  },
}], {
  allowDiskUse: true,
});
