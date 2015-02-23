/**
 * Displays the table headers for custom attributes given the orderItems object.
 */
angular.module('slatwalladmin')
.directive('swOrderItemAttributeHeaders', 
[
'partialsPath',
'$log',
'$slatwall',
	function(partialsPath, $log, $slatwall){
		return {
			restrict: 'A',
			replace: true,
			scope:{
				orderItems:"="
			},
			templateUrl:partialsPath+"orderitem-attributeheaders.html",
			link: function(scope, element, attrs){
			    scope.orderItems.headers = [];
			    /*
			     * Returns a list of custom attribute headers attached to the orderItem
			     */
			    var getCustomAttributes = function(oi){
				var attPropertiesPromise = oi.$$getPropertyByName("attributeValues");
				attPropertiesPromise.then(function(value){
				angular.forEach(value.records, function(rec, key){
				var columnsConfig =
				[
				{
				    "isDeletable": false,
				    "isExportable": true,
				    "propertyIdentifier": "_attribute.attributeName",
				    "ormtype": "id",
				    "isVisible": true,
				    "isSearchable": true,
				    "title": "Attribute ID"
				  }
				    ];
				var filterConfig =
				[
				{
				"filterGroup":
				[
				        {
				          "propertyIdentifier": "_attribute.attributeID",
				          "comparisonOperator": "=",
				          "value": rec.attributeID,
				        },
				        {
				        	"logicalOperator":"AND",
				          "propertyIdentifier": "_attribute.displayOnOrderDetailFlag",
				          "comparisonOperator": "=",
				          "value": true,
				        }
				 
				]
				}
				];
					var options = {
						columnsConfig:angular.toJson(columnsConfig),
						filterGroupsConfig:angular.toJson(filterConfig),
						allRecords:true
					};
					var namePromise = $slatwall.getEntity('attribute', options);
						namePromise.then(function(value){
							if (angular.isDefined(value.records[0]) && value.records[0] != 'undefined'){
								if (scope.orderItems.headers.indexOf(value.records[0].attributeName) == -1){
								scope.orderItems.headers.push(value.records[0].attributeName);
								$log.debug("Pushing header named: ");
								$log.debug(value.records[0].attributeName);
								}
							}
						});//<--end of the name promise
					  });//<--end value.record forEach
				    });//<--end attributes promise	
			      }//<--end getCustomAttributes()
			    
			   angular.forEach(scope.orderItems, function(orderItem){
			    		getCustomAttributes(orderItem);
			    }); 
			}
		};
	}
]);