import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { sharedService } from 'src/app/Service/sharedService.service';
import { RateReply } from 'src/app/Models/RateReply';
import { NgxSpinnerService } from "ngx-spinner";
import { DatePipe } from '@angular/common'
import { RateRequest } from 'src/app/Models/RateRequest';

@Component({
  selector: 'app-rate-tranist',
  templateUrl: './rate-tranist.component.html',
  styleUrls: ['./rate-tranist.component.scss']
})
export class RateTranistComponent implements OnInit {

  constructor(private router: Router, private fb: FormBuilder, public sharedService: sharedService, public spinner: NgxSpinnerService, public datepipe: DatePipe) {
    const todayDate = new Date(new Date().setHours(0, 0, 0, 0));
    this.avaiableDate.push(new Date(todayDate.setDate(todayDate.getDate())));
    for (let i = 0; i < 7; i++) {
      this.avaiableDate.push(new Date(todayDate.setDate(todayDate.getDate() + 1)));
    }
  }

  checkRateForm: any;
  showRateUI: Boolean = false;
  showError: Boolean = false;
  rateChartResponce?: RateReply;
  drop: boolean[] = [];
  errorMsg: string = '';
  resultFound: Boolean = true;
  avaiableDate: Date[] = [];
  sleactedDate: any;
  packageCheck: string = '';
  rateRequest = new RateRequest;
  selectedDate: any;
  estimatedDeliveryDate: string = '';

  ngOnInit(): void {
    this.setDefaultDate();
    this.initializeForm();
  }
  initializeForm(): void {
    this.checkRateForm = this.fb.group({
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
      shipDate: [this.selectedDate],
      service: ['FedexStandard'],
      packaging: ['FedexEnvelope'],
      weightForNonOwnPackage: ['1', [Validators.required, Validators.pattern("([1-9]|1[0])")]],
      weightForOwnPackage: ['1', [Validators.required, Validators.pattern("([1-9]|1[0])")]],
      noOfNonOwnPackages: ['1', [Validators.required, Validators.pattern("(1)")]],
      noOwnPackages: ['1', [Validators.required, Validators.pattern("([1-9]|1[0-9]|20|2[0-5]|25)")]],
      length: ['', [Validators.pattern("^(?:[1-9]|0[1-9]|10|[1-9][0-9]|1[01][0-9])$")]],
      width: ['', [Validators.pattern("([1-9]|1[0-9]|20|2[0-9]|30|3[0-9]|40|4[0-9]|50|5[0-9]|60|6[0-9]|70|7[0-9]|80)")]],
      height: ['', [Validators.pattern("([1-9]|1[0-9]|20|2[0-9]|30|3[0-9]|40|4[0-9]|50|5[0-9]|60|6[0-9]|70)")]],
    }
    );
  }

