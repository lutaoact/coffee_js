data =
  userId: '111111111111111111111111'
  type: 1
  data:
    lectureId: '111111111111111111111112'
    discussionId: '111111111111111111111113'
  status: 0

Q = require 'q'
init = Q.nbind require('./init'), null
Notice = null
init()
.then () ->
  Notice = modelMap['notice']
  save = Q.nbind Notice.save, Notice
  return save data
.then (notice) ->
  console.log notice
  findOne = Q.nbind Notice.findOne, Notice
  return findOne notice._id
.then (findNotice) ->
  console.log findNotice
, (err) ->
  console.log err
#AsyncClass = new require('./AsyncClass').AsyncClass
#
#
#AsyncClass.series
#  init: (next) ->
#    require('./init') next
#  save: (next) ->
#    Notice = modelMap['notice']
#    Notice.save data, next
#  findOne: (next, res) ->
#    Notice.findOne _id: res.save._id, next
#, (err, res) ->
#  console.log err, res
#  do process.exit
