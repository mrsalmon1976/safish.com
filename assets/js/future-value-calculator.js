var fvvue = new Vue({
	el: '#fv-app',
	data: {
		presentValue: null,
    presentValueState: -1,
		interestRate: null,
    interestRateState: -1,
		years: null,
		yearsState: -1,
		compounding: 12,
		futureValue: null,
	},
	// define methods under the `methods` object
	methods: {
	    isValid: function() {
				return (this.presentValueState == 1 && this.interestRateState == 1 && this.yearsState == 1);
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
			onPresentValueKeyUp: function(event) {
	    	if ((this.isNumeric(this.presentValue)) && this.presentValue > 0) {
	    		this.presentValueState = 1;
	    	}
	    	else {
	    		this.presentValueState = 0;
	    	}
				this.recalculate();
	    },
			onYearsKeyUp: function(event) {
	    	if ((this.isNumeric(this.years)) && this.years >= 0 && this.years < 100) {
	    		this.yearsState = 1;
	    	}
	    	else {
	    		this.yearsState = 0;
	    	}
				this.recalculate();
	    },
      recalculate: function (event) {

          this.futureValue = null;
          if (this.isValid())
          {
              var presentValue = this.presentValue * 1;
              var interest = this.interestRate * 1;
              var years = this.years * 1;
              var compounding = this.compounding * 1;

							var result = calcFutureValue(presentValue, interest / 100, compounding, years);
              this.futureValue = formatNumber(result);
          }
      }	    
	}
});

