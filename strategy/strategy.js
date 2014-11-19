// Greeter is a class of object that can greet people.
// It can learn different ways of greeting people through
// 'Strategies.'
//
// This is the Greeter constructor.
var Greeter = function(strategy) {
this.strategy = strategy;
};

// Greeter provides a greet function that is going to
// greet people using the Strategy passed to the constructor.
Greeter.prototype.greet = function() {
return this.strategy();
};

// Since a function encapsulates an algorithm, it makes a perfect
// candidate for a Strategy.
//
// Here are a couple of Strategies to use with our Greeter.
var politeGreetingStrategy = function() {
  return "Hello.";
};

var friendlyGreetingStrategy = function() {
  return "Hey!";
};

var boredGreetingStrategy = function() {
  return "sup.";
};

// Let's use these strategies!
var politeGreeter = new Greeter(politeGreetingStrategy);
var friendlyGreeter = new Greeter(friendlyGreetingStrategy);
var boredGreeter = new Greeter(boredGreetingStrategy);

console.log(politeGreeter.greet()); //=> Hello.
console.log(friendlyGreeter.greet()); //=> Hey!
console.log(boredGreeter.greet()); //=> sup.
