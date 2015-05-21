var patterns = window.patterns || {};

/*
 * Simple function
 * Pros: Can have multiple instances, each with own data
 * Cons: Creates a new instance of the function for each instance of object
 *       All public
 */

patterns.SimpleFunctionPattern = function() {
	this.property = 1;
	this.testAccessor = function() {
		return this.property;
	};
};

/*
 * Same as above, but shares single instance of method across multiple objects
 * Pros: Method shared so less memory used.
 * Cons: Still all public
 */

patterns.SharedFunctionPattern = function() {
	this.property = 1;
};

patterns.SharedFunctionPattern.prototype.testAccessor = function() {
	return this.property;
};

/*
 * Just an object.
 * Pros: Very readable
 * Cons: Cannot create multiple instances using "new" keyword
 * Cons: Still all public
 */

patterns.LiteralPattern = {
	property : 1,
	testAccessor : function() {
		return this.property;
	}
};

/*
 * Hide implementation in module
 * aka Immediately Invoked Function Expression (IIFE)
 * Pros: Still mostly readable
 * Pros: Allows some properties/methods to be private
 * Cons: Cannot create multiple instances using "new" keyword
 * Cons: Syntax changes between public and private 
 */

patterns.ModulePattern = (function() {
	var property = 1;
	return {
		testAccessor : function() {
			return property;
		}		
	}
})();

/*
 * Hide implementation in module
 * Pros: Still mostly readable
 * Pros: Allows some properties/methods to be private
 * Cons: Cannot create multiple instances using "new" keyword
 * Cons: Syntax changes between public and private 
 */

patterns.RevealingModulePattern = (function () {
	var property = 1;
	function testAccessor(prop) {
		if(prop) this.property = prop;
		return property;
	}
	return {
		testAccessor: testAccessor
	}
})();

/*
 * Hide implementation in anonymous function
 * Pros: Can have multiple instances, each with own data 
 * Pros: Shares single instance of method across multiple objects
 * Pros: Allows some properties/methods to be private
 * Cons: Cannot create multiple instances using "new" keyword
 * Cons: Syntax changes between public and private 
 * Cons: Not very readable.
 * 
 * Uses bind to set the value of "this", actually quicker than $.proxy
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
 */

patterns.RevealingFunctionPattern = (function() {

	var Base = function() {
		this.property = 1;		
	}

	Base.prototype.testAccessor = function(prop) {
		if(prop) this.property = prop;
		return this.property;
	};

	return function() {
		var _base = new Base();	
		//this.testAccessor = function(p){ return _base.testAccessor(p) };
		this.testAccessor = _base.testAccessor.bind(_base)
	};

})();

/*
 * Prototype Pattern
  * This creates a new "car" that inherits the vehicle method, but supplies own attributes
 */

 patterns.car = (function() {

	var vehicle = {
	  getModel: function () {
	    console.log( "The model of this vehicle is.." + this.model );
	  }
	};
 
	return Object.create(vehicle, {
	 
	  "id": {
	    value: MY_GLOBAL.nextId(),
	    // writable:false, configurable:false by default
	    enumerable: true
	  },
	 
	  "model": {
	    value: "Ford",
	    enumerable: true
	  }
	 
	});

}();

/*
 * This does the same, but a bit less readable
 */ 

patterns.ford = (function() {

	var vehiclePrototype = {	 
	  init: function ( carModel ) {
	    this.model = carModel;
	  },	 
	  getModel: function () {
	    console.log( "The model of this vehicle is.." + this.model);
	  }
	};
	 
	 
	function vehicle( model ) {
	 
	  function F() {};
	  F.prototype = vehiclePrototype;
	 
	  var f = new F();
	 
	  f.init( model );
	  return f;
	 
	}
	 
	return vehicle( "Ford Escort" );

})();

/*
 * This is a generic method that allows you to create new instances of any object
 * prototype you pass in.
 */

patterns.beget = (function () {
 
    function F() {}
 
    return function ( proto ) {
        F.prototype = proto;
        return new F();
    };
})();






