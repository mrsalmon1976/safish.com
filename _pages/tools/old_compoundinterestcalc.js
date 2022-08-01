$(document).ready(function () {
    var cicvue = new Vue({
        el: '#cic-app',
        data: {
            compounding: 12,
            principalAmount: null,
            interestRate: null,
            fromDate: null,
            toDate: null,
            futureValue: null,
            interestEarned: null,
            principalAmountClass: '',
            interestRateClass: '',
            periodRangeClass: '',
        },
        // define methods under the `methods` object
        methods: {
            isValid: function() {
                return ((this.principalAmountClass == 'success')
                    && (this.interestRateClass == 'success')
                    && (this.periodRangeClass == 'success')
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
            onPeriodChange: function() {
                this.fromDate = moment($('#periodFrom').val(), 'DD/MM/YYYY');
                this.toDate = moment($('#periodTo').val(), 'DD/MM/YYYY');
                var isValid = (this.fromDate.isValid() && this.toDate.isValid() && this.fromDate.isBefore(this.toDate));
                this.periodRangeClass = (isValid ? 'success' : 'error');
                this.recalculate();
            },
            onPrincipalAmountKeyUp: function(event) {
                var isValid = (($.isNumeric(this.principalAmount)) && this.principalAmount >= 0);
                this.principalAmountClass = (isValid ? 'success' : 'error');
                this.recalculate();
            },
            recalculate: function (event) {

                //debugger;
                this.interestEarned = null;
                this.futureValue = null;

                if (this.isValid())
                {
                    var principalAmount = this.principalAmount * 1;
                    var interest = this.interestRate * 1;
                    var years = this.toDate.clone().add(1, 'days').diff(this.fromDate, 'years',true); 
                    var compounding = this.compounding * 1;
    
                    var result = (principalAmount * Math.pow((1 + (interest/(compounding*100))), (compounding * years)));

                    this.futureValue = result.toFixed(2);
                    this.interestEarned = (result - (this.principalAmount * 1)).toFixed(2);
                }
            }
        }
    });
    var datePicker = $('#periodDatePicker').datepicker({
        inputs: $('.periodRange'),
        format: 'dd/mm/yyyy',
        autoclose: true,
    });
    datePicker.on('changeDate', function(e) { cicvue.onPeriodChange(); })
    datePicker.on('clearDate', function(e) { cicvue.onPeriodChange(); });    
    $('#txtPrincipalAmount').focus();
});
