angular.module('slatwalladmin')
.directive('swPaginationBar',
['partialsPath', 
'paginationService',
'$log',
function(
partialsPath,
paginationService,
$log){
	return {
		restrict:'A',
		templateUrl: partialsPath+'paginationbar.html',
		scope: {
			pageShow:"=",
			currentPage:"=",
			pageStart:"&",
			pageEnd:"&",
			recordsCount:"&",
			collection:"=",
			autoScroll:"="
		},
		link:function(scope,element,attrs){
			$log.debug('pagination init');
			scope.totalPagesArray = [];
			scope.hasPrevious = paginationService.hasPrevious;
			scope.hasNext = paginationService.hasNext;
			scope.totalPages = paginationService.getTotalPages;
			
			scope.pageShowOptions = paginationService.getPageShowOptions();
          	scope.pageShowOptions.selectedPageShowOption = scope.pageShowOptions[0];
          	
          	scope.pageShowOptionChanged = function(pageShowOption){
          		$log.debug('pageShowOptionChanged');
          		$log.debug(pageShowOption);
      			paginationService.setPageShow(pageShowOption.value);
        		scope.pageShow = paginationService.getPageShow();
        	};
        	
        	/*var unbindPageOptionsWatchListener = scope.$watch('pageOptions',function(newValue,oldValue){
    			 $("select").selectBoxIt();
        		 unbindPageOptionsWatchListener();
        	});*/
        	
        	scope.setCurrentPage = function(number){
        		$log.debug('setCurrentPage');
        		paginationService.setCurrentPage(number);
        		scope.currentPage = number;
        	};
        	
        	
        	var setPageRecordsInfo = function(recordsCount,pageStart,pageEnd,totalPages){
    			paginationService.setRecordsCount(recordsCount);
    			paginationService.setPageStart(pageStart);
    			paginationService.setPageEnd(pageEnd);
    			paginationService.setTotalPages(totalPages);
    		};
        	
        	scope.$watch('collection',function(newValue,oldValue){
        		$log.debug('collection changed');
        		$log.debug(newValue);
        		if(angular.isDefined(newValue)){
        			setPageRecordsInfo(newValue.recordsCount,newValue.pageRecordsStart,newValue.pageRecordsEnd,newValue.totalPages);
        			
            		scope.currentPage= paginationService.getCurrentPage();
            		scope.pageShow = paginationService.getPageShow();
            		//scope.totalPages()
            		scope.totalPagesArray = [];
            		for(var i = 0; i < scope.totalPages(); i++){
            			scope.totalPagesArray.push(i+1);
            		}
            		scope.pageStart();
            		scope.pageEnd();
            		scope.recordsCount();
            		scope.hasPrevious();
            		scope.hasNext();
        		}
        	});
        	
        	scope.showPreviousJump = function(){
        		if(angular.isDefined(scope.currentPage) && scope.currentPage > 3){
        			return true;
        		}else{
        			return false;
        		}
        	};
        	
        	scope.showNextJump = function(){
        		if(paginationService.getTotalPages() - scope.currentPage > 3){
        			return true;
        		}else{
        			return false;
        		}
        	};
        	
        	scope.previousJump = function(){
        		paginationService.setCurrentPage(scope.currentPage - 3);
        		scope.currentPage -= 3;
        	};
        	
        	scope.nextJump = function(){
        		paginationService.setCurrentPage(scope.currentPage + 3);
        		scope.currentPage += 3;
        	};
        	
        	scope.showPageNumber = function(number){
        		/*if(scope.currentPage >= scope.totalPages() - 3){
        			if(number > scope.totalPages() - 6){
        				return true;
        			}
        		}*/
        		
        		if(scope.currentPage >=scope.totalPages() - 3){
        			if(number > scope.totalPages() - 6){
        				return true;
        			}
        		}
        		
        		if(scope.currentPage <= 3){
        			if(number < 6){
        				return true;
        			};
        		}else{
        			var bottomRange = scope.currentPage - 2;
        			var topRange = scope.currentPage + 2;
        			if(number > bottomRange && number < topRange ){
        				return true;
        			};
        		}
        		return false;
        	};
        	
        	scope.previousPage = function(){
        		paginationService.previousPage();
        		scope.currentPage = paginationService.getCurrentPage();
        	};
        	
        	scope.nextPage = function(){
        		paginationService.nextPage();
        		scope.currentPage = paginationService.getCurrentPage();
        	};
        	

        	 
		}
	};
}]);
	