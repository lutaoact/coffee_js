'use strict'
var Greeter = function(strategy) {
  this.strategy = strategy;
};

// We can also leverage the power of Prototypes in Javascript to create
// classes that act as strategies.
//
// Here, we create an abstract class that will serve as the interface
// for all our strategies. It isn't needed, but it's good for documenting
// purposes.
var Strategy = function() {};

Strategy.prototype.execute = function() {
  throw new Error('Strategy#execute needs to be overridden.')
};

// Like above, we want to create Greeting strategies. Let's subclass
// our Strategy class to define them. Notice that the parent class
// requires its children to override the execute method.
var GreetingStrategy = function() {};
GreetingStrategy.prototype = Object.create(Strategy.prototype);

// Here is the `execute` method, which is part of the public interface of
// our Strategy-based objects. Notice how I implemented this method in term of
// of other methods. This pattern is called a Template Method, and you'll see
// the benefits later on.
GreetingStrategy.prototype.execute = function() {
  return this.sayHi() + this.sayBye();
};

GreetingStrategy.prototype.sayHi = function() {
  return "Hello, ";
};

GreetingStrategy.prototype.sayBye = function() {
  return "Goodbye.";
};

// We can already try out our Strategy. It requires a little tweak in the
// Greeter class before, though.
Greeter.prototype.greet = function() {
  return this.strategy.execute();
};

var greeter = new Greeter(new GreetingStrategy());
console.log(greeter.greet()); //=> 'Hello, Goodbye.'
