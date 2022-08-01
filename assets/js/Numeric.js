// calculates the effective interest over a payment period (usually a year)
// @interestRate - the annual interest rate
// @periods - the number of compounding periods per year (monthly = 12)
function calcEffectiveInterestRate(interestRate, periods)
{
	return Math.pow((1 + interestRate / periods), periods) - 1;
}

// calculates the future value of a lump sum
// Depends on: calcEffectiveInterestRate
// @presentValue - the initial value of the investment
// @interestRate - the interest rate expressed as a decimal e.g. 10% interest rate
//                 is passed in as 0.1
// @calcsPerPeriod - the number of times interest is compounded per period (i.e. if 
//                   monthly then pass in 12)
// @periods - the number of periods to calculate over (usually years)
// @roundedTo (optional) - if supplied, the result will be rounded to this many 
//                         decimal places
function calcFutureValue(presentValue, interestRate, calcsPerPeriod, periods, roundedTo)
{
	var i = calcEffectiveInterestRate(interestRate, calcsPerPeriod);
	var result = presentValue * Math.pow((1 + i), periods);
	if (arguments.length > 4)
		result = new Number(result).toFixed(roundedTo);
	return result;
}

// calculates the future value of an annuity
// Depends on: calcEffectiveInterestRate
// Depends on: calcFutureValue
// @initialValue - the initial value of the investment
// @interestRate - the interest rate expressed as a decimal e.g. 10% interest rate
//                 is passed in as 0.1
// @calcsPerPeriod - the number of times interest is compounded per period (i.e. if 
//                   monthly then pass in 12)
// @periods - the number of periods to calculate over (usually years)
// @contribution - the amount contributed (e.g. monthly payment)
// @roundedTo (optional) - if supplied, the result will be rounded to this many 
//                         decimal places
function calcFutureValueAnnuity(initialValue, interestRate, calcsPerPeriod, periods, contribution, roundedTo)
{
	var i = interestRate / calcsPerPeriod;
	var n = periods * calcsPerPeriod;
	
	var result = contribution * (Math.pow((1 + i), n) - 1) / i;
	result += calcFutureValue(initialValue, interestRate, calcsPerPeriod, periods);
	
	if (arguments.length > 4)
		result = new Number(result).toFixed(roundedTo);
	return result;
}

// number formatting function
// copyright Stephen Chapman 24th March 2006, 10th February 2007  
// permission to use this function is granted provided that this copyright notice is retained intact 					
// (This has been modified, but I have left the copyright notice in as I didn't originally write this)
// @num - the number to be formatted
// @dec (optional) - the number of decimals to display (defaults to 2)
// @thou (optional) - the thousand separator character (defaults to a comma)
// @pnt (optional) - the decimal character (defaults to a period)
// @curr1 (optional) - the left hand currency symbol for currencies (e.g. R for Rands)
// @curr2 (optional) - the right hand currency symbol (e.g. c for cents)
// @n1 (optional) - additional characters on the left hand side (appear after curr1)
// @n2 (optional) - additional characters on the right hand side (appear before curr2)
function formatNumber(num, dec, thou, pnt, curr1, curr2, n1, n2) 
{
    if (arguments.length < 8) n2 = '';
    if (arguments.length < 7) n1 = '';
    if (arguments.length < 6) curr2 = '';
    if (arguments.length < 5) curr1 = '';
    if (arguments.length < 4) pnt = '.';
    if (arguments.length < 3) thou = ',';
    if (arguments.length < 2) dec = 2;
    var neg = (num < 0 ? '-' : '');
    var x = Math.round(num * Math.pow(10,dec));
    if (x >= 0) 
        n1=n2='';
    var y = (''+Math.abs(x)).split('');
    var z = y.length - dec; 
    if (z<0) 
        z--; 
    for (var i = z; i < 0; i++) 
        y.unshift('0');
    y.splice(z, 0, pnt); 
    while (z > 3) 
    {
        z-=3; 
        y.splice(z,0,thou);
    }

    var r = neg + curr1 + n1 +y.join('') +n2 + curr2;
    return r;
}
