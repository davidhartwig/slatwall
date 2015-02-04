/**
 * Validates true if the given object is 'unique' and false otherwise.
 * @module swvalidation
 * @class swValidationUnique
 */
angular
		.module('slatwalladmin')
		.directive(
				"swvalidationunique",
				[
						"$http",
						"$q",
						function($http, $q) {
							return {
								restrict : "A",
								require : "^ngModel",
								link : function(scope, element, attributes,
										ngModel) {
									// ---------Setup the check when the model changes
									ngModel.$validators.swvalidationunique = function(
											modelValue, viewValue) {

										var valObj = scope.propertyDisplay.object.metaData.className;
										var valProp = scope.propertyDisplay.object.metaData.attributeValues.fkcolumn;
										console.log(valObj);
										console.log(valProp);
										$http
												.get(
														'/index.cfm?slatAction=api:main.getValidationPropertyStatus&object='
																+ valObj
																+ "&propertyidentifier="
																+ valProp
																+ "&constraintValue=false")
												.success(
														function(data, status,
																headers, config) {
															if (data.uniqueStatus) {
																return true; // Unique is true

															} else {
																return false; // Unique is false
															}
														})
												.error(
														function(data, status,
																headers, config) {
															//Error.
															return false;
														});

									};
									//---------End $validators
								}
							};
						} ]);