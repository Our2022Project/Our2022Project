import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailValidator, FormBuilder, Validators } from '@angular/forms';
import { sharedService } from 'src/app/Service/sharedService.service';
import { Address } from 'src/app/Models/Address';

@Component({
  selector: 'app-rate-tranist',
  templateUrl: './rate-tranist.component.html',
  styleUrls: ['./rate-tranist.component.scss']
})
export class RateTranistComponent implements OnInit {

  constructor(private router: Router, private fb: FormBuilder, private shredService:sharedService) { }
  checkRateForm: any;
  drop: boolean = false;
  check: boolean = false;
  showRateUI: Boolean = false;
  fromAddress = new Address();
  toAddress = new Address();

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.checkRateForm = this.fb.group({
      FromAddress1: ['', [Validators.required, Validators.minLength(10)]],
      FromAddress2: [null],
      Fromcity: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(35), Validators.pattern('^[a-zA-Z +\\-\']+')]],
      Fromstate:[null],
      FromZIP: ['', [Validators.required, Validators.pattern("[0-9]{5}")]],
      ToAdd1: ['', [Validators.required, Validators.minLength(10)]],
      ToAdd2: [null],
      Tocity: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(35), Validators.pattern('^[a-zA-Z +\\-\']+')]],
      Tostate:[null,],
      Tozip: ['', [Validators.required, Validators.pattern("[0-9]{5}")]],
    }
    );
  }

  checkRate() {
    this.showRateUI = !this.showRateUI;
    this.addressMapping();
    this.shredService.rate(this.fromAddress, this.toAddress).subscribe(data => {

    });
  }

  dropbtn() {
    this.drop = !this.drop;
    if (this.check == true) {
      this.check = false;
    } else {
      this.check = true;
    }
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



  Fromstate:string='';

selectFromstate(event:any){

  this.Fromstate = event.target.value;
}

Tostate:string='';

selectTostate(event:any){

  this.Tostate = event.target.value;
}
} 
