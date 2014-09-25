var cluster = new ShardingTest({shards: 3, chunksize: 1})
db = (new Mongo("localhost:30999")).getDB("test")

sh.status()

for (var i = 0; i < 100000; i++) { db.users.insert({"username": "user" + i, created_at: new Date()}) }
db.users.count()

sh.enableSharding("test")
db.users.ensureIndex({username: 1})
sh.shardCollection("test.users", {username: 1})

sh.status({verbose: 1})
