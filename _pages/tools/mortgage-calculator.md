---
layout: page
title: Mortgage Calculator
permalink: /tools/mortgage-calculator
---

<p>
This is a simple calculator that allows you to calculate your monthly repayments on a 
loan given a value, deposit, interest rate, and length of term of the loan. 
</p>
<p>
Enter amounts as whole numbers, or in the case of decimals only, include the decimal point.
</p>
<p>
<form id="mc-app" name="frmMain" class="form-horizontal">
<div>
	<div class="form-group row">
		<label for="prop_val" class="col-sm-4 col-form-label">Value of property</label>
		<div class="col-sm-8 controls">
			<input v-model.number="propertyValue" v-on:keyup="onPropertyValueKeyUp" v-on:change="onPropertyValueKeyUp" class="form-control" v-bind:class="{ 'is-valid': propertyValueState == 1, 'is-invalid': propertyValueState == 0 }" type="number" size="10" maxlength="10" name="prop_val" value="" step="100000">
			<div v-if="propertyValueState == 0" class="invalid-feedback">Property value must be greater than 0</div>
		</div>
	</div>
	<div class="form-group row">
		<label for="deposit" class="col-sm-4 col-form-label">Deposit</label>
		<div class="col-sm-8 controls">
				<input v-model.number="deposit" v-on:keyup="onDepositKeyUp" v-on:change="onDepositKeyUp" class="form-control" v-bind:class="{ 'is-valid': depositState == 1, 'is-invalid': depositState == 0 }" type="number" size="10" maxlength="10" name="deposit" step="100000">
				<div v-if="depositState == 0" class="invalid-feedback">Deposit must be at least 0 and less than property value</div>
		</div>
	</div>
	<div class="form-group row">
		<label for="loan_length" class="col-sm-4 col-form-label">Length of loan</label>
		<div class="col-sm-8 controls">
			<div class="input-group">
				<input v-model.number="loanYears" v-on:keyup="onLoanYearsKeyUp" v-on:change="onLoanYearsKeyUp" class="form-control" v-bind:class="{ 'is-valid': loanYearsState == 1, 'is-invalid': loanYearsState == 0 }" type="number" size="3" maxlength="2" name="loan_length" placeholder="" step="1">
				<div class="input-group-apppend">
          <span class="input-group-text">years</span>
        </div>
     </div>
				<div v-if="loanYearsState == 0" class="invalid-feedback">Length of loan must be greater than 0 and less than 100</div>
		</div>
	</div>
	<div class="form-group row">
		<label for="interest" class="col-sm-4 col-form-label">Interest rate</label>
		<div class="col-sm-8 controls">
			<div class="input-group">
				<input v-model.number="interestRate" v-on:keyup="onInterestRateKeyUp" v-on:change="onInterestRateKeyUp" class="form-control" v-bind:class="{ 'is-valid': interestRateState == 1, 'is-invalid': interestRateState == 0 }" type="number" name="interest" placeholder="" step="1">
				<div class="input-group-apppend">
          <span class="input-group-text">%</span>
        </div>
     </div>
				<div v-if="interestRateState == 0" class="invalid-feedback">Interest rate must be greater than 0 and less than 100</div>
		</div>
	</div>
	
	<hr />

	<div class="form-group row">
		<label for="monthlyRepayments" class="col-sm-4 col-form-label">Monthly repayments</label>
		<div class="col-sm-8 controls">
			<input v-model.number="monthlyRepayments" class="form-control" type="text" name="monthlyRepayments" placeholder="" readonly="readonly">
		</div>
	</div>

	<div class="form-group row">
		<label for="interestOnly" class="col-sm-4 col-form-label">Interest rate</label>
		<div class="col-sm-8 controls">
			<input v-model.number="interestOnly" class="form-control" type="text" name="interestOnly" placeholder="" readonly="readonly">
		</div>
	</div>

	</div>
</form>
<script defer src="{{ base.url | prepend: site.url }}/assets/js/mortgage-calculator.js"></script>.

