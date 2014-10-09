cursor = db.users.find({username: /_/})
while ( cursor.hasNext() ) {
  printjson( cursor.next() );
}

count = cursor.count();
print(count);
