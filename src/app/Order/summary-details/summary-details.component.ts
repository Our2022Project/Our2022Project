import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CommonAddressRequest } from 'src/app/models/common-address-request';
import { shipment } from 'src/app/models/Shipment';
import { sharedService } from 'src/app/Service/sharedService.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary-details',
  templateUrl: './summary-details.component.html',
  styleUrls: ['./summary-details.component.scss']
})
export class SummaryDetailsComponent implements OnInit {

  constructor( private router: Router,public sharedService: sharedService, public datepipe: DatePipe, public spinner: NgxSpinnerService) { }

  processShipmentRequest: CommonAddressRequest = new CommonAddressRequest();
  shipDate:string = '';
  showError: boolean = false;
  errorMsg = '';
  @Input() shipment: shipment = new shipment();

  ngOnInit(): void {
    let changeFormate = new Date(this.sharedService.rateRequest.shipDate);  
    this.shipDate = this.datepipe.transform(changeFormate, 'MM/dd/YYYY') || '' ;
  }

  processShipment(): void {
    this.spinner.show();
    this.showError = false;
    this.createProcessShipmentRequest();
    this.sharedService.processShipment(this.processShipmentRequest).subscribe({
      next: (data: any) => {
        console.warn(' processShipment success');
        this.spinner.hide();
        // TODO : Next step yet to be implemented
        console.warn('Data received', data);

        var file = new Blob([data], { type: 'application/pdf' })
        var fileURL = URL.createObjectURL(file);
        // if you want to open PDF in new tab
        window.open(fileURL); 
        var a         = document.createElement('a');
        a.href        = fileURL; 
        a.target      = '_blank';
        a.download    = 'ship-outbound-label.pdf';
        document.body.appendChild(a);
        a.click();
        this.gotoDashboard();
      },error: (error: Error) => {
        this.spinner.hide();
        if (error instanceof HttpErrorResponse) {
         if (error.status === 200) {
          console.error('success block .. buty it should not', error);
            var file = new Blob([error?.error.text], { type: 'application/pdf' })
            var fileURL = URL.createObjectURL(file);
            // if you want to open PDF in new tab
            window.open(fileURL); 
            var a         = document.createElement('a');
            a.href        = fileURL; 
            a.target      = '_blank';
            a.download    = 'ship-outbound-label.pdf';
            document.body.appendChild(a);
            a.click();
            this.gotoDashboard();
         } else {
          this.showError = true;
         // console.error('Error occured while processing shipment', error?.message);
          console.error('Error occured while processing shipment', error);
          this.errorMsg = error?.message || error?.name;
         }
        } else {
          this.showError = true;
         // console.error('Error occured while processing shipment', error?.message);
          console.error('Error occured while processing shipment', error);
          this.errorMsg = error?.message || error?.name;
        }
      }
    }
    );
  }

  createProcessShipmentRequest(): void {
    this.processShipmentRequest.fromAddress.addressLine1 = this.sharedService.OrderAdress.fromAddressLine1;
    this.processShipmentRequest.fromAddress.addressLine2 = this.sharedService.OrderAdress.fromAddressLine2;
    this.processShipmentRequest.fromAddress.city = this.sharedService.OrderAdress.fromCity;
    this.processShipmentRequest.fromAddress.countryCode = this.sharedService.OrderAdress.fromCountry;
    this.processShipmentRequest.fromAddress.stateCode = this.sharedService.OrderAdress.fromState;
    this.processShipmentRequest.fromAddress.zipcode = this.sharedService.OrderAdress.fromZipCode;
    this.processShipmentRequest.toAddress.addressLine1 = this.sharedService.OrderAdress.recipientAddressLine1;
    this.processShipmentRequest.toAddress.addressLine2 = this.sharedService.OrderAdress.recipientAddressLine2;
    this.processShipmentRequest.toAddress.city = this.sharedService.OrderAdress.recipientCity;
    this.processShipmentRequest.toAddress.countryCode = this.sharedService.OrderAdress.recipientCountry;
    this.processShipmentRequest.toAddress.stateCode = this.sharedService.OrderAdress.recipientState;
    this.processShipmentRequest.toAddress.zipcode = this.sharedService.OrderAdress.recipientZipCode;
    //this.processShipmentRequest.shipDate = this.shipDate;
    this.processShipmentRequest.declaredValue = this.shipment.declaredValue;
    this.processShipmentRequest.packageWeight = this.shipment.packageWeight;

    this.processShipmentRequest.shipDate = this.datepipe.transform(this.shipDate, 'yyyy-MM-dd') || null;
    this.processShipmentRequest.fromAddress.contactRequest.companyName = this.sharedService.OrderAdress.fromCompany;
    this.processShipmentRequest.fromAddress.contactRequest.personName = this.sharedService.OrderAdress.fromName;
    this.processShipmentRequest.fromAddress.contactRequest.phoneNumber = this.sharedService.OrderAdress.fromPhoneNumber;
    this.processShipmentRequest.toAddress.contactRequest.companyName = this.sharedService.OrderAdress.recipientCompany;
    this.processShipmentRequest.toAddress.contactRequest.personName = this.sharedService.OrderAdress.recipientName;
    this.processShipmentRequest.toAddress.contactRequest.phoneNumber = this.sharedService.OrderAdress.recipientPhoneNumber;
    this.processShipmentRequest.serviceType = this.sharedService.selectedServiceType;
    this.processShipmentRequest.packageType = this.sharedService.rateRequest.packageType;
  }

  gotoDashboard() : void {
    //will do later
    //this.router.navigateByUrl('/dashboard');
  }
}
