import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sharedService } from 'src/app/Service/sharedService.service';
@Component({
  selector: 'app-shipment-details',
  templateUrl: './shipment-details.component.html',
  styleUrls: ['./shipment-details.component.scss']
})
export class ShipmentDetailsComponent implements OnInit {

  constructor(private router: Router, private fb: FormBuilder, public sharedService: sharedService) {
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
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.shipmentForm = this.fb.group({


    });
  }

  showRow(): void {
    this.shipmentRowTwo = true;
    this.shipmentRowThree = false;
  }

  showRowThree(): void {
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
  }

  calBtn(): void {
    this.showCalFeatures = true;
  }

  shipDate = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    const time = (d || new Date()).getTime();
    return !(!this.avaiableDate.find((x: { getTime: () => any; }) => x.getTime() == time)) && day !== 0;
  }

}