  checkRate(): void {
    this.spinner.show();
    this.drop = [];
    this.addressMapping();
    this.sharedService.rate(this.rateRequest).subscribe({
      next: (data: any) => {
        this.spinner.hide();
        this.resultFound = false;
        this.rateChartResponce = data;
        if (data.highestSeverity === 'SUCCESS' || data.highestSeverity === 'NOTE' || data.highestSeverity === 'WARNING') {
          if (data.rateReplyDetails.length) {
            this.showRateUI = true;
            this.showError = false;
            data.rateReplyDetails.sort(
              (n1: any, n2: any) => {
                if (n1.ratedShipmentDetails[0].shipmentRateDetail.totalNetCharge.amount > n2.ratedShipmentDetails[0].shipmentRateDetail.totalNetCharge.amount) return -1;
                if (n1.ratedShipmentDetails[0].shipmentRateDetail.totalNetCharge.amount < n2.ratedShipmentDetails[0].shipmentRateDetail.totalNetCharge.amount) return 1;
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
      },
      error: (err: Error) => {
        this.spinner.hide();
      }
    });
  }

  dropbtn(i: number): void {
    this.drop[i] = !this.drop[i];
  }

  searchNewLocation(): void {
    this.resultFound = true;
    this.showRateUI = false;
    this.showError = false;
  }

  addressMapping(): void {
    this.rateRequest.fromAddress.addressLine1 = this.checkRateForm.controls['FromAddress1'].value;
    this.rateRequest.fromAddress.addressLine2 = this.checkRateForm.controls['FromAddress2'].value;
    this.rateRequest.fromAddress.city = this.checkRateForm.controls['Fromcity'].value;
    this.rateRequest.fromAddress.stateCode = this.checkRateForm.controls['Fromstate'].value;
    this.rateRequest.fromAddress.zipcode = this.checkRateForm.controls['FromZIP'].value;
    this.rateRequest.fromAddress.countryCode = "US";
    this.rateRequest.toAddress.addressLine1 = this.checkRateForm.controls['ToAdd1'].value;
    this.rateRequest.toAddress.addressLine2 = this.checkRateForm.controls['ToAdd2'].value;
    this.rateRequest.toAddress.city = this.checkRateForm.controls['Tocity'].value;
    this.rateRequest.toAddress.stateCode = this.checkRateForm.controls['Tostate'].value;
    this.rateRequest.toAddress.zipcode = this.checkRateForm.controls['Tozip'].value;
    this.rateRequest.toAddress.countryCode = "US";
    this.rateRequest.shipDate = this.datepipe.transform(this.checkRateForm.controls['shipDate'].value, 'yyyy-MM-dd') || null;
    this.rateRequest.service = this.checkRateForm.controls['service'].value;
    this.rateRequest.packaging = this.checkRateForm.controls['packaging'].value;
    if (this.rateRequest.packaging === 'OwnPackaging') {
      this.rateRequest.packageWeight = this.checkRateForm.controls['weightForOwnPackage'].value;
      this.rateRequest.noOfPackages = this.checkRateForm.controls['noOwnPackages'].value;
      if (this.checkRateForm.controls['length'].value !== '' && this.checkRateForm.controls['width'].value !== '' && this.checkRateForm.controls['height'].value !== '') {
        this.rateRequest.dimension = this.checkRateForm.controls['length'].value + " " + this.checkRateForm.controls['width'].value + " " + this.checkRateForm.controls['height'].value;
      }
    } else {
      this.rateRequest.packageWeight = this.checkRateForm.controls['weightForNonOwnPackage'].value;
      this.rateRequest.noOfPackages = this.checkRateForm.controls['noOfNonOwnPackages'].value;
    }
    this.sharedService.rateRequest = this.rateRequest;
  }

  clearField(): void {
    this.initializeForm();
    this.showRateUI = false;
    this.showError = false;
  }

  restrictNumeric(event: any): any {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  getDateTime(servcieDate: string): string {
    var arrivesOn = new Date(servcieDate).toLocaleDateString("en-US")
    return arrivesOn;
  }

  getMonthDate(servcieDate: any, index: number, service: any, ratedShipmentDetail?: any): string {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var date = new Date(servcieDate);
    this.estimatedDeliveryDate = this.datepipe.transform(date, 'MM/dd/2022') || '';
    this.sharedService.finalShipRate = ratedShipmentDetail?.ratedPackages[0]?.packageRateDetail?.netFedExCharge?.amount;
    return months[date.getMonth()] + " " + date.getDate();
  }

  getHoursMinute(servcieDate: any): string {

    var date = new Date(servcieDate);
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

  showOrderComponent(): void {
    this.sharedService.estimatedDeliveryDate = this.estimatedDeliveryDate;
    this.router.navigateByUrl('/address-details');
  }

  shipDate = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    const time = (d || new Date()).getTime();
    return !(!this.avaiableDate.find((x: { getTime: () => any; }) => x.getTime() == time)) && day !== 0;
  }

  selectPackage(selectedPackage: any): void {
    this.packageCheck = selectedPackage.target.value;
  }

  setDefaultDate(): void {
    this.selectedDate = new Date(new Date().setHours(0, 0, 0, 0));
    if (this.selectedDate.getDay() === 0) {
      this.selectedDate = new Date(this.selectedDate.setDate(this.selectedDate.getDate() + 1));
    }
  }

} 
