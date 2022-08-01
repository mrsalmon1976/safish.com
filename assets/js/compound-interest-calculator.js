var cicvue = new Vue({
	el: '#cic-app',
	data: {
      compounding: 12,
      futureValue: null,
      interestEarned: null,
	    principalAmount: null,
	    principalAmountState: -1,
	    interestRate: null,
	    interestRateState: -1,
	    periodRangeState: -1,

	},
	// define methods under the `methods` object
	methods: {
	    isValid: function() {
	    	debugger;
				return (this.principalAmountState == 1 && this.interestRateState == 1 && this.periodRangeState == 1);
	    },
      onCompoundingChange: function() {
          this.recalculate();
      },
	    onInterestRateKeyUp: function(event) {
	    	if ((this.isNumeric(this.interestRate)) && this.interestRate > 0 && this.interestRate < 100) {
	    		this.interestRateState = 1;
	    	}
	    	else {
	    		this.interestRateState = 0;
	    	}
				this.recalculate();
	    },
      onPeriodChange: function() {
          this.fromDate = moment($('#periodFrom').val(), 'DD/MM/YYYY');
          this.toDate = moment($('#periodTo').val(), 'DD/MM/YYYY');
          var isValid = (this.fromDate.isValid() && this.toDate.isValid() && this.fromDate.isBefore(this.toDate));
          this.periodRangeState = (isValid ? 1 : 0);
          this.recalculate();
      },
	    onPrincipalAmountKeyUp: function(event) {
	    	if ((this.isNumeric(this.principalAmount)) && this.principalAmount > 0) {
	    		this.principalAmountState = 1;
	    	}
	    	else {
	    		this.principalAmountState = 0;
	    	}
				this.recalculate();
				
	    },
	    formatNumber: function(n) {
		    var value = (n).toLocaleString(
		      'en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }
		    );
		    return value;
	    },
	    isNumeric: function(n) {
	    	return (!isNaN(n) && isFinite(n));
	    },
	    recalculate: function (event) {

				this.interestEarned = null;
				this.futureValue = null;

				if (this.isValid())
				{
					var principalAmount = this.principalAmount * 1;
					var interest = this.interestRate * 1;
					var years = this.toDate.clone().add(1, 'days').diff(this.fromDate, 'years', true);
					var compounding = this.compounding * 1;
					
					var result = (principalAmount * Math.pow((1 + (interest / (compounding*100))), (compounding * years)));
					
					this.futureValue = this.formatNumber(result);
					this.interestEarned = this.formatNumber((result - (this.principalAmount * 1)));
				}
				
				
	    }
	}
});

// fire up the datepicker
var datePicker = $('#periodDatePicker').datepicker({
    inputs: $('.periodRange'),
    format: 'dd/mm/yyyy',
    autoclose: true,
});
datePicker.on('changeDate', function(e) { cicvue.onPeriodChange(); })
datePicker.on('clearDate', function(e) { cicvue.onPeriodChange(); });    

