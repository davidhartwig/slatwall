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
	/* properties */
	property name="productBundleBuildID" ormtype="string" length="32" fieldtype="id" generator="uuid" unsavedvalue="" default="";
	// Related Object Properties (many-to-one)
	property name="order" hb_populateEnabled="false" cfc="Order" fieldtype="many-to-one" fkcolumn="orderID" hb_cascadeCalculate="true" fetch="join";
	property name="orderFulfillment" cfc="OrderFulfillment" fieldtype="many-to-one" fkcolumn="orderFulfillmentID";
	property name="productBundleSku" cfc="Sku" fieldtype="many-to-one" fkcolumn="productBundleSkuID";
	property name="productBundleGroup" cfc="ProductBundleGroup" fieldtype="many-to-one" fkcolumn="productBundleGroupID";
	property name="session" cfc="Session" fieldtype="many-to-one" fkcolumn="sessionID";
	property name="account" cfc="Account" fieldtype="many-to-one" fkcolumn="accountID";
	
	// Related Object Properties (one-to-many) //Generates Add, Remove and Has Methods
	property name="productBundleBuildItems" cfc="ProductBundleBuildItem" Singularname="productBundleBuildItem"  fieldtype="one-to-many" fkcolumn="productBundleBuildID" cascade="all-delete-orphan" type="array";
	// Related Object Properties (many-to-many - owner)

	// Related Object Properties (many-to-many - inverse)
	
	// Remote Properties
	property name="remoteID" hb_populateEnabled="false" type="string"  ormtype="string";
	
	// Audit Properties
	property name="createdDateTime" hb_populateEnabled="false" column="createdDateTime" type="date" ormtype="timestamp";
	property name="createdByAccountID" hb_populateEnabled="false" column="createdByAccountID" type="string" ormtype="string";
	property name="modifiedDateTime" hb_populateEnabled="false" column="modifiedDateTime" type="date" ormtype="timestamp";
	property name="modifiedByAccountID" hb_populateEnabled="false" column="modifiedByAccountID" type="string" ormtype="string";
	
	// Non-Persistent Properties
	
	// Deprecated Properties
	

	// ==================== START: Logical Methods =========================
	any function init()
	{
		//Set some default values...
		this.productBundleBuildItem = [];
	}
	// ====================  END: Logical Methods ==========================
	
	// ============ START: Non-Persistent Property Methods =================
	
	// ============  END:  Non-Persistent Property Methods =================
		
	// ============= START: Bidirectional Helper Methods ===================
	// Order (many-to-one)
	public void function setOrder(required any order) {
		variables.order = arguments.order;
		if(isNew() or !arguments.order.hasOrderItem( this )) {
			arrayAppend(arguments.order.getOrderItems(), this);
		}
	}
	public void function removeOrder(any order) {
		if(!structKeyExists(arguments, "order")) {
			arguments.order = variables.order;
		}
		var index = arrayFind(arguments.order.getOrderItems(), this);
		if(index > 0) {
			arrayDeleteAt(arguments.order.getOrderItems(), index);
		}
		
		// Remove from order fulfillment to trigger those actions
		if(!isNull(getOrderFulfillment())) {
			removeOrderFulfillment();	
		} else if (!isNull(getOrderReturn())) {
			removeOrderReturn();
		}
		structDelete(variables, "order");
	}
	
	// Order Fulfillment (many-to-one)
	public void function setOrderFulfillment(required any orderFulfillment) {
		variables.orderFulfillment = arguments.orderFulfillment;
		if(isNew() or !arguments.orderFulfillment.hasOrderFulfillmentItem( this )) {
			arrayAppend(arguments.orderFulfillment.getOrderFulfillmentItems(), this);
		}
	}
	public void function removeOrderFulfillment(any orderFulfillment) {
		if(!structKeyExists(arguments, "orderFulfillment")) {
			arguments.orderFulfillment = variables.orderFulfillment;
		}
		var index = arrayFind(arguments.orderFulfillment.getOrderFulfillmentItems(), this);
		if(index > 0) {
			arrayDeleteAt(arguments.orderFulfillment.getOrderFulfillmentItems(), index);
			
			if(!arrayLen(arguments.orderFulfillment.getOrderFulfillmentItems()) && !isNull(getOrder())) {
				getOrder().removeOrderFulfillment(arguments.orderFulfillment);
			}
		}
		structDelete(variables, "orderFulfillment");
	}
	/*
	 * Removes all of the product bundle build items from this build.
	 */
	public function removeAllProductBundleBuildItems()
	{
		if( !IsNull( this.getProductBundleBuildItems())){
        		ArrayClear( this.getProductBundleBuildItems() );
        	}
	}
	/*
	 * Overrides the add method to call add from the other side of the relationship.
	 *
	 */
 	/*void function addProductBundleBuildItem( required productBundleBuildItem )
 	{
 		if( !hasProductBundleBuildItem() )
 		{
 			variables.productBundleBuildItem = [];
 		}
 		ArrayAppend( variables.productBundleBuildItem, arguments.productBundleBuildItem );
 		arguments.productBundleBuildItem.setProductBundleBuild( this );
 	}*/
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