/**
 * Switches to an edit page on click.
 */
angular.module('slatwalladmin')
.directive('swDeleteButton', 
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
			templateUrl:partialsPath+"orderitem-deletebutton.html",
			link: function(scope, element, attrs){
				   
			}
		};
	}
]);