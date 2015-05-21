$(function() {

	// simple function

	var simpleFunction = new patterns.SimpleFunctionPattern();
	console.log("simpleFunction: ", simpleFunction.testAccessor());

	// shared function

	var sharedFunctionPattern = new patterns.SharedFunctionPattern();
	console.log("sharedFunctionPattern: ", sharedFunctionPattern.testAccessor());

	// literal pattern

	var literalPattern = patterns.LiteralPattern;
	console.log("literalPattern: ", literalPattern.testAccessor());

	// basic anonymous function pattern 

	var modulePattern = patterns.ModulePattern;
	console.log("modulePattern: ", ModulePattern.testAccessor());

	// revealing pattern
	// prove that object.Create doesn't create a separate instance for this pattern

	var revealingAnonymousFunctionPattern = Object.create(patterns.RevealingModulePattern);
	var revealingAnonymousFunctionPattern2 = Object.create(patterns.RevealingModulePattern);

	revealingAnonymousFunctionPattern.testAccessor(1);
	revealingAnonymousFunctionPattern2.testAccessor(2);

	console.log("revealingAnonymousFunctionPattern: ", revealingAnonymousFunctionPattern.testAccessor());
	console.log("revealingAnonymousFunctionPattern-2: ", revealingAnonymousFunctionPattern2.testAccessor());

	// revealing function pattern

	var revealingFunctionPattern1 = new patterns.RevealingFunctionPattern();
	console.log("revealingFunctionPattern-1: ", revealingFunctionPattern1.testAccessor());

	console.log('revealingFunctionPattern-1: set to 3');
	revealingFunctionPattern1.testAccessor(3);

	console.log("revealingFunctionPattern-1: ", revealingFunctionPattern1.testAccessor());

	var revealingFunctionPattern2 = new patterns.RevealingFunctionPattern();
	console.log("revealingFunctionPattern-2: ", revealingFunctionPattern2.testAccessor());

	console.log('revealingFunctionPattern-2: set to 6');
	revealingFunctionPattern2.testAccessor(6);

	console.log("revealingFunctionPattern-2: ", revealingFunctionPattern2.testAccessor());
	console.log("revealingFunctionPattern-1: ", revealingFunctionPattern1.testAccessor());

	try {
		console.log("is this visible?", revealingFunctionPattern2._base.property);
	} catch(e) {
		console.log("_base not visible as designed");
	}

});