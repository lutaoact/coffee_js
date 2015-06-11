var Sequelize = require('sequelize');
var _s = require('underscore.string');

var sequelize = new Sequelize('mydb2', 'development', '', {
  host: '127.0.0.1',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

var Weather = sequelize.define('weather', {
  city: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  temp_lo: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  temp_hi: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  prcp: Sequelize.DOUBLE,
  date: Sequelize.DATE,
}, {
  freezeTableName: true,
  timestamps: false,
});

Weather.sync({force: true});
//sequelize.transaction({}, function(t) {
//  
//});

//console.log(Sequelize.VIRTUAL);
//console.log(Sequelize.STRING);

/*
 * 表名若用大写，在客户端直接用select语句查询时貌似会出错，原因不详
 * 我猜：sql在查询时会把语句全部转为小写，导致大写的表名就会找不到
 */
//var tableName = 'UserAccount';
//exports[tableName] = sequelize.define(_s.underscored(tableName), {
//  firstName: {
//    type: Sequelize.STRING,
//  },
//  lastName: {
//    type: Sequelize.STRING,
//  },
//});
//
//User.sync().then(function() {
//  return User.create({
//    firstName: 'join',
//    lastName: 'Hancock',
//  });
//});
