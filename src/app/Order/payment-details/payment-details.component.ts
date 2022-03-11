import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sharedService } from 'src/app/Service/sharedService.service';
@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {

  constructor(private router: Router, private fb: FormBuilder, public sharedService: sharedService) { }
  
  paymentForm: any;
  
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.paymentForm = this.fb.group({


    });
  }

  showSummary(): void{
    this.sharedService.addressDetails = false;
    this.sharedService.shipmentDetails = false;
    this.sharedService.paymentDetails = false;
    this.sharedService.summaryDetails = true;
  }

}
