var fvavue = new Vue({
	el: '#fva-app',
	data: {
		presentValue: null,
    presentValueState: -1,
		interestRate: null,
    interestRateState: -1,
		years: null,
		yearsState: -1,
		contribution: null,
		contributionState: -1,
		futureValue: null,
	},
	// define methods under the `methods` object
	methods: {
	    isValid: function() {
				return (this.presentValueState == 1 && this.interestRateState == 1 && this.yearsState == 1 && this.contributionState == 1);
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
      onContributionKeyUp: function() {
	    	if ((this.isNumeric(this.contribution)) && this.contribution > 0) {
	    		this.contributionState = 1;
	    	}
	    	else {
	    		this.contributionState = 0;
	    	}
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
		        var contribution = this.contribution * 1;

		        var result = calcFutureValueAnnuity(presentValue, interest / 100, 12, years, contribution, 2);
		        this.futureValue = result;
		    }
      }	    
	}
});

