/**
 * Displays the values of custom attributes for an orderitem given an orderitem
 */
angular.module('slatwalladmin')
.directive('swOrderItemCustomAttributes', 
[
'partialsPath',
'$log',
'$slatwall',
	function(partialsPath, $log, $slatwall){
		return {
			restrict: 'A',
			replace:true,
			scope:{
				orderItem:"="
			},
			templateUrl:partialsPath+"orderitem-customattributes.html",
			link: function(scope, element, attrs){
				scope.orderItem.customAttributes = {};
				scope.orderItem.attributes = [];
			    /*
			     * Returns a list of custom attributes attached to the orderItem
			     */
			    var getCustomAttributes = function(orderItem){
			    	
				var attPropertiesPromise = scope.orderItem.$$getPropertyByName("attributeValues");
				attPropertiesPromise.then(function(value){
				console.info("Attribute Values and ID");
				console.info(value);
				angular.forEach(value.records, function(rec){
				//Now get the names for each attribute value and add them both to the order item.
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
							orderItem.customAttributes.name = value.records[0].attributeName || " ";
							orderItem.customAttributes.value = rec.attributeValue || " ";
							scope.orderItem.attributes.push(rec.attributeValue);
							}
						});//<--end of the name promise
					});//<--end value.record forEach
				});//<--end attributes promise	
				
			    }//<--end getCustomAttributes()
			    
				getCustomAttributes(scope.orderItem);
			    
			}
		};
	}
]);