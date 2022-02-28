import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { sharedService } from 'src/app/Service/sharedService.service';
import { Address } from 'src/app/Models/Address';
import { RateReply } from 'src/app/Models/RateReply';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-rate-tranist',
  templateUrl: './rate-tranist.component.html',
  styleUrls: ['./rate-tranist.component.scss']
})
export class RateTranistComponent implements OnInit {

  constructor(private router: Router, private fb: FormBuilder, public sharedService: sharedService, public spinner: NgxSpinnerService) { }
  checkRateForm: any;
  showRateUI: Boolean = false;
  showError: Boolean = false;
  fromAddress = new Address();
  toAddress = new Address();
  rateChartResponce?: RateReply;
  drop: boolean[] = [];
  errorMsg: string = '';
  resultFound: Boolean = true;

  ngOnInit(): void {
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
    }
    );
  }

  checkRate(): void {
    this.spinner.show();
    this.drop = [];
    this.addressMapping();
    this.sharedService.rate(this.fromAddress, this.toAddress).subscribe(data => {
      this.spinner.hide();
      this.resultFound = false;
      this.rateChartResponce = data;
      if (data.highestSeverity === 'SUCCESS' || data.highestSeverity === 'NOTE' || data.highestSeverity === 'WARNING') {
        if (data.rateReplyDetails.length) {
          this.showRateUI = true;
          this.showError = false;
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

  dropbtn(i: number): void {
    this.drop[i] = !this.drop[i];
  }

  searchNewLocation(): void {
    //this.initializeForm();
    this.resultFound = true;
    this.showRateUI = false;
    this.showError = false;
  }

  addressMapping(): void {
    this.fromAddress.addressLine1 = this.checkRateForm.controls['FromAddress1'].value;
    this.fromAddress.addressLine2 = this.checkRateForm.controls['FromAddress2'].value;
    this.fromAddress.city = this.checkRateForm.controls['Fromcity'].value;
    this.fromAddress.stateCode = this.checkRateForm.controls['Fromstate'].value;
    this.fromAddress.zipcode = this.checkRateForm.controls['FromZIP'].value;
    this.fromAddress.countryCode = "US";
    this.toAddress.addressLine1 = this.checkRateForm.controls['ToAdd1'].value;
    this.toAddress.addressLine2 = this.checkRateForm.controls['ToAdd2'].value;
    this.toAddress.city = this.checkRateForm.controls['Tocity'].value;
    this.toAddress.stateCode = this.checkRateForm.controls['Tostate'].value;
    this.toAddress.zipcode = this.checkRateForm.controls['Tozip'].value;
    this.toAddress.countryCode = "US";
  }


  selectFromstate: string = '';
  selectFromState(event: any) {
    this.Fromstate.setValue(event.target.value, {
      onlySelf: true
    })
  }
  get Fromstate() {
    return this.checkRateForm.get('Fromstate');
  }

  selectTostate: string = '';
  selectToState(event: any) {
    this.Tostate.setValue(event.target.value, {
      onlySelf: true
    })
  }
  get Tostate() {
    return this.checkRateForm.get('Tostate');
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

} 
