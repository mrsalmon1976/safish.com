---
layout: page
title: Future Value Calculator
permalink: /tools/future-value-calculator
js: [/assets/js/Numeric.js, /assets/js/future-value-calculator.js]
---

<p>
A calculator for working out the future value of an investment, taking compound interest into account.
</p>
<p>
Enter amounts as whole numbers, or in the case of decimals only include the decimal point.
</p>
<p>
<form id="fv-app" name="frmCalc" class="form-horizontal">
<div>			
	<div class="form-group row">
		<label for="presentValue" class="col-sm-4 col-form-label">Present value</label>
		<div class="col-sm-8 controls">
			<input v-model.number="presentValue" v-on:keyup="onPresentValueKeyUp" v-on:change="onPresentValueKeyUp" class="form-control" v-bind:class="{ 'is-valid': presentValueState == 1, 'is-invalid': presentValueState == 0 }" type="number" size="10" maxlength="15" name="presentValue" value="" step="10000">
			<div v-if="presentValueState == 0" class="invalid-feedback">Present value must be greater than 0</div>
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
		<label class="col-sm-4 col-form-label" for="years">Years</label>
		<div class="col-sm-8 controls">
			<input id="txtYears" v-model.number="years" v-on:keyup="onYearsKeyUp" class="form-control" type="number" maxlength="3" name="years" value="" placeholder="">
			<div v-if="yearsState == 0" class="invalid-feedback">Years must be greater than 0 and less than 100</div>
		</div>
	</div>	
	<div class="form-group row" >
		<label for="ddlCompounding" class="col-sm-4 col-form-label">Compounding</label>
		<div class="col-sm-8 controls">
			<select id="ddlCompounding" class="form-control" name="ddlCompounding" v-model.number="compounding" v-on:change="onCompoundingChange">
				<option value="365">Daily</option>
				<option value="12">Monthly</option>
				<option value="1">Annually</option>
			</select>
		</div>
	</div>	
	
	
	<hr />

	<div class="form-group row">
		<label for="txtFutureValue" class="col-sm-4 col-form-label">Future value</label>
		<div class="col-sm-8 controls">
			<input v-model.number="futureValue" class="form-control" type="text" name="txtFutureValue" placeholder="" readonly="readonly">
		</div>
	</div>
	
</div>
</form>	

