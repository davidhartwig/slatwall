'use strict';
angular.module('slatwalladmin').controller('create-bundle-controller', [
	'$scope',
	'$location',
	'$log',
	'$rootScope',
	'$window',
	'$slatwall',
	'dialogService',
	'alertService',
	'productBundleService',
	'formService',
	'partialsPath',
	function(
		$scope,
		$location,
		$log,
		$rootScope,
		$window,
		$slatwall,
		dialogService,
		alertService,
		productBundleService,
		formService,
		partialsPath
	){
		$scope.partialsPath = partialsPath;
		
		function getParameterByName(name) {
		    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		        results = regex.exec(location.search);
		    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
		}
		
		$scope.$id="create-bundle-controller";
		//if this view is part of the dialog section, call the inherited function
		if(angular.isDefined($scope.scrollToTopOfDialog)){
			$scope.scrollToTopOfDialog();
		}
		
		var productID = getParameterByName('productID');
		
		var productBundleConstructor = function(){
			$scope.product = $slatwall.newProduct();
			var brand = $slatwall.newBrand();
			var productType = $slatwall.newProductType();
			$scope.product.$$setBrand(brand);
			$scope.product.$$setProductType(productType);
			$scope.product.$$addSku();
			$scope.product.data.skus[0].data.productBundleGroups = [];
		};
		
		$scope.productBundleGroup;
		
		if(angular.isDefined(productID) && productID !== ''){
			var productPromise = $slatwall.getProduct({id:productID});
			
			productPromise.promise.then(function(){
				$log.debug(productPromise.value);
				productPromise.value.$$getSkus().then(function(){
					productPromise.value.data.skus[0].$$getProductBundleGroups().then(function(){
						
						$scope.product = productPromise.value;
						angular.forEach($scope.product.data.skus[0].data.productBundleGroups,function(productBundleGroup){
							productBundleGroup.$$getProductBundleGroupType();
							productBundleService.decorateProductBundleGroup(productBundleGroup);
							productBundleGroup.data.$$editing = false;
						});
					});
				});
			}, productBundleConstructor());

		} else {
			productBundleConstructor();
		}

		$scope.saveProductBundle = function(closeDialogIndex){
			//
			var productSavePromise = $scope.product.$$save();
				  productSavePromise.then(function(){
					
				$log.debug("Product still is: ");
				$log.debug($scope.product);
				$log.debug("Saving Product Bundle Group: ");
				$log.debug(productSavePromise);
				//If finish has been called and there is no error ($$state value will be defined on error)
				if (angular.isDefined(closeDialogIndex) && !angular.isDefined(productSavePromise.$$state.value)){
					$log.debug("Closing the dialog because the product was saved and finish was clicked.");
					dialogService.removePageDialog(closeDialogIndex);
				}
			});
			
			
		};
		
	}
]);
