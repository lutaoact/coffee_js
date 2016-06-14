function checkResult(result) {
  printjson(result);
  if (result.ok !== 1) {
    quit();
  }
}

var dateStr = (new Date().toISOString()).replace(/[:.\-]/g, '');
print(dateStr);

//将当前数据库备份
var adminDB = connect('127.0.0.1:27017/admin');
checkResult(adminDB.runCommand({
  copydb: 1, fromdb: 'gpws', todb: 'gpws-' + dateStr
}));

//var bakDB = connect('127.0.0.1:27017/gpws-bak');
//checkResult(bakDB.dropDatabase());
//
//
//checkResult(adminDB.runCommand({copydb: 1, slaveOk: true, fromdb: 'gpws', todb: 'gpws-copy', fromhost: '127.0.0.1:37017'}));
//printjson(result);
//if (result.ok !== 1) {
//  quit();
//}
