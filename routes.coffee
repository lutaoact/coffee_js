# Main application routes

'use strict'

errors = require './components/errors'
jwt = require 'jsonwebtoken'
config = require './config/environment'
ejs = require 'ejs'

errorHandler = (err, req, res, next) ->
  logger.error err
  result =
    name: err?.name
    message: err?.message
    errors: err?.errors
  res.json err.status || 500, result

module.exports = (app) ->

  # Insert routes below
  app.use '/api/users', require './api/user'
  app.use '/auth', require './auth'
  app.use errorHandler

  # All other routes should redirect to the index.html
  app.route '/*'
  .get (req, res) ->
    subContext =
      switch true
        when req.url.indexOf('/test') is 0
          '/test'
        when req.url.indexOf('/admin') is 0
          '/admin'
        else
          ''
    indexFile = subContext + '/index.html'
    indexPath = app.get('appPath') + indexFile
    locals =
      webview: "#{req.query.webview?}"
      initUser: "null"
      initNotify: "#{req.query.message}"

    # if there is no cookie token, return index.html immediately
    if not req.cookies.token?
      ejs.renderFile indexPath, locals, (err, htmlStr) ->
        if err then return res.render 404

        res.send htmlStr
    else
      logger.info 'refreshing, req.cookies:'
      logger.info req.cookies
      # remove double quote
      token = req.cookies.token.replace /"/g, ''
      jwt.verify token, config.secrets.session, null, (err, user) ->
        logger.info "after verity token, we get user:"
        logger.info user

        unless err?
          locals.initUser = JSON.stringify  _id: user._id

        ejs.renderFile indexPath, locals, (err, htmlStr) ->
          if err then return res.render 404

          res.send htmlStr
