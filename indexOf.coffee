user = role: 'admin'
if ~(['teacher', 'admin'].indexOf user.role)
  console.log 1
else
  console.log 0
