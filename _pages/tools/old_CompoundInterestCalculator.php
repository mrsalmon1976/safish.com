<?php
define('__ROOT__', dirname(dirname(dirname(dirname(__FILE__))))); 

require_once(__ROOT__ . "/software/inc/BasePage.php");

class CompoundInterestCalculatorPage extends BasePage
{

	public function __construct()
	{
		parent::__construct('../');
		$this->title = $this->title . " Compound interest calculator";
		$this->menu_selected_item = 'online_tools';
        $this->metaTitle = "A calculator for working out the amount of interest earned on a principal sum with compound interest.";
	}
	
	public function RenderBody()
	{
		?>
		<h1>Compound Interest Calculator</h1>
		<p>
		<?php print $this->metaTitle; ?>
		<p>
		Enter amounts as whole numbers, or in the case of decimals only 
		include the decimal point.
		<p>
		<form id="cic-app" name="frmCalc" class="form-horizontal">
			
			<div class="control-group" v-bind:class="principalAmountClass">
				<label class="control-label" for="principalAmount">Principal amount</label>
				<div class="controls">
					<input id="txtPrincipalAmount" v-model.number="principalAmount" v-on:keyup="onPrincipalAmountKeyUp" type="number" maxlength="15" name="principalAmount" value="" placeholder="10000">
					<span class="help-inline" v-if="principalAmountClass == 'error'">Principal amount must be greater than 0</span>
				</div>
			</div>	
			<div class="control-group" v-bind:class="interestRateClass">
				<label class="control-label" for="interestRate">Interest rate</label>
				<div class="controls">
					<input id="txtInterestRate" v-model.number="interestRate" v-on:keyup="onInterestRateKeyUp" type="number" maxlength="50" name="interestRate" value="" placeholder="5.5">
					<span class="help-inline" v-if="interestRateClass == 'error'">Interest rate must be greater than 0 and less than 100</span>
				</div>
			</div>	
			<div class="control-group" v-bind:class="periodRangeClass">
				<label class="control-label" for="periodDatePicker">Period</label>
				<div class="controls">
					<div id="periodDatePicker">
						<input id="periodFrom" v-on:blur="onPeriodChange" type="text" class="periodRange">
						<input id="periodTo" v-on:blur="onPeriodChange" type="text" class="periodRange">
					</div>
					<span class="help-inline" v-if="periodRangeClass == 'error'">Period must contain valid dates at least one day apart</span>
				</div>
			</div>	
			<div class="control-group" >
				<label class="control-label" for="ddlCompounding">Compounding</label>
				<div class="controls">
					<select id="ddlCompounding" name="ddlCompounding" v-model.number="compounding" v-on:change="onCompoundingChange">
						<option value="365">Daily</option>
						<option value="12">Monthly</option>
						<option value="1">Annually</option>
					</select>
				</div>
			</div>	
			<div class="tool-separator control-group">
				<label class="control-label" for="txtFutureValue">Future value</label>
				<div class="controls">
					<input v-model="futureValue" type="text" maxlength="100" id="txtFutureValue" name="txtFutureValue" value="0" readonly="readonly">
				</div>
			</div>	
			<div class="control-group">
				<label class="control-label" for="txtInterestEarned">Interest earned</label>
				<div class="controls">
					<input v-model="interestEarned" type="text" maxlength="100" id="txtInterestEarned" name="txtInterestEarned" value="0" readonly="readonly">
				</div>
			</div>	
		</form>	
	<?php
	}
	
	public function RenderScripts() {
		parent::RenderScripts();
		?>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.7.1/js/bootstrap-datepicker.min.js"></script>
		<?php
		parent::WriteScriptTag('/static/min/g=js_compoundinterestcalc');
	}

	public function RenderStyles()
	{
		parent::RenderStyles();
		?>
		<link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.7.1/css/bootstrap-datepicker.min.css" />
		<?php
	}
}

$page = new CompoundInterestCalculatorPage();
$page->Render();
?>