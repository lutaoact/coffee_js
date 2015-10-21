db.orders.find().snapshot().forEach(function(order) {
  for (var i = 0; i < 100; i++) {
    order._id = +new Date() + '_' + i + '_' + Math.random();
    db.orders.save(order);
  }
});
