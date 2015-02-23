/**
 * Switches to an edit page on click.
 */
angular.module('slatwalladmin')
.directive('swEditButton', 
[
'partialsPath',
'$log',
'$slatwall',
	function(partialsPath, $log, $slatwall){
		return {
			restrict: 'A',
			scope:{
				href:"@"
			},
			templateUrl:partialsPath+"orderitem-editbutton.html",
			link: function(scope, element, attrs){
				   
			}
		};
	}
]);