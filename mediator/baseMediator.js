'use strict';

let mediator = (function() {
  let topics = {};
  let subscribe = function(topic, fn) {
    if (!topics[topic]) {
      topics[topic] = [];
    }
    topics[topic].push({context: this, callback: fn});

    return this;
  };

  let publish = function(topic) {
    if (!topics[topic]) {
      return false;
    }

    let args = Array.prototype.slice.call(arguments, 1);
    for (let i = 0, l = topics[topic].length; i < l; i++) {
      let subscription = topics[topic][i];
      subscription.callback.apply(subscription.context, args);
    }

    return this;
  };

  return {
    Publish: publish,
    Subscribe: subscribe,
    installTo: function(obj) {
      obj.subscribe = subscribe;
      obj.publish = publish;
    },
  };
})();
