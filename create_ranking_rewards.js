"use strict";
//到脚本所在目录执行：NODE_ENV=xxxx node create_ranking_rewards.js cn3 3001

var _ = require('underscore');

var NODE_ENV=process.env.NODE_ENV;
var suffix = process.argv[2]; 
var eventId = process.argv[3]; 

var fileName = eventId + '_' + suffix;
var data = require('../../sango/config/ranking_reward/lang/' + fileName).data;
var keys = _.keys(data);
var ENV = 'NODE_ENV=' + NODE_ENV;
var command = 'ngServer script --name=event/give_ranking_rewards';
for (var key in data) {
    var elements = [ENV, command, suffix, eventId, key];
    console.log(elements.join(' '));
}
