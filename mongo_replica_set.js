replicaSet = new ReplSetTest({nodes: 3});
replicaSet.startSet(); replicaSet.initiate();
db.getMongo().setSlaveOK();

conn1 = new Mongo("localhost:31000");
primaryDB = conn1.getDB("test");
primaryDB.isMaster();
