db.theme.aggregate([{
  $lookup: {
    from: 'theme_stock',
    localField: 'iCode',
    foreignField: 'tcode',
    as: 'stocks',
  }
}]);

db.theme_stock.aggregate([{
  $group: {
    _id: {$substr: ['$tcode', 2, 6]},
    stocks: {$push: {$substr: ['$scode', 2, 6]}},
  }
}]);
