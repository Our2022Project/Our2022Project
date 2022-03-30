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
  validate: boolean = false;
  ngOnInit(): void {
    this.initializeForm();
    this.sharedService.addressDetails = true;
    this.sharedService.shipmentDetails = false;
    this.sharedService.paymentDetails = false;
    this.sharedService.summaryDetails = false;
  }

  initializeForm(): void {
    this.addressForm = this.fb.group({
       yourName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z +\\-\']+')]],
       fromCompany:[''],
       fromCountry:[''],
       fromAddress:[ this.sharedService.fromAddress.addressLine1,[Validators.required]],
       FromAddress2: [this.sharedService.fromAddress.addressLine2],
       fromZip:[this.sharedService.fromAddress.zipcode,[Validators.required, Validators.pattern("[0-9]{5}(?<!00000)$")]],
       fromCity:[this.sharedService.fromAddress.city,[Validators.required, Validators.minLength(3), Validators.maxLength(35), Validators.pattern('^[a-zA-Z +\\-\']+')]],
       fromState:[this.sharedService.fromAddress.stateCode,[Validators.required]],
       fromPhone: ['', [Validators.required, Validators.pattern("[0-9]{10}(?<!00000)$")]],
       fromEmail:['',[Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
       toRecipient:['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z +\\-\']+')]],
       toCompany:[''],
       toCountry:[''],
       toAddress:[this.sharedService.toAddress.addressLine1,[Validators.required]],
       toAddress2: [this.sharedService.toAddress.addressLine2],
       toState:[this.sharedService.toAddress.stateCode,[Validators.required]],
       toZip:[ this.sharedService.toAddress.zipcode,[Validators.required, Validators.pattern("[0-9]{5}(?<!00000)$")]],
       toCity:[this.sharedService.toAddress.city,[Validators.required, Validators.minLength(3), Validators.maxLength(35), Validators.pattern('^[a-zA-Z +\\-\']+')]],
       toPhone:['', [Validators.required, Validators.pattern("[0-9]{10}(?<!00000)$")]],
       toEmail:['',[Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],

    });
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
    this.sharedService.addyourName = this.addressForm.controls['yourName'].value;
    this.sharedService.addfromAddress = this.addressForm.controls['fromAddress'].value;
    this.sharedService.addfromCity = this.addressForm.controls['fromCity'].value;
    this.sharedService.addfromState = this.addressForm.controls['fromState'].value;
    this.sharedService.addfromPhone= this.addressForm.controls['fromPhone'].value;
    this.sharedService.addfromEmail = this.addressForm.controls['fromEmail'].value;
    this.sharedService.addtoRecipient = this.addressForm.controls['toRecipient'].value;
    this.sharedService.addtoAddress = this.addressForm.controls['toAddress'].value;
    this.sharedService.addtoCity = this.addressForm.controls['toCity'].value;
    this.sharedService.addtoState = this.addressForm.controls['toState'].value;
    this.sharedService.addtoPhone = this.addressForm.controls['toPhone'].value;
    this.sharedService.addtoEmail = this.addressForm.controls['toEmail'].value;
    this.sharedService.addressDetails = false;
    this.sharedService.shipmentDetails = true;
    this.sharedService.paymentDetails = false;
    this.sharedService.summaryDetails = false;
  }
  restrictNumeric(event: any): any {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }
}
