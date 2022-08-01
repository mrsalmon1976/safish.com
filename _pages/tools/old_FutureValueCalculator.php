<?php 
define('__ROOT__', dirname(dirname(dirname(dirname(__FILE__))))); 

require_once(__ROOT__ . "/software/inc/BasePage.php");

class FutureValueCalculatorPage extends BasePage
{

	public function __construct()
	{
		parent::__construct('../');
		$this->title = $this->title . " Future value calculator";
		$this->menu_selected_item = 'online_tools';
        $this->metaTitle = "A calculator for working out the future value of an investment, taking compound interest into account.";
	}
	
	public function RenderBody()
	{
		?>
		<h1>Future Value Calculator</h1>
		<p>
		<?php print $this->metaTitle; ?>
		<p>
		Enter amounts as whole numbers, or in the case of decimals only 
		include the decimal point.
		<p>

		<form id="fv-app" name="frmCalc" class="form-horizontal">

			<div class="control-group" v-bind:class="presentValueClass">
				<label class="control-label" for="presentValue">Present value</label>
				<div class="controls">
					<input id="txtPresentValue" v-model.number="presentValue" v-on:keyup="onPresentValueKeyUp" type="number" maxlength="15" name="presentValue" value="" placeholder="100000">
					<span class="help-inline" v-if="presentValueClass == 'error'">Present must be greater than 0</span>
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

		</form>	
		<?php
	}
	
	function display_sidebar()
	{
		ContextMenu::RenderOnlineToolsSection();
		parent::display_sidebar();
	}

	public function RenderScripts()
	{
		parent::RenderScripts();
		parent::WriteScriptTag('/static/min/g=js_futurevaluecalc');
	}
	
}

$page = new FutureValueCalculatorPage();
$page->Render();
?>
