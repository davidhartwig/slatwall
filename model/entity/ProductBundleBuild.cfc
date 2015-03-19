/*

    Slatwall - An Open Source eCommerce Platform
    Copyright (C) ten24, LLC
	
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
	
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
	
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
    
    Linking this program statically or dynamically with other modules is
    making a combined work based on this program.  Thus, the terms and
    conditions of the GNU General Public License cover the whole
    combination.
	
    As a special exception, the copyright holders of this program give you
    permission to combine this program with independent modules and your 
    custom code, regardless of the license terms of these independent
    modules, and to copy and distribute the resulting program under terms 
    of your choice, provided that you follow these specific guidelines: 

	- You also meet the terms and conditions of the license of each 
	  independent module 
	- You must not alter the default display of the Slatwall name or logo from  
	  any part of the application 
	- Your custom code must not alter or create any files inside Slatwall, 
	  except in the following directories:
		/integrationServices/

	You may copy and distribute the modified version of this program that meets 
	the above guidelines as a combined work under the terms of GPL for this program, 
	provided that you include the source code of that other code when and as the 
	GNU GPL requires distribution of source code.
    
    If you modify this program, you may extend this exception to your version 
    of the program, but you are not obligated to do so.

Notes:

*/
component entityname="SlatwallProductBundleBuild" table="SwProductBundleBuild" persistent="true" accessors="true" extends="HibachiEntity" hb_serviceName="productService" hb_permission="this" {
	
	// Persistent Properties
	property name="productBundleBuildID" ormtype="string" length="32" fieldtype="id" generator="uuid" unsavedvalue="" default="";
	property name="productBundleBuildName" ormtype="string" unsavedvalue="" default="";
	
	// Calculated Properties

	// Related Object Properties (many-to-one)
	property name="productBundleSku" cfc="Sku" fieldtype="many-to-one" fkcolumn="productBundleSkuID";
	property name="session" cfc="Session" fieldtype="many-to-one" fkcolumn="sessionID";
	property name="account" cfc="Account" fieldtype="many-to-one" fkcolumn="accountID";
	
	// Related Object Properties (one-to-many)
	property name="productBundleBuildItems" cfc="ProductBundleBuildItem" singularname="productBundleBuildItem" fieldtype="one-to-many" fkcolumn="productBundleBuildItemID";
	
	// Related Object Properties (many-to-many - owner)

	// Related Object Properties (many-to-many - inverse)
	
	// Remote Properties
	property name="remoteID" hb_populateEnabled="false" ormtype="string";
	
	// Audit Properties
	property name="createdDateTime" hb_populateEnabled="false" ormtype="timestamp";
	property name="createdByAccountID" hb_populateEnabled="false" ormtype="string";
	property name="modifiedDateTime" hb_populateEnabled="false" ormtype="timestamp";
	property name="modifiedByAccountID" hb_populateEnabled="false" ormtype="string";
	
	// Non-Persistent Properties
	
	// Deprecated Properties


	// ==================== START: Logical Methods =========================
	
	// ====================  END: Logical Methods ==========================
	
	// ============ START: Non-Persistent Property Methods =================
	
	// ============  END:  Non-Persistent Property Methods =================
		
	// ============= START: Bidirectional Helper Methods ===================
	// Product Bundle Sku (many-to-one)    
    	public void function setProductBundleSku(required any productBundleSku) {    
    		variables.productBundleSku = arguments.productBundleSku;    
    		if(isNew() or !arguments.productBundleSku.hasProductBundleBuild( this )) {    
    			arrayAppend(arguments.productBundleSku.getProductBundleBuilds(), this);    
    		}    
    	}    
    	public void function removeProductBundleSku(any productBundleSku) {    
    		if(!structKeyExists(arguments, "productBundleSku")) {    
    			arguments.productBundleSku = variables.productBundleSku;    
    		}    
    		var index = arrayFind(arguments.productBundleSku.getProductBundleBuilds(), this);    
    		if(index > 0) {    
    			arrayDeleteAt(arguments.productBundleSku.getProductBundleBuilds(), index);    
    		}    
    		structDelete(variables, "productBundleSku");    
    	}
    	
    	// Session (many-to-one)        
    public void function setSession(required any session) {        
    		variables.session = arguments.session;        
    		if(isNew() or !arguments.session.hasSession( this )) {        
    			arrayAppend(arguments.session.getSessions(), this);        
    		}        
   	}   
        	     
    	public void function removeSession(any session) {        
    		if(!structKeyExists(arguments, "session")) {        
    			arguments.session = variables.session;        
    		}        
    		var index = arrayFind(arguments.session.getSessions(), this);        
    		if(index > 0) {        
    			arrayDeleteAt(arguments.session.getSessions(), index);        
    		}        
    		structDelete(variables, "session");        
        	}
    // Account (many-to-one)    
    	public void function setAccount(required any account) {    
    		variables.account = arguments.account;    
    		if(isNew() or !arguments.account.hasAccount( this )) {    
    			arrayAppend(arguments.account.getAccounts(), this);    
    		}    
    	}    
    	public void function removeAccount(any account) {    
    		if(!structKeyExists(arguments, "account")) {    
    			arguments.account = variables.account;    
    		}    
    		var index = arrayFind(arguments.account.getAccounts(), this);    
    		if(index > 0) {    
    			arrayDeleteAt(arguments.account.getAccounts(), index);    
    		}    
    		structDelete(variables, "account");    
    	}
    	// Product Bundle Build Items (one-to-many)
    	public void function addProductBundleBuildItem(required any productBundleBuildItem) {         
        arguments.productBundleBuildItem.setProductBundleBuild( this );         
    }         
    public void function removeProductBundleBuildItem(required any productBundleBuildItem) {         
        arguments.productBundleBuildItem.removeProductBundleBuild( this );         
    }        
    /*
	* Generates an orderitem using a parent/child relationship from the information contained
	* in the productBundleGroup, where the productBundleBuildItems represent childOrderItems
	* and the productBundleBuild represents the parentOrderItem.
	*/
	public any function generateOrderItemsFromProductBundleBuild(any order)
	{
		//For each productBundleBuildItem, create an orderItem and set the id to this id.
		var hibachiService = getService("HibachiService");
		var orderItem = hibachiService.new("OrderItem");
		orderItem.setOrderItemID=getProductBundleBuildID();
		for (var item in this.getProductBundleBuildItems()){
			if (!isNull(item.getProductBundleBuildItemID()))
			{
				var childOrderItem = hibachiService.new("OrderItem");
				childOrderItem.setOrderItemID(item.getProductBundleBuildItemID());//Child ID is the builditem id.
				childOrderItem.setParentOrderItem(orderItem.getOrderItemID());//Set the parent orderitem for each child.
				arguments.order.addOrderItem(childOrderItem);//Add the child to the order.
				
			}
		}
		arguments.order.addOrderItem(orderItem); //Add the parent to the order.
		return arguments.order;//Parent with children.
	}     	
    	
    	
	// =============  END:  Bidirectional Helper Methods ===================

	// =============== START: Custom Validation Methods ====================
	
	// ===============  END: Custom Validation Methods =====================
	
	// =============== START: Custom Formatting Methods ====================
	
	// ===============  END: Custom Formatting Methods =====================
	
	// ============== START: Overridden Implicit Getters ===================
	
	// ==============  END: Overridden Implicit Getters ====================
	
	// ============= START: Overridden Smart List Getters ==================
	
	// =============  END: Overridden Smart List Getters ===================

	// ================== START: Overridden Methods ========================
	
	// ==================  END:  Overridden Methods ========================
	
	// =================== START: ORM Event Hooks  =========================
	
	// ===================  END:  ORM Event Hooks  =========================
	
	// ================== START: Deprecated Methods ========================
	
	// ==================  END:  Deprecated Methods ========================
	
}