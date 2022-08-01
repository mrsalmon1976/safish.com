<?php 
define('__ROOT__', dirname(dirname(dirname(dirname(__FILE__))))); 
require_once(__ROOT__ . "/software/inc/BasePage.php");

class FutureValueAnnuityCalc extends BasePage {
	
	public function __construct()
	{
		parent::__construct();
		$this->title = $this->title . "Future value of an annuity calculator";
        $this->metaTitle = "A calculator for working out the future value of an annuity with monthly compounding interest.";
	}
	
	public function RenderBody() {
		?>
		<h1>Future Value of an Annuity Calculator</h1>
		<p>
		<?php print $this->metaTitle; ?>
		<p>
		Enter amounts as whole numbers, or in the case of decimals only 
		include the decimal point.
		<p>

		<form id="fva-app" name="frmCalc" class="form-horizontal">

			<div class="control-group" v-bind:class="presentValueClass">
				<label class="control-label" for="presentValue">Present value</label>
				<div class="controls">
					<input id="txtPresentValue" v-model.number="presentValue" v-on:keyup="onPresentValueKeyUp" type="number" maxlength="15" name="presentValue" value="" placeholder="100000">
					<span class="help-inline" v-if="presentValueClass == 'error'">Present value must be greater than 0</span>
				</div>
			</div>	
			<div class="control-group" v-bind:class="interestRateClass">
				<label class="control-label" for="interestRate">Interest rate</label>
				<div class="controls">
					<input id="txtInterestRate" v-model.number="interestRate" v-on:keyup="onInterestRateKeyUp" type="number" maxlength="10" name="interestRate" value="" placeholder="5.5">
					<span class="help-inline" v-if="interestRateClass == 'error'">Interest rate must be greater than 0 and less than 100</span>
				</div>
			</div>	
			<div class="control-group" v-bind:class="yearsClass">
				<label class="control-label" for="years">Years</label>
				<div class="controls">
					<input id="txtYears" v-model.number="years" v-on:keyup="onYearsKeyUp" type="number" maxlength="3" name="years" value="" placeholder="10">
					<span class="help-inline" v-if="yearsClass == 'error'">Years must be greater than 0 and less than 100</span>
				</div>
			</div>	
			<div class="control-group" v-bind:class="contributionClass">
				<label class="control-label" for="contribution">Monthly contribution</label>
				<div class="controls">
					<input id="txtContribution" v-model.number="contribution" v-on:keyup="onContributionKeyUp" type="number" maxlength="15" name="contribution" value="" placeholder="1000">
					<span class="help-inline" v-if="contributionClass == 'error'">Monthly contribution must be greater than 0</span>
				</div>
			</div>	
			<div class="tool-separator control-group">
				<label class="control-label" for="txtFutureValue">Future value</label>
				<div class="controls">
					<input v-model="futureValue" type="text" maxlength="100" id="txtFutureValue" name="txtFutureValue" value="0" readonly="readonly">
				</div>
			</div>	
			
		</form>
		<?php
	}

	public function RenderScripts()
	{
		parent::RenderScripts();
		parent::WriteScriptTag('/static/min/g=js_futurevalueannuitycalc');
	}

}

$page = new FutureValueAnnuityCalc();
$page->Render();
?>
