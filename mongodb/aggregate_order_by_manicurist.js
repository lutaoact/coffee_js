db.orders.aggregate([{
  $match: {
    manicurist: '0210001',
  },
}, {
  $group: {
    _id: '$cellphone',
    count: {$sum: 1},
    totalRealPrice: {$sum: '$real_price'},
  },
}, {
  $project: {
    _id: 0,
    cellphone: '$_id',
    count: 1,
    totalRealPrice: 1,
    avgRealPrice: {$divide: ['$totalRealPrice', '$count']},
  },
}, {
  $sort: {count: -1},
}, {
  $skip: 10
}, {
  $limit: 15
}]);
