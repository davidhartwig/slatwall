/**
 * <----------------------------------------------------------------------------------------------------------------------->
 * Manages filters used by the collection service. Filters can register with this service by calling 
 * 
 * filterService.registerNewFilter(filterToRegister, type) 
 * 
 * Where filterToRegister is the calling filter and type is the type of filter (filteritem, filterGroup, etc)
 * 
 * 	
  									Methods:
 
		  registerNewFilter : function(filterToRegister)
		  removeFilterAt : function(indexOfFilterToRemove)
		  removeSiblingAt : function(indexOfFilterItem, indexOfSiblingInFilter)
		  updateFilterAt : function(indexOfFilterToUpdate, newFilter)
		  getFilterType : function(indexOfFilterToInspect)
		  getFilterCount : function()
		  getFilterAt : function(indexOfFilterToReturn)
		  getAllFilterItems : function()
		  hasSiblingItems : function(indexOfFilterToInspect)
		  getAllSiblingItems : function(indexOfFilter)
		  setSiblingItems : function(indexOfFilterToAddTo, siblingItems)
		  setSiblingItem : function(indexOfFilterToAddTo, siblingItem)
		  setFilterDisabled : function(indexOfFilterToDisable)
		  isDisabled : function(indexOfFilterToCheck)
		  setFilterNew : function(indexOfFilterToSet)
		  isNew : function(indexOfFilterToCheck)
		  
 * <----------------------------------------------------------------------------------------------------------------------->
 */
angular.module('slatwalladmin').factory('filterService',['$filter', '$log', function($filter, $log	)
{
			var _filterCollection = new Array(); 		//Contains all filter items registered with the service.
			
			/**
			 * Filter service keeps track of all filters in its collection.
			 */
			var filterService = {	
					
					/**
					 * Registers a new filter with the service. 
					 * @return index of the new filter
					 */
					registerNewFilter : function(filterToRegister, filterType){
						filterToRegister.type = filterType;
						console.log("Registering Filter");
						console.dir(filterToRegister);
						_filterCollection.push(filterToRegister);
						return _filterCollection.length;//Index is the last item in collection
					},
					
					/**
					 * Removes a filter at the specified index location.
					 */
					removeFilterAt : function(indexOfFilterToRemove){
						console.log("Removing the filter at index " + indexOfFilterToRemove);
						_filterCollection[indexOfFilterToRemove].pop();
						_filterCollection = this.getAllFilterItems(); //Removes null from the array.
					},
					
					/**
					 * Update the filter that exists at the specified index with the newFilterProperties.
					 */
					updateFilterAt : function(indexOfFilterToUpdate, newFilter){
						console.log("Updating the filter at index " + indexOfFilterToUpdate + " with a new value.");
						_filterCollection[indexOfFilterToUpdate].update(newFilter);
					},	
					
					/**
					 * Returns the filter type of the object in the filter collection given by index
					 * @return filter (or false on fail)
					 */
					getFilterType : function(indexOfFilterToInspect){
						console.log("Returning the type of filter located at " + indexOfFilterToInspect);
						return angular.isDefined(_filterCollection[indexOfFilterToUpdate].type) ? _filterCollection[indexOfFilterToUpdate].type : -1;
					},
					
					/**
					 * Returns a filter count.
					 */
					getFilterCount : function(){
						console.log("Returning the number of filters in the collection.");
						return _filterCollection.length;
					},
					
					/**
					 * Returns the filter at index
					 */
					getFilterAt : function(indexOfFilterToReturn){
						console.log("Returns the filter at index " + indexOfFilterToReturn);
						return angular.isDefined(_filterCollection[indexOfFilterToUpdate]) ? _filterCollection[indexOfFilterToUpdate].type : -1;
					},
					
					/**
					 * Returns an array of all filter items without null values from filters that may have been removed.
					 */
					getAllFilterItems : function(){
						console.log("Returning all filter items in the collection");
						return _filterCollection;
					},
					
					/**
					 * Returns whether or not a filter contains siblingItems
					 * @return boolean
					 */
					hasSiblingItems : function(indexOfFilterToInspect){
						console.log("Checking for sibling items");
						 return (_filterCollection[indexOfFilterToInpect].$$siblingItems.length > 0) ? true : false;
					},
					
					/**
					 * Removes a sibling at the specified index in the filteritem
					 */
					removeSiblingAt : function(indexOfFilterItem, indexOfSiblingInFilter){
						console.log("Removing a sibling item.");
						_filterCollection[indexOfFilterItem].$$siblingItems[indexOfSiblingInFilter].pop();
					},
					
					/**
					 * Returns the filters siblingItems (unless the item is null
					 * @return siblingItems
					 */
					getAllSiblingItems : function(indexOfFilter){
						console.log("Returning all sibling items");
						 return _filterCollection[indexOfFilterToInpect].$$siblingItems;
					},
					
					/**
					 * Sets sibling items for a filter in the collection.
					 * @param indexOfFilterToAddTo 
					 * @param siblingItems Array of sibling items to add
					 */
					setSiblingItems : function(indexOfFilterToAddTo, siblingItems){
						console.log("Setting all sibling items");
						_filterCollection[indexOfFilterToAddTo].$$siblingItems = siblingItems;
					},
					
					/**
					 * Sets sibling items for a filter in the collection.
					 * @param indexOfFilterToAddTo 
					 * @param siblingItems Array of sibling items to add
					 */
					setSiblingItem : function(indexOfFilterToAddTo, siblingItem){
						console.log("Setting a single sibling item");
						if (siblingItem !== null){
						_filterCollection[indexOfFilterToAddTo].$$siblingItems.push(siblingItem);
						}
					},
					
					/**
					 * Sets a filter item to disabled
					 */
					setFilterDisabled : function(indexOfFilterToDisable){
						console.log("Disabling a filter");
						_filterCollection[indexOfFilterToDisable].$$disabled = true;
						return (isDisabled(_filterCollection[indexOfFilterToDisable])) ? true : false;
					},
					
					/**
					 * Checks if a filter item is disabled
					 */
					isDisabled : function(indexOfFilterToCheck){
						console.log("Checking if a filter is disabled");
						_filterCollection[indexOfFilterToDisable].$$disabled = true;
					},
					
					/**
					 * Sets a filter to new
					 */
					setFilterNew : function(indexOfFilterToSet){
						console.log("Setting a filter as new");
						_filterCollection[indexOfFilterToSet].$$isNew = true;
						return (isNew(_filterCollection[indexOfFilterToSet])) ? true : false;
					},
					
					/**
					 * Checks if a filter item is new
					 */
					isNew : function(indexOfFilterToCheck){
						console.log("Checking if a filter is new");
						_filterCollection[indexOfFilterToCheck].$$isNew = true;
					}
		};
		return filterService;
}]);
