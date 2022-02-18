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

  constructor(private router: Router, private fb: FormBuilder, public shredService:sharedService, public spinner:NgxSpinnerService) { }
  checkRateForm: any;
  showRateUI: Boolean = false;
  showError: Boolean = false;
  fromAddress = new Address();
  toAddress = new Address();
  rateChartResponce?: RateReply;
  drop: boolean[] = [];
  errorMsg: string = '';

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.checkRateForm = this.fb.group({
      FromAddress1: ['', [Validators.required, Validators.minLength(10)]],
      FromAddress2: [''],
      Fromcity: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(35), Validators.pattern('^[a-zA-Z +\\-\']+')]],
      Fromstate: ['', [Validators.required]],
      FromZIP: ['', [Validators.required, Validators.pattern("[0-9]{5}")]],
      ToAdd1: ['', [Validators.required, Validators.minLength(10)]],
      ToAdd2: [''],
      Tocity: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(35), Validators.pattern('^[a-zA-Z +\\-\']+')]],
      Tostate: ['', [Validators.required]],
      Tozip: ['', [Validators.required, Validators.pattern("[0-9]{5}")]],
    }
    );
  }

  checkRate() {
    this.spinner.show();
    this.drop=[];
    this.addressMapping();
    this.shredService.rate(this.fromAddress, this.toAddress).subscribe(data => {
      this.spinner.hide();
      this.rateChartResponce = data;
      if(data.highestSeverity === 'SUCCESS') {
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
    });
  }

  dropbtn(i: number) {
    this.drop[i] = !this.drop[i];
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


selectFromstate:string='';
selectFromState(event:any){
  this.Fromstate.setValue(event.target.value, {
    onlySelf: true
  })
}
get Fromstate() {
  return this.checkRateForm.get('Fromstate');
}

selectTostate: string='';
selectToState(event:any){
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

} 
