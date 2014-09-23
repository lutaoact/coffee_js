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
