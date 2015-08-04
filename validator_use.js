var util = require('util'),
    express = require('express'),
    expressValidator = require('express-validator'),
    app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator()); // this line must be immediately after express.bodyParser()!

app.post('/:urlparam', function(req, res) {

  // VALIDATION
  // checkBody only checks req.body; none of the other req parameters
  // Similarly checkParams only checks in req.params (URL params) and
  // checkQuery only checks req.query (GET params).
  req.checkBody('postparam', 'Invalid postparam').notEmpty().isInt();
  req.checkParams('urlparam', 'Invalid urlparam').isAlpha();
  req.checkQuery('getparam', 'Invalid getparam').isInt();

  // OR assert can be used to check on all 3 types of params.
  // req.assert('postparam', 'Invalid postparam').notEmpty().isInt();
  // req.assert('urlparam', 'Invalid urlparam').isAlpha();
  // req.assert('getparam', 'Invalid getparam').isInt();

  // SANITIZATION
  // as with validation these will only validate the corresponding
  // request object
  req.sanitizeBody('postparam').toBoolean();
  req.sanitizeParams('urlparam').toBoolean();
  req.sanitizeQuery('getparam').toBoolean();

  // OR find the relevent param in all areas
//  req.sanitize('postparam').toBoolean();

  var errors = req.validationErrors();
  if (errors) {
    res.send('There have been validation errors: ' + util.inspect(errors), 400);
    return;
  }
  console.log(req.params, req.query, req.body);
  res.json({
    urlparam: req.params.urlparam,
    getparam: req.query.getparam,
    postparam: req.body.postparam
  });
});

app.listen(8888);
