var csv = require('csv');

csv.generate({seed: 1, columns: 2, length: 20}, function(err, data){
  console.log(data);
  csv.parse(data, function(err, data){
    console.log(data);
    var i = 0;
    csv.transform(data, function(data){
      console.log(i++);
      console.log(data);
      return data.map(function(value){return value.toUpperCase()});
    }, function(err, data){
      console.log('**********');
      console.log(data);
      console.log('**********');
      csv.stringify(data, function(err, data){
        process.stdout.write(data);
      });
    });
  });
});
