/**
 * Uses function currying to patch $http get to use post
 */
angular.module("slatwalladmin").config(function($provide) {
	$provide.decorator('$http', function($delegate) {
		// function currying $http
		console.log("Function Curry $Http");
		console.log($delegate);
		//Get Get
		var originalGet = $delegate.get; //This is the original get method.
		//Get Post
		var post = $delegate.post;
		console.log(post);
		
		Object.size = function(obj) {
		    var size = 0, key;
		    for (key in obj) {
		        if (obj.hasOwnProperty(key)) size++;
		    }
		    return size;
		};
		
		$delegate.get = function(arg, arg2) {
			console.log('Http is now called with arguments length: ' + arguments.length);
			console.dir(arguments);
			if (arg.indexOf("slatAction") != -1){
				console.log("posting instead of getting because too large");
				//Could call $delegate.post here with arguments to use post instead of GET.
				//$delegate.post(argument);
			}
			//Returns the original GET method with this attached (could add new args or replace etc.
			return originalGet.apply(this, arguments);
		};
		return $delegate;
	});
});