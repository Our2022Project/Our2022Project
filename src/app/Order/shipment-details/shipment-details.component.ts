import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { sharedService } from 'src/app/Service/sharedService.service';
import { Address } from 'src/app/Models/Address';
import { RateReply } from 'src/app/Models/RateReply';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-shipment-details',
  templateUrl: './shipment-details.component.html',
  styleUrls: ['./shipment-details.component.scss']
})
export class ShipmentDetailsComponent implements OnInit {

  constructor(private router: Router, private fb: FormBuilder, public sharedService: sharedService, public datepipe: DatePipe, public spinner: NgxSpinnerService) {
    const todayDate = new Date(new Date().setHours(0, 0, 0, 0));
    this.avaiableDate.push(new Date(todayDate.setDate(todayDate.getDate())));
    for (let i = 0; i < 7; i++) {
      this.avaiableDate.push(new Date(todayDate.setDate(todayDate.getDate() + 1)));
    }
  }
  
  avaiableDate: Date[] = [];
  shipmentForm: any;
  shipmentRowThree: boolean = false;
  shipmentRowTwo: boolean = false;
  shipmentRow: boolean = true;
  showCalFeatures: boolean = false;
  showCheck1: boolean = false;
  showCheck2: boolean = false;
  showRateUI: Boolean = false;
  showError: Boolean = false;
  fromAddress = new Address();
  toAddress = new Address();
  rateChartResponce?: RateReply;
  drop: boolean[] = [];
  errorMsg: string = '';
  resultFound: Boolean = true;
  sleactedDate: any;
  amount: Number = 0 ;
  currentDate=new Date();
  today:string = '';
  Fedex_Envelop: boolean = false;
  Fedex_Large: boolean = false;
  Fedex_Medium: boolean = false;
  Fedex_Pak: boolean = false;
  Fedex_Extralarge: boolean = false;
  Fedex_Small: boolean = false;
  Fedex_Tube: boolean = false;
  getData: boolean = false;

  ngOnInit(): void {
    this.initializeForm();
    this.today =  this.datepipe.transform(this.currentDate, 'yyyy-MM-dd') || '' ;
    this.shipDateDefault();
    this.getData = false;
  }

