$(document).ready(function () {
    var fvvue = new Vue({
        el: '#fv-app',
        data: {
            presentValue: null,
            interestRate: null,
            years: null,
            compounding: 12,
            futureValue: null,
            presentValueClass: '',
            interestRateClass: '',
            yearsClass: '',
        },
        // define methods under the `methods` object
        methods: {
            isValid: function() {
                return ((this.presentValueClass == 'success')
                    && (this.interestRateClass == 'success')
                    && (this.yearsClass == 'success')
                );
            },
            onCompoundingChange: function() {
                this.recalculate();
            },
            onInterestRateKeyUp: function(event) {
                var isValid = (($.isNumeric(this.interestRate)) && this.interestRate >= 0 && this.interestRate < 100);
                this.interestRateClass = (isValid ? 'success' : 'error');
                this.recalculate();
            },
            onPresentValueKeyUp: function(event) {
                var isValid = (($.isNumeric(this.presentValue)) && this.presentValue >= 0);
                this.presentValueClass = (isValid ? 'success' : 'error');
                this.recalculate();
            },
            onYearsKeyUp: function(event) {
                var isValid = (($.isNumeric(this.years)) && this.years >= 0 && this.years < 100);
                this.yearsClass = (isValid ? 'success' : 'error');
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
                    this.futureValue = result.toFixed(2);
                }
            }
        }
    });
    $('#txtPresentValue').focus();
});
