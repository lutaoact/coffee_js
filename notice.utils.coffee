AsyncClass = require('../../common/AsyncClass').AsyncClass

Notice = AsyncClass.model('notice')

userIds = ['111111111111111111111111', '111111111111111111111113', '111111111111111111111112']
lectureIds = ['222222222222222222222222', '222222222222222222222223', '222222222222222222222222']

exports.addNotices = (userIds, lectureIds, cb) ->
  deferred = do Q.defer
  data =
    type: Const.NoticeType.Lecture
    data: {}
    status: 0

  save = Q.nbind Notice.save, Notice
  result = []
  for userId in userIds
    data.userId = userId
    for lectureId in lectureIds
      data.data.lectureId = lectureId
      result.push save data

  Q.all result
  .then (datas) ->
    return Q(datas)
  , (err) ->
    return Q.reject err

#  AsyncClass.each userIds, (userId, next) ->
#    console.log userId
#    data.userId = userId
#    AsyncClass.each lectureIds, (lectureId, _next) ->
#      console.log lectureId
#      data.data.lectureId = lectureId
#      Notice.save data, _next
#    , next
#  , (err) ->
#    if err then deferred.reject err else do deferred.resolve
#
#  return deferred.promise.nodeify cb

#exports.addNotices userIds, lectureIds
#.then (datas) ->
#  console.log datas
#, (err) ->
#  console.log err
#exports.addNotices userIds, lectureIds, (err) ->
#  console.log err
