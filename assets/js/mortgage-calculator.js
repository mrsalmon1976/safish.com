$(document).ready(function () {
    var mcvue = new Vue({
        el: '#mc-app',
        data: {
            propertyValue: null,
            monthlyRepayments: null,
            interestOnly: null,
            deposit: null,
            loanYears: null,
            interestRate: null,
            validationErrors: [],
            propertyValueClass: '',
            depositClass: '',
            loanYearsClass: '',
            interestRateClass: ''
        },
        // define methods under the `methods` object
        methods: {
            isValid: function() {
                return ((this.propertyValueClass == 'success')
                    && (this.depositClass == 'success')
                    && (this.loanYearsClass == 'success')
                    && (this.interestRateClass == 'success')
                );
            },
            onDepositKeyUp: function(event) {
                var isValid = (($.isNumeric(this.deposit)) && this.deposit >= 0 && this.deposit <= this.propertyValue);
                this.depositClass = (isValid ? 'success' : 'error');
                this.recalculate();
            },
            onInterestRateKeyUp: function(event) {
                var isValid = (($.isNumeric(this.interestRate)) && this.interestRate > 0 && this.interestRate <= 100); 
                this.interestRateClass = (isValid ? 'success' : 'error');
                this.recalculate();
            },
            onLoanYearsKeyUp: function(event) {
                var isValid = (($.isNumeric(this.loanYears)) && this.loanYears > 0 && this.loanYears <= 100); 
                this.loanYearsClass = (isValid ? 'success' : 'error');
                this.recalculate();
            },
            onPropertyValueKeyUp: function(event) {
                var isValid = (($.isNumeric(this.propertyValue)) && this.propertyValue > 0); 
                this.propertyValueClass = (isValid ? 'success' : 'error');
                this.recalculate();
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

                    this.monthlyRepayments = formatNumber(calc, 2);
                    calc = (amount * interest) / 12;
                    this.interestOnly = formatNumber(calc, 2);
                }
            }
        }
    });
    $('#txtPropertyValue').focus();
});
