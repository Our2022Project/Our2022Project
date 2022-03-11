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

}
