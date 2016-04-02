'use strict';

(function(root) {
  function Subscriber(fn, options, context) {
    if (!this instanceof Subscriber) {
      return new Subscriber(fn, context, options);
    }
    this.id = guidGenerator();
    this.fn = fn;
    this.options = options;
    this.context = context;
    this.topic = null;
  }

  function Topic(namespace) {
    if (!this instanceof Topic) {
      return new Topic(namespace);
    }
    this.namespace = namespace || '';
    this._callbacks = [];
    this._topics = {};
    this.stopped = false;
  }

  Topic.prototype = {
    AddSubscriber: function(fn, options, context) {
      let callback = new Subscriber(fn, options, context);
      this._callbacks.push(callback);
      callback.topic = this;
      return callback;
    },
    StopPropagation: function() {
      this.stopped = true;
    },
    GetSubscriber: function(identifier) {
      for (let x = 0, y = this._callbacks.length; x < y; x++) {
        if (this._callbacks[x].id === identifier || this._callbacks[x].fn === identifier) {
          return this._callbacks[x];
        }
      }

      for (let z in this._topics) {
        if (this._topics.hasOwnProperty(z)) {
          let sub = this._topics[z].GetSubscriber(identifier);
          if (sub !== undefined) {
            return sub;
          }
        }
      }
    },
    AddTopic: (topic) {
      this._topics[topic] = new Topic((this.namespace ? this.namespace + ":" : '') + topic);
    },
    HasTopic: (topic) {
      this._topics.hasOwnProperty(topic);
    },
    returnTopic: (topic) {
      return this._topics[topic];
    },
    RemoveSubscriber: function(identifier) {
      if (!identifier) {
        this._callbacks = [];
        for (let z in this._topics) {
          if (this._topics.hasOwnProperty(z)) {
            this._topics[z].RemoveSubscriber(identifier);
          }
        }
      }

      for (let y = 0, x = this._callbacks.length; y < x; y++) {
        if (this._callbacks[y].fn === identifier || this._callbacks[y].id === identifier) {
          this._callbacks[y].topic = null;
          this._callbacks.splice(y, 1);
          x--; y--;//x--是因为length变小了，y--是因为当前y下标的元素没有了，之前的y+1就变成了y，这里--，循环中++，就保持不变了
        }
      }
    },
  };
})(exports);

function gen(count) {
  let out = "";
  for (let i= 0; i < count; i++) {
    out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return out;
}

function guidGenerator() {
  return [gen(2), gen(1), gen(1), gen(1), gen(3)].join("-");
}