  initializeForm(): void {
    this.shipmentForm = this.fb.group({
      FromAddress1: ['', [Validators.required, Validators.minLength(10)]],
      FromAddress2: [''],
      Fromcity: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(35), Validators.pattern('^[a-zA-Z +\\-\']+')]],
      Fromstate: ['', [Validators.required]],
      FromZIP: ['', [Validators.required, Validators.pattern("[0-9]{5}(?<!00000)$")]],
      ToAdd1: ['', [Validators.required, Validators.minLength(10)]],
      ToAdd2: [''],
      Tocity: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(35), Validators.pattern('^[a-zA-Z +\\-\']+')]],
      Tostate: ['', [Validators.required]],
      Tozip: ['', [Validators.required, Validators.pattern("[0-9]{5}(?<!00000)$")]],
      shipDate: [this.sharedService.shipDate !== ' ' ?  this.sharedService.shipDate:this.today , [Validators.required]],

    });
  }

  showRow1(): void {
    this.shipmentRowTwo = true;
    this.shipmentRowThree = false;
    this.showCheck1 = true;
    this.showCheck2 = false;
  }

  showRow2(): void {
    this.shipmentRowTwo = true;
    this.shipmentRowThree = false;
    this.showCheck2 = true;
    this.showCheck1 = false;
  }

  FedexEnvelop(): void {
    this.shipmentRow = false;
    this.shipmentRowTwo = false;
    this.shipmentRowThree = true;
    this.Fedex_Envelop = true;
    this.Fedex_Extralarge = false;
    this.Fedex_Large = false;
    this.Fedex_Medium = false;
    this.Fedex_Pak = false;
    this.Fedex_Small = false;
    this.Fedex_Tube = false;
  }

  FedexExtralarge(): void {
    this.shipmentRow = false;
    this.shipmentRowTwo = false;
    this.shipmentRowThree = true;
    this.Fedex_Envelop = false;
    this.Fedex_Extralarge = true;
    this.Fedex_Large = false;
    this.Fedex_Medium = false;
    this.Fedex_Pak = false;
    this.Fedex_Small = false;
    this.Fedex_Tube = false;
  }

  FedexLarge(): void {
    this.shipmentRow = false;
    this.shipmentRowTwo = false;
    this.shipmentRowThree = true;
    this.Fedex_Envelop = false;
    this.Fedex_Extralarge = false;
    this.Fedex_Large = true;
    this.Fedex_Medium = false;
    this.Fedex_Pak = false;
    this.Fedex_Small = false;
    this.Fedex_Tube = false;
  }

  FedexMedium(): void {
    this.shipmentRow = false;
    this.shipmentRowTwo = false;
    this.shipmentRowThree = true;
    this.Fedex_Envelop = false;
    this.Fedex_Extralarge = false;
    this.Fedex_Large = false;
    this.Fedex_Medium = true;
    this.Fedex_Pak = false;
    this.Fedex_Small = false;
    this.Fedex_Tube = false;
  }

  FedexPak(): void {
    this.shipmentRow = false;
    this.shipmentRowTwo = false;
    this.shipmentRowThree = true;
    this.Fedex_Envelop = false;
    this.Fedex_Extralarge = false;
    this.Fedex_Large = false;
    this.Fedex_Medium = false;
    this.Fedex_Pak = true;
    this.Fedex_Small = false;
    this.Fedex_Tube = false;
  }

  FedexSmall(): void {
    this.shipmentRow = false;
    this.shipmentRowTwo = false;
    this.shipmentRowThree = true;
    this.Fedex_Envelop = false;
    this.Fedex_Extralarge = false;
    this.Fedex_Large = false;
    this.Fedex_Medium = false;
    this.Fedex_Pak = false;
    this.Fedex_Small = true;
    this.Fedex_Tube = false;
  }

  FedexTube(): void {
    this.shipmentRow = false;
    this.shipmentRowTwo = false;
    this.shipmentRowThree = true;
    this.Fedex_Envelop = false;
    this.Fedex_Extralarge = false;
    this.Fedex_Large = false;
    this.Fedex_Medium = false;
    this.Fedex_Pak = false;
    this.Fedex_Small = false;
    this.Fedex_Tube = true;
  }
  FedexEmpty(): void {
    this.shipmentRow = false;
    this.shipmentRowTwo = false;
    this.shipmentRowThree = true;
  }

  showRowTwo(): void {
    this.shipmentRow = true;
    this.shipmentRowTwo = true;
    this.shipmentRowThree = false;
  }

  goToPayment(): void {
    this.sharedService.addressDetails = false;
    this.sharedService.shipmentDetails = false;
    this.sharedService.paymentDetails = true;
    this.sharedService.summaryDetails = false;    
    this.sharedService.Validate =true;
  }

  calBtn(): void {
    this.getData = false;
    this.spinner.show();
    this.showCalFeatures = true;
    this.sharedService.rate(this.sharedService.fromAddress, this.sharedService.toAddress,  this.sharedService.shipDate, '1', '1').subscribe(data => {
      this.getData = true;
      this.spinner.hide();
      this.rateChartResponce = data;
      this.rateChartResponce?.rateReplyDetails[0].ratedShipmentDetails[0].shipmentRateDetail.totalNetCharge.amount;
      if (data.highestSeverity === 'SUCCESS' || data.highestSeverity === 'NOTE' || data.highestSeverity === 'WARNING') {
        if (data.rateReplyDetails.length) {
          this.showRateUI = true;
          this.showError = false;
          data.rateReplyDetails.sort(
            (n1:any,n2:any)=>{
               if (n1.ratedShipmentDetails[0].shipmentRateDetail.totalNetCharge.amount>n2.ratedShipmentDetails[0].shipmentRateDetail.totalNetCharge.amount) return -1;
               if (n1.ratedShipmentDetails[0].shipmentRateDetail.totalNetCharge.amount<n2.ratedShipmentDetails[0].shipmentRateDetail.totalNetCharge.amount) return 1;
               else return 0; 
           });
          for (let i = 0; i < data.rateReplyDetails.length; i++) {
            this.drop[i] = false;
          }
        } else {
          this.errorMsg = data.notifications[0].message;
          this.showRateUI = false;
          this.showError = true;
        }
      } else {
        this.errorMsg = data.notifications[0].message;
        this.showRateUI = false;
        this.showError = true;
      }
  
    });
  }

  shipDate = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    const time = (d || new Date()).getTime();
    return !(!this.avaiableDate.find((x: { getTime: () => any; }) => x.getTime() == time)) && day !== 0;
  }

  addressMapping(): void {
    this.fromAddress.addressLine1 = this.shipmentForm.controls['FromAddress1'].value;
    this.fromAddress.addressLine2 = this.shipmentForm.controls['FromAddress2'].value;
    this.fromAddress.city = this.shipmentForm.controls['Fromcity'].value;
    this.fromAddress.stateCode = this.shipmentForm.controls['Fromstate'].value;
    this.fromAddress.zipcode = this.shipmentForm.controls['FromZIP'].value;
    this.fromAddress.countryCode = "US";
    this.toAddress.addressLine1 = this.shipmentForm.controls['ToAdd1'].value;
    this.toAddress.addressLine2 = this.shipmentForm.controls['ToAdd2'].value;
    this.toAddress.city = this.shipmentForm.controls['Tocity'].value;
    this.toAddress.stateCode = this.shipmentForm.controls['Tostate'].value;
    this.toAddress.zipcode = this.shipmentForm.controls['Tozip'].value;
    this.toAddress.countryCode = "US";
    this.sharedService.shipDate=this.shipmentForm.controls['shipDate'].value;
    
   
  }
  getMonthDate(servcieDate: any): string {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var date = new Date(servcieDate * 1000);

    return months[date.getMonth()] + " " + date.getDate();
  }
  getHoursMinute(servcieDate: any): string {

    var date = new Date(servcieDate * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2);

    return formattedTime;
  }

  shipDateDefault():void{
    if(this.sharedService.shipDate === '') {
      this.sharedService.shipDate = this.today;
    }
  }
}
