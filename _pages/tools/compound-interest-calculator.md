---
layout: page
title: Compound Interest Calculator
permalink: /tools/compound-interest-calculator
js: /assets/js/compound-interest-calculator.js
ext-js: https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.7.1/js/bootstrap-datepicker.min.js
ext-css: https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.7.1/css/bootstrap-datepicker.min.css
---

<p>
A calculator for working out the amount of interest earned on a principal sum with compound interest.
</p>
<p>
Enter amounts as whole numbers, or in the case of decimals only include the decimal point.
</p>
<p>
<form id="cic-app" name="frmCalc" class="form-horizontal">
<div>			
	<div class="form-group row">
		<label for="principalAmount" class="col-sm-4 col-form-label">Principal amount</label>
		<div class="col-sm-8 controls">
			<input v-model.number="principalAmount" v-on:keyup="onPrincipalAmountKeyUp" v-on:change="onPrincipalAmountKeyUp" class="form-control" v-bind:class="{ 'is-valid': principalAmountState == 1, 'is-invalid': principalAmountState == 0 }" type="number" size="10" maxlength="15" name="principalAmount" value="" step="10000">
			<div v-if="principalAmountState == 0" class="invalid-feedback">Principal amount must be greater than 0</div>
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
	
	

	<div class="form-group row">
		<label class="col-sm-4 col-form-label" for="periodDatePicker">Period</label>
		<div class="col-sm-8 controls">
			<div id="periodDatePicker">
				<input id="periodFrom" v-on:blur="onPeriodChange" type="text" class="periodRange">
				<input id="periodTo" v-on:blur="onPeriodChange" type="text" class="periodRange">
			</div>
			<span class="help-inline" v-if="periodRangeClass == 'error'">Period must contain valid dates at least one day apart</span>
		</div>
	</div>	
	<div class="form-group row" >
		<label class="col-sm-4 col-form-label" for="ddlCompounding">Compounding</label>
		<div class="col-sm-8 controls">
			<select id="ddlCompounding" name="ddlCompounding" v-model.number="compounding" v-on:change="onCompoundingChange">
				<option value="365">Daily</option>
				<option value="12">Monthly</option>
				<option value="1">Annually</option>
			</select>
		</div>
	</div>	
	<div class="tool-separator form-group row">
		<label class="col-sm-4 col-form-label" for="txtFutureValue">Future value</label>
		<div class="col-sm-8 controls">
			<input v-model="futureValue" type="text" maxlength="100" id="txtFutureValue" name="txtFutureValue" value="0" readonly="readonly">
		</div>
	</div>	
	<div class="form-group row">
		<label class="col-sm-4 col-form-label" for="txtInterestEarned">Interest earned</label>
		<div class="col-sm-8 controls">
			<input v-model="interestEarned" type="text" maxlength="100" id="txtInterestEarned" name="txtInterestEarned" value="0" readonly="readonly">
		</div>
	</div>	
</div>
</form>	

