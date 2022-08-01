$(document).ready(function () {
    var fvavue = new Vue({
        el: '#fva-app',
        data: {
            presentValue: null,
            interestRate: null,
            years: null,
            contribution: null,
            futureValue: null,
            presentValueClass: '',
            interestRateClass: '',
            yearsClass: '',
            contributionClass: '',
        },
        // define methods under the `methods` object
        methods: {
            isValid: function() {
                return ((this.presentValueClass == 'success')
                    && (this.interestRateClass == 'success')
                    && (this.yearsClass == 'success')
                    && (this.contributionClass == 'success')
                );
            },
            onContributionKeyUp: function() {
                var isValid = (($.isNumeric(this.contribution)) && this.contribution > 0);
                this.contributionClass = (isValid ? 'success' : 'error');
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
                    var contribution = this.contribution * 1;
    
                    var result = calcFutureValueAnnuity(presentValue, interest / 100, 12, years, contribution, 2);
                    this.futureValue = result;
                }
            }
        }
    });
    $('#txtPresentValue').focus();
});