//初始化测试副本集
replicaSet = new ReplSetTest({nodes: 3});
replicaSet.startSet(); replicaSet.initiate();

db.getMongo().setSlaveOk();//rs.slaveOk()

conn1 = new Mongo("localhost:31000");
primaryDB = conn1.getDB("test");
primaryDB.isMaster();

//> secondary.coll.find()
//  error: { "$err" : "not master and slaveOk=false", "code" : 13435 }
//> secondary.getMongo().setSlaveOk();

//db.system.replset.find() #副本集配置。副本集中所有成员的这个文档都是相同的，绝对不要用update更新这个文档

rs.stepDown(time) //让主节点退化为备份节点，以秒为单位，默认60s
rs.freeze(time) //保持备份节点状态，以秒为单位

db.adminCommand({replSetMaintenance: false})
db.adminCommand({replSetGetStatus: 1}) //rs.status()
db.adminCommand({replSetSyncFrom: 'localhost:31002'}) //连接到需要修改复制源的备份节点

//db.eval(function, arguments)

//db.runCommand({
//  eval: <function>,
//  args: [ <arg1>, <arg2> ... ],
//  nolock: <boolean>
//})
