import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sharedService } from 'src/app/Service/sharedService.service';
import { OrderAdress } from 'src/app/models/order-adress';
import { NgxSpinnerService } from "ngx-spinner";
import { DatePipe } from '@angular/common';
import { shipment } from 'src/app/models/Shipment';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss']
})
export class AddressDetailsComponent implements OnInit {

  constructor(private router: Router, private fb: FormBuilder, public sharedService: sharedService, public spinner: NgxSpinnerService, public datepipe: DatePipe) { }
  OrderAdress: OrderAdress = new OrderAdress();
  addressForm: any;
  validate: boolean = false;
  shipment: shipment = new shipment();

  ngOnInit(): void {
    this.initializeForm();
    this.sharedService.addressDetails = true;
    this.sharedService.paymentDetails = false;
    this.sharedService.summaryDetails = false;
  }

  initializeForm(): void {
    this.addressForm = this.fb.group({
      yourName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z +\\-\']+')]],
      fromCompany: [''],
      fromCountry: [''],
      fromAddress: [this.sharedService.rateRequest.fromAddress.addressLine1, [Validators.required]],
      fromAddress2: [this.sharedService.rateRequest.fromAddress.addressLine2],
      fromZip: [this.sharedService.rateRequest.fromAddress.zipcode, [Validators.required, Validators.pattern("[0-9]{5}(?<!00000)$")]],
      fromCity: [this.sharedService.rateRequest.fromAddress.city, [Validators.required, Validators.minLength(3), Validators.maxLength(35), Validators.pattern('^[a-zA-Z +\\-\']+')]],
      fromState: [this.sharedService.rateRequest.fromAddress.stateCode, [Validators.required]],
      fromPhone: ['', [Validators.required, Validators.pattern("[0-9]{10}(?<!00000)$")]],
      fromEmail: ['', [Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
      toRecipient: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z +\\-\']+')]],
      toCompany: [''],
      toCountry: [''],
      toAddress: [this.sharedService.rateRequest.toAddress.addressLine1, [Validators.required]],
      toAddress2: [this.sharedService.rateRequest.toAddress.addressLine2],
      toState: [this.sharedService.rateRequest.toAddress.stateCode, [Validators.required]],
      toZip: [this.sharedService.rateRequest.toAddress.zipcode, [Validators.required, Validators.pattern("[0-9]{5}(?<!00000)$")]],
      toCity: [this.sharedService.rateRequest.toAddress.city, [Validators.required, Validators.minLength(3), Validators.maxLength(35), Validators.pattern('^[a-zA-Z +\\-\']+')]],
      toPhone: ['', [Validators.required, Validators.pattern("[0-9]{10}(?<!00000)$")]],
      toEmail: ['', [Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],

    });
  }

  editAddress(): void {
    this.sharedService.addressDetails = true;
    this.sharedService.paymentDetails = false;
    this.sharedService.summaryDetails = false;
  }

  editPayment(): void {
    this.sharedService.addressDetails = false;
    this.sharedService.paymentDetails = true;
    this.sharedService.summaryDetails = false;
  }

  showShipment(): void {
    this.spinner.show();
    this.mapRateAddress();
    this.sharedService.addressDetails = false;
    this.sharedService.paymentDetails = true;
    this.sharedService.summaryDetails = false;
    this.mapAdressDetails();
    this.sharedService.OrderAdress = this.OrderAdress;
    this.sharedService.addressDetalis(this.OrderAdress).subscribe({
      next: (data: any) => {
        this.spinner.hide();
        this.mapShipDetails()
        this.shipment.transactionId = data.transactionId;
        this.sharedService.transaction = data.transactionId;
        this.sharedService.shipment(this.shipment).subscribe({
          next: (data: any) => {
            this.shipment.shipmentDetailId = data.shipmentDetailId;
            this.spinner.hide();
          },
          error: (error: HttpErrorResponse) => {
            this.spinner.hide();
            console.error('error at shipment details ', error);
            console.error('error at shipment details ', error?.error.message);
          }

        });
      },
      error: (error: HttpErrorResponse) => {
        this.spinner.hide();
        console.error('error at address details ', error);
        console.error('error at address details ', error?.error.message);
      },
    });
  }

  restrictNumeric(event: any): any {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  mapAdressDetails(): void {
    this.OrderAdress.transactionId = this.shipment.transactionId ? this.shipment.transactionId : '';
    this.OrderAdress.fromName = this.addressForm.controls['yourName'].value;
    this.OrderAdress.fromCompany = this.addressForm.controls['fromCompany'].value;
    this.OrderAdress.fromAddressLine1 = this.addressForm.controls['fromAddress'].value;
    this.OrderAdress.fromAddressLine2 = this.addressForm.controls['fromAddress2'].value;
    this.OrderAdress.fromZipCode = this.addressForm.controls['fromZip'].value;
    this.OrderAdress.fromCity = this.addressForm.controls['fromCity'].value;
    this.OrderAdress.fromState = this.addressForm.controls['fromState'].value
    this.OrderAdress.fromPhoneNumber = this.addressForm.controls['fromPhone'].value;
    this.OrderAdress.fromEmail = this.addressForm.controls['fromEmail'].value;
    this.OrderAdress.recipientName = this.addressForm.controls['toRecipient'].value;
    this.OrderAdress.recipientCompany = this.addressForm.controls['toCompany'].value;
    this.OrderAdress.recipientAddressLine1 = this.addressForm.controls['toAddress'].value;
    this.OrderAdress.recipientAddressLine2 = this.addressForm.controls['toAddress2'].value;
    this.OrderAdress.recipientZipCode = this.addressForm.controls['toZip'].value;
    this.OrderAdress.recipientCity = this.addressForm.controls['toCity'].value;
    this.OrderAdress.recipientState = this.addressForm.controls['toState'].value;
    this.OrderAdress.recipientPhoneNumber = this.addressForm.controls['toPhone'].value;
    this.OrderAdress.recipientEmail = this.addressForm.controls['toEmail'].value;
  }

  mapShipDetails(): void {
    this.shipment.shipDate = this.datepipe.transform(this.sharedService.rateRequest.shipDate, 'MM/dd/YYYY') || '';
    this.shipment.packageWeight = this.sharedService.rateRequest.packageWeight;
    this.shipment.estimatedDeliveryDate = this.datepipe.transform(this.sharedService.estimatedDeliveryDate, 'MM/dd/YYYY') || '';
    this.shipment.shipmentDetailId = this.shipment.shipmentDetailId ? this.shipment.shipmentDetailId : '';
    this.shipment.pricingOption =  this.sharedService.rateRequest.serviceType;
    this.shipment.service = this.sharedService.selectedServiceType;
    this.shipment.packageType = this.sharedService.rateRequest.packageType;
  }

  mapRateAddress(): void {
    this.sharedService.rateRequest.fromAddress.addressLine1 = this.addressForm.controls['fromAddress'].value;
    this.sharedService.rateRequest.fromAddress.addressLine2 = this.addressForm.controls['fromAddress2'].value;
    this.sharedService.rateRequest.fromAddress.city = this.addressForm.controls['fromCity'].value;
    this.sharedService.rateRequest.fromAddress.stateCode = this.addressForm.controls['fromState'].value;
    this.sharedService.rateRequest.fromAddress.zipcode = this.addressForm.controls['fromZip'].value;
    this.sharedService.rateRequest.toAddress.addressLine1 = this.addressForm.controls['toAddress'].value;
    this.sharedService.rateRequest.toAddress.addressLine2 = this.addressForm.controls['toAddress2'].value;
    this.sharedService.rateRequest.toAddress.city = this.addressForm.controls['toCity'].value;
    this.sharedService.rateRequest.toAddress.stateCode = this.addressForm.controls['toState'].value;
    this.sharedService.rateRequest.toAddress.zipcode = this.addressForm.controls['toZip'].value;
  }
}
