$.fn.exists = function () {
    return this.length !== 0;
  }
  
  function filldefaults()
  {
    var aptSftArea = $("input[id^='aptsftarea']" ).val();
    var aptSftRateBase = $("input[id^='aptsftratebase']" ).val();
    var floorRaiseAmt = $("input[id^='floorraiseamt']" ).val();
    var aptFloor = $("input[id^='aptfloor']" ).val();
    var carParkingRate = $("input[id^='carparking']" ).val();

    var loanAmtElement = $("input[id^='loanamt']" );
    var loanAmtVal = $("input[id^='loanamt']" ).val();

    var oneLakh=100000;
    if ( !aptSftRateBase || !floorRaiseAmt || !aptFloor || !aptSftArea || !carParkingRate) 
    {
      console.log('Some of the inputs are not set, hence returning');
      return;
    }
    
    var saleValue = (+aptSftRateBase + (+floorRaiseAmt * aptFloor)) * + aptSftArea;

    var loanPercent = 80; 
    if ( parseInt(saleValue,10) > parseInt(+75*oneLakh,10)) {
        loanPercent = 75;
    }
    
    var loanAmt = +loanPercent * saleValue / 100
    loanAmt = Math.round(loanAmt/oneLakh);

    if ( !loanAmtVal ) {
      console.log('Setting the default loan amount to ' + loanAmt + ' which is ' + loanPercent + '% of sale value');
      loanAmtElement.val(loanAmt);
    }
  }
  
  function aptinputs() {
    validation.validate();
    if ( !validation.isValid() ) return false;

      var aptSftArea = $("input[id^='aptsftarea']" ).val();
      var aptSftRateBase = $("input[id^='aptsftratebase']" ).val();
      var floorRaiseAmt = $("input[id^='floorraiseamt']" ).val();
      var aptFloor = $("input[id^='aptfloor']" ).val();
      var carParkingRate = $("input[id^='carparking']" ).val();

      var interestRate = $("input[id^='interestrate']" ).val();
      var interestDuration = $("input[id^='interestduration']" ).val();
      var loanAmt = $("input[id^='loanamt']" ).val();

      var avgRental = $("input[id^='avgmonthlyrent']" ).val();
      var avgSaleAppreciation = $("input[id^='avgappreciateratio']" ).val();

      var oneLakh=100000;

      console.log('Apmt Sft Area: ' + aptSftArea);
      console.log('Apmt Rate Base: ' + aptSftRateBase);
      console.log('Floor raise charges: ' + floorRaiseAmt);
      console.log('Apmt Floor: ' + aptFloor);
      console.log('Parking rate: ' + carParkingRate);

      console.log('Bank interest: ' + interestRate);
      console.log('Loan tenure: ' + interestDuration);
      console.log('Loan amt: ' + loanAmt);

      var saleValue = (+aptSftRateBase + (+floorRaiseAmt * aptFloor)) * + aptSftArea;
      var totalSaleValue = +saleValue + carParkingRate*oneLakh;
      var totalSaleValueIGST = +totalSaleValue * 1.12;
      var totalSaleValueDesc = "Total sale value (incl GST)";          

      console.log('Sale Value (exclude parking): ' + saleValue);
      console.log('Total Sale Value: ' + totalSaleValue);
      console.log('Total Sale Value (incl GST): ' + totalSaleValueIGST);

      var reduceTDS = +totalSaleValue / 100;
      var reduceTDSDesc = "TDS reduction";
      console.log('Reduce TDS: ' + reduceTDS);
      
      var elecPlusWater = +120 * aptSftArea;
      var elecPlusWaterIGST = +elecPlusWater * 1.18;
      var elecPlusWaterDesc = "Bescomm/Bwssb at 120INR per sft (incl GST)";
      console.log('BESCOMM/BWSSB (incl GST): ' + elecPlusWaterIGST);
      
      var generatorCharges = 120000;
      var generatorChargesIGST = +generatorCharges * 1.18;
      var generatorChargesDesc = "Generator charges flat 1.2lakhs (incl GST)";
      console.log('Generator charges (incl GST): ' + generatorChargesIGST);

      var khata = 20000;
      var khataIGST = +khata * 1.18;
      var khataDesc = "Khata & assement charges (incl GST)";
      console.log('Khata (incl GST): ' + khataIGST);

      var maintain1Year = +45 * aptSftArea;
      var maintain1YearIGST = +maintain1Year * 1.18;
      var maintain1YearDesc = "Annual maintainence charges at 45INR per sft (incl GST)";
      console.log('Maintainance (incl GST): ' + maintain1YearIGST);

      var sinkingFund = +45 * aptSftArea;
      var sinkingFundIGST = sinkingFund;
      var sinkingFundDesc = "Sinking fund at 45INR per sft (GST not applicable)";
      console.log('Sinking fund (incl GST): ' + sinkingFundIGST);

      var stampDuty = +totalSaleValue * 6 / 100;
      var stampDutyIGST = stampDuty;
      var stampDutyDesc = "Registration & stamp duty at 6% (GST not applicable)";
      console.log('Stamp duty (incl GST): ' + stampDutyIGST);

      var interiorCharges = +saleValue * 0.2;
      var interiorChargesIGST = +interiorCharges * 1.18;
      var interiorChargesDesc = "Interior work cost 20% of sale value (incl GST)";

      var tableValue = {}; // no need for an array
      tableValue[totalSaleValueDesc] = totalSaleValueIGST;
      tableValue[reduceTDSDesc] = -reduceTDS;
      tableValue[elecPlusWaterDesc] = elecPlusWaterIGST;
      tableValue[generatorChargesDesc] = generatorChargesIGST;
      tableValue[khataDesc] = khataIGST;
      tableValue[maintain1YearDesc] = maintain1YearIGST;
      tableValue[sinkingFundDesc] = sinkingFundIGST;
      tableValue[interiorChargesDesc] = interiorChargesIGST;
      tableValue[stampDutyDesc] = stampDutyIGST;

      var totalCostOfOwnership = 0;

      console.log('Printing hash:');
      Object.keys(tableValue).forEach(function(key, index) {
        console.log(key + '=' + this[key]);
        totalCostOfOwnership = +totalCostOfOwnership + this[key];
      }, tableValue);

      totalCostOfOwnership = Math.round(totalCostOfOwnership/1000)*1000;
      
      var tbl = document.createElement('table');
      tbl.setAttribute('class', 'table table-condensed');
      tbl.setAttribute('id', 'breakupdetails');
      
      //headers
      var theaders=["Details", "Amount"];
      var thead = document.createElement('thead');
      var theadrow = document.createElement('tr');
      
      var arrayLength = theaders.length;
      for (var i = 0; i < arrayLength; i++) {
        var theadth = document.createElement('th');
        theadth.textContent = theaders[i];
        theadrow.appendChild(theadth);
      }
      thead.appendChild(theadrow);
      tbl.appendChild(thead);
      
      var tbdy = document.createElement('tbody');          

      Object.keys(tableValue).forEach(function(key, index) {
        var tbdytr = document.createElement('tr');

        var tbdytdName = document.createElement('td');
        tbdytdName.textContent = key;
        tbdytr.appendChild(tbdytdName);

        var tbdytdValue = document.createElement('td');
        tbdytdValue.textContent = this[key];            
        tbdytr.appendChild(tbdytdValue);

        console.log('Row Name = '+ key + ' Row value =' + this[key]);
        tbdy.appendChild(tbdytr);
      }, tableValue);

      tbl.appendChild(tbdy);

      if ($("#breakupdetails").exists() ) {
        $("#breakupdetails").remove();
      }

      if ($("#featuredetail").exists() ) {
        $("#featuredetail").remove();
      }

      if ($("#viewanalysisbutton").exists() ) {
        $("#viewanalysisbutton").remove();
      }
      
      var elem1 = document.createElement('div');
      elem1.setAttribute('class', 'col-lg-16 my-auto');
      elem1.setAttribute('id', 'featuredetail');

      var elem2 = document.createElement('div');
      elem2.setAttribute('class', 'container-fluid');

      var elem3 = document.createElement('div');
      elem3.setAttribute('class', 'row');

      //add TCO
      elem3.appendChild(createFeatureItem('icon-loop', inWords(totalCostOfOwnership), 'Total Cost of Ownership for the apartment is ' + totalCostOfOwnership + '. This is excluding bank loan interst.'));
      console.log('Total cost of ownership: ' + totalCostOfOwnership);

      var downPaymentPercent = 20; 
      if ( parseInt(saleValue,10) > parseInt(+75*oneLakh,10)) {
        downPaymentPercent = 25;
      }
      var totalDownPayment = +downPaymentPercent * saleValue / 100
      totalDownPayment = Math.round(totalDownPayment/1000)*1000;

      //add downpayment if going for loan
      elem3.appendChild(createFeatureItem('icon-briefcase', inWords(totalDownPayment), 'Down payment of ' + downPaymentPercent + '% of the sale value, if you are going for a loan. The sale value is ' + inWords(saleValue)));
      console.log('Down payment: ' + totalDownPayment);

      var monthlyInterestRate = +interestRate / 1200;
      var tenureInMonths = +interestDuration * 12;
      var emiAmt = +loanAmt * oneLakh * (monthlyInterestRate) * Math.pow((1 + monthlyInterestRate), tenureInMonths) / (Math.pow((1 + monthlyInterestRate), tenureInMonths) - 1);
      emiAmt = Math.round(emiAmt/1000)*1000;

      //add EMI
      elem3.appendChild(createFeatureItem('icon-calculator', inWords(emiAmt), 'Monthly EMI to be paid for '+ tenureInMonths + ' months at the rate of ' + interestRate + '% per annum for an amount ' + loanAmt + ' lakh(s)'));
      console.log('EMI payment: ' + emiAmt);

      var totalInterestPayable = (+emiAmt * tenureInMonths) - (+loanAmt * oneLakh);
      totalInterestPayable = Math.round(totalInterestPayable/1000)*1000;

      //Total interest payable
      elem3.appendChild(createFeatureItem('icon-dislike', inWords(totalInterestPayable), 'Total interest payable by you over '+ interestDuration + ' years.'));
      console.log('Total interest payable: ' + totalInterestPayable);

      //Total payable with interest
      var totalPayableWithLoan = +totalCostOfOwnership + totalInterestPayable;
      elem3.appendChild(createFeatureItem('icon-chart', inWords(totalPayableWithLoan), 'Total you will pay with interest is '+ totalPayableWithLoan + '.'));
      console.log('Total interest payable: ' + totalInterestPayable);

      //Total payable with interest for a sft
      var totalPayablePerSftWithLoan = +totalPayableWithLoan / aptSftArea;
      totalPayablePerSftWithLoan = Math.round(totalPayablePerSftWithLoan/100)*100;
      elem3.appendChild(createFeatureItem('icon-arrow-up', inWords(totalPayablePerSftWithLoan), 'Per sft rate that you will pay with bank loan. The builder sale rate was ' + (+aptSftRateBase + (+floorRaiseAmt * aptFloor))));
      console.log('Per sft rate with loan: ' + totalPayablePerSftWithLoan);

      //If rented, total rent paid for loan tenure
      var totalRental = +tenureInMonths * avgRental;
      totalRental = Math.round(totalRental/1000)*1000;
      elem3.appendChild(createFeatureItem('icon-briefcase', inWords(totalRental), 'If you had opted to rent, the total rent paid for ' + interestDuration + ' years.'));
      console.log('Total rental: ' + totalRental);

      //If planning to sell after taking bank loan, how much will you gain after sale
      var totalAppreciatedRate = +totalCostOfOwnership * Math.pow((1 + avgSaleAppreciation/100),interestDuration);
      totalAppreciatedRate = Math.round(totalAppreciatedRate/1000)*1000;
      var totalAppreciatedRateGain = +totalAppreciatedRate - totalCostOfOwnership - (maintain1YearIGST * interestDuration) - totalInterestPayable;
      elem3.appendChild(createFeatureItem('icon-clock', inWords(totalAppreciatedRateGain), 'If you had opted to sell after ' + interestDuration +' years, above is what you would have benefited at an annual appreciation of ' + avgSaleAppreciation + ' %. The final sale rate would be '+ inWords(totalAppreciatedRate)));
      console.log('Sale rate: ' + totalAppreciatedRate);

      elem2.appendChild(elem3);
      elem1.appendChild(elem2);

      $("#featuredetails").append(elem1);
      $("#featuredetails").append(tbl);

      var viewAnalysisButton = document.createElement('button');
      viewAnalysisButton.setAttribute('class','btn btn-primary');
      viewAnalysisButton.setAttribute('tabindex','12');
      viewAnalysisButton.setAttribute('id','viewanalysisbutton');
      viewAnalysisButton.setAttribute('href','#features');
      viewAnalysisButton.textContent = 'View Analysis';

      $('#submitbutton').after(viewAnalysisButton);

      location.hash = "features";
      
      return false; //to avoid refresh returing false
    } 

    function createFeatureItem(icon, title, desc)
    {          
      var elem4 = document.createElement('div');
      elem4.setAttribute('class', 'col-lg-6');
      
      var elem5 = document.createElement('div');
      elem5.setAttribute('class', 'feature-item');

      var elem6 = document.createElement('i');
      elem6.setAttribute('class', icon + ' text-primary');

      var elem7 = document.createElement('h3');
      elem7.textContent = title;

      var elem8 = document.createElement('p');
      elem8.setAttribute('class', 'text-muted');
      elem8.textContent = desc;

      elem5.appendChild(elem6);
      elem5.appendChild(elem7);
      elem5.appendChild(elem8);

      elem4.appendChild(elem5);

      return elem4;
    }

    var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
    var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

    function inWords (num) {
        if ((num = num.toString()).length > 9) return 'overflow';
        n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) return; var str = '';
        str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
        str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
        str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
        str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
        str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
        return str;
    }