---
layout: page
title: Compound Interes Calculator
permalink: /tools/compound-interest-calculator
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
		<label class="col-sm-4 col-form-label" for="principalAmount">Principal amount</label>
		<div class="col-sm-8 controls">
			<input id="txtPrincipalAmount" v-model.number="principalAmount" v-on:keyup="onPrincipalAmountKeyUp" type="number" maxlength="15" name="principalAmount" value="" placeholder="10000">
			<span class="help-inline" v-if="principalAmountClass == 'error'">Principal amount must be greater than 0</span>
		</div>
	</div>	
	<div class="form-group row">
		<label class="col-sm-4 col-form-label" for="interestRate">Interest rate</label>
		<div class="col-sm-8 controls">
			<input id="txtInterestRate" v-model.number="interestRate" v-on:keyup="onInterestRateKeyUp" type="number" maxlength="50" name="interestRate" value="" placeholder="5.5">
			<span class="help-inline" v-if="interestRateClass == 'error'">Interest rate must be greater than 0 and less than 100</span>
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
<script defer src="{{ "/assets/js/compound-interest-calculator.js" | absolute_url }}"></script>.

