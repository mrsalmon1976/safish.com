var cicue = new Vue({
	el: '#cic-app',
	data: {
	    principalAmount: null,
	    principalAmountState: -1,
	    interestRate: null,
	    interestRateState: -1,
	    
	    deposit: null,
	    depositState: -1,
	    loanYears: null,
	    loanYearsState: true,
	    monthlyRepayments: null,
	    interestOnly: null
	},
	// define methods under the `methods` object
	methods: {
	    isValid: function() {
				return (this.principalAmountState == 1 && this.depositState == 1 && this.loanYearsState == 1 && this.interestRateState == 1);
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

