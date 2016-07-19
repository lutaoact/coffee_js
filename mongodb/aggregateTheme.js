db.theme.aggregate([{
  $lookup: {
    from: 'theme_stock',
    localField: 'iCode',
    foreignField: 'tcode',
    as: 'stocks',
  }
}]);

//只包含code
db.theme_stock.aggregate([{
  $group: {
    _id: {$substr: ['$tcode', 2, 6]},
    stocks: {$push: {$substr: ['$scode', 2, 6]}},
  }
}, {
  $out: 'tmp_aggregate_theme'
}]);

db.theme_stock.aggregate([{
  $group: {
    _id: '$tcode',
    stocks: {$push: {$substr: ['$scode', 2, 6]}},
  }
}, {
  $lookup: {
    from: 'theme',
    localField: '_id',
    foreignField: 'iCode',
    as: 'theme',
  }
}, {
  $unwind: '$theme'
}, {
  $project: {
    _id: false,
    code: {$substr: ['$_id', 2, 6]},
    name: '$theme.name',
    stocks: true,
  }
}, {
  $out: 'tmp_aggregate_theme'
}]);
