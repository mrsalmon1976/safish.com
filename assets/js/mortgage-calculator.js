var mcvue = new Vue({
	el: '#mc-app',
	data: {
	    propertyValue: null,
	    propertyValueState: -1,
	    deposit: null,
	    depositState: -1,
	    loanYears: null,
	    loanYearsState: true,
	    interestRate: null,
	    interestRateState: -1,
	    monthlyRepayments: null,
	    interestOnly: null
	},
	// define methods under the `methods` object
	methods: {
	    isValid: function() {
				return (this.propertyValueState == 1 && this.depositState == 1 && this.loanYearsState == 1 && this.interestRateState == 1);
	    },
	    onDepositKeyUp: function(event) {
	    	if ((this.isNumeric(this.deposit)) && this.deposit >= 0 && this.deposit <= this.propertyValue) {
	    		this.depositState = 1;
	    	}
	    	else {
	    		this.depositState = 0;
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
	    onLoanYearsKeyUp: function(event) {
	    	if ((this.isNumeric(this.loanYears)) && this.loanYears > 0 && this.loanYears < 100) {
	    		this.loanYearsState = 1;
	    	}
	    	else {
	    		this.loanYearsState = 0;
	    	}
				this.recalculate();
	    },
	    onPropertyValueKeyUp: function(event) {
	    	if ((this.isNumeric(this.propertyValue)) && this.propertyValue > 0) {
	    		this.propertyValueState = 1;
	    	}
	    	else {
	    		this.propertyValueState = 0;
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

				this.monthlyRepayments = null;
				this.interestOnly = null;

				if (this.isValid())
				{
						var amount = this.propertyValue - this.deposit;
						var length = this.loanYears;
						var interest = this.interestRate / 100;
						var calc = ((amount * interest) / 12) * (1 / (1 - (Math.pow(1 / (1 + interest), length))));

						this.monthlyRepayments = this.formatNumber(calc);
						calc = (amount * interest) / 12;
						
						this.interestOnly = this.formatNumber(calc);
				}
	    }
	}
});

