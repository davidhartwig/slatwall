<cfimport prefix="swa" taglib="../../../../tags" />
<cfimport prefix="hb" taglib="../../../../org/Hibachi/HibachiTags" />

<cfparam name="rc.orderPayment" type="any" />
<cfparam name="rc.edit" type="boolean" />

<cfoutput>
	<hb:HibachiPropertyRow>
		<hb:HibachiPropertyList divClass="col-md-6">
			<cfif rc.orderPayment.getPaymentMethodType() eq "creditCard">
				<hb:HibachiPropertyDisplay object="#rc.orderPayment#" property="nameOnCreditCard" edit="#rc.edit#" />
				<hb:HibachiPropertyDisplay object="#rc.orderPayment#" property="creditCardType" />
				<hb:HibachiPropertyDisplay object="#rc.orderPayment#" property="expirationMonth" edit="#rc.edit#" />
				<hb:HibachiPropertyDisplay object="#rc.orderPayment#" property="expirationYear" edit="#rc.edit#" />
			<cfelseif rc.orderPayment.getPaymentMethodType() eq "termPayment">
				<hb:HibachiPropertyDisplay object="#rc.orderPayment#" property="termPaymentAccount" edit="false" />
				<hb:HibachiPropertyDisplay object="#rc.orderPayment#" property="paymentTerm" edit="false" />
			</cfif>
			
			<cfif listFindNoCase("creditCard,termPayment", rc.orderPayment.getPaymentMethodType()) or not isNull(rc.orderPayment.getBillingAddress())>
				<hr />
				<hb:HibachiPropertyDisplay object="#rc.orderPayment.getBillingAddress()#" property="name" edit="#rc.edit#" title="Address nickname"/>
				<hb:HibachiPropertyDisplay object="#rc.orderPayment.getBillingAddress()#" property="company" edit="#rc.edit#" />
				<hb:HibachiPropertyDisplay object="#rc.orderPayment.getBillingAddress()#" property="streetAddress" edit="#rc.edit#" />
				<hb:HibachiPropertyDisplay object="#rc.orderPayment.getBillingAddress()#" property="street2Address" edit="#rc.edit#" />
				<hb:HibachiPropertyDisplay object="#rc.orderPayment.getBillingAddress()#" property="city" edit="#rc.edit#" />
				<hb:HibachiPropertyDisplay object="#rc.orderPayment.getBillingAddress()#" property="stateCode" edit="#rc.edit#" />
				<hb:HibachiPropertyDisplay object="#rc.orderPayment.getBillingAddress()#" property="postalCode" edit="#rc.edit#" />
				<hb:HibachiPropertyDisplay object="#rc.orderPayment.getBillingAddress()#" property="countryCode" edit="#rc.edit#" />
			</cfif>
		</hb:HibachiPropertyList>
		<hb:HibachiPropertyList divClass="col-md-6">
			<hb:HibachiPropertyDisplay object="#rc.orderPayment#" property="dynamicAmountFlag" edit="false" />
			<hb:HibachiPropertyDisplay object="#rc.orderPayment#" property="orderPaymentType" />
			<hb:HibachiPropertyDisplay object="#rc.orderPayment#" property="amount" edit="#rc.edit and not rc.orderPayment.getDynamicAmountFlag()#" />
			<hr />
			<hb:HibachiPropertyDisplay object="#rc.orderPayment#" property="amountAuthorized" />
			<hb:HibachiPropertyDisplay object="#rc.orderPayment#" property="amountReceived" />
			<hb:HibachiPropertyDisplay object="#rc.orderPayment#" property="amountCredited" />
		</hb:HibachiPropertyList>
	</hb:HibachiPropertyRow>
</cfoutput>