import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sharedService } from 'src/app/Service/sharedService.service';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss']
})
export class AddressDetailsComponent implements OnInit {

  constructor(private router: Router, private fb: FormBuilder, public sharedService: sharedService) { }

  addressForm: any;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.addressForm = this.fb.group({
       yourName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z +\\-\']+')]],
       fromCompany:[''],
       fromCountry:['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z +\\-\']+')]],
       fromAddress:[ this.sharedService.fromAddress,[Validators.required]],
       fromZip:[this.sharedService.fromZip,[Validators.required, Validators.pattern("[0-9]{5}(?<!00000)$")]],
       fromCity:[this.sharedService.fromCity,[Validators.required, Validators.minLength(3), Validators.maxLength(35), Validators.pattern('^[a-zA-Z +\\-\']+')]],
       fromState:[this.sharedService.fromState,[Validators.required]],
       fromPhone: ['', [Validators.required, Validators.pattern("[0-9]{10}(?<!00000)$")]],
       fromEmail:[''],
       toRecipient:['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z +\\-\']+')]],
       toCompany:[''],
       toCountry:['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z +\\-\']+')]],
       toAddress:[this.sharedService.toAddress,[Validators.required]],
       toState:[this.sharedService.toState,[Validators.required]],
       toZip:[ this.sharedService.toZip,[Validators.required, Validators.pattern("[0-9]{5}(?<!00000)$")]],
       toCity:[this.sharedService.toCity,[Validators.required, Validators.minLength(3), Validators.maxLength(35), Validators.pattern('^[a-zA-Z +\\-\']+')]],
       toPhone:['', [Validators.required, Validators.pattern("[0-9]{10}(?<!00000)$")]],
       toEmail:[''],

    });
  }

  selectstate: string = '';
  selectchangehandler(event: any) {
    // this.state.setValue(event.target.value, {
    //   onlySelf: true
    // })
  }

  editAddress(): void {
    this.sharedService.addressDetails = true;
    this.sharedService.shipmentDetails = false;
    this.sharedService.paymentDetails = false;
    this.sharedService.summaryDetails = false;
  }

  editShipment():void {
    this.sharedService.addressDetails = false;
    this.sharedService.shipmentDetails = true;
    this.sharedService.paymentDetails = false;
    this.sharedService.summaryDetails = false;
  }

  editPayment():void {
    this.sharedService.addressDetails = false;
    this.sharedService.shipmentDetails = false;
    this.sharedService.paymentDetails = true;
    this.sharedService.summaryDetails = false;
  }

  editSummary(): void {
    this.sharedService.addressDetails = false;
    this.sharedService.shipmentDetails = false;
    this.sharedService.paymentDetails = false;
    this.sharedService.summaryDetails = true;
  }


  showShipment(): void {
    this.sharedService.addressDetails = false;
    this.sharedService.shipmentDetails = true;
    this.sharedService.paymentDetails = false;
    this.sharedService.summaryDetails = false;
  }
  restrictNumeric(event: any): any {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }
}
