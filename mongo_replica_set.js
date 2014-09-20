replicaSet = new ReplSetTest({nodes: 3});
replicaSet.startSet(); replicaSet.initiate();
db.getMongo().setSlaveOk();

conn1 = new Mongo("localhost:31000");
primaryDB = conn1.getDB("test");
primaryDB.isMaster();

//> secondary.coll.find()
//  error: { "$err" : "not master and slaveOk=false", "code" : 13435 }
//> secondary.getMongo().setSlaveOk();
