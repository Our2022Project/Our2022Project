import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sharedService } from 'src/app/Service/sharedService.service';
import { Payment } from 'src/app/models/Payment';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {

  constructor(private router: Router, private fb: FormBuilder, public sharedService: sharedService, public spinner: NgxSpinnerService) { }

  paymentForm: any;
  Payment: Payment = new Payment();

  ngOnInit(): void {
    this.initializeForm();
    this.paymentForm.controls['sameAddress'].valueChanges.subscribe(
      (selectedValue: any) => {
        this.spinner.hide();
        if (selectedValue) {
          this.paymentForm.controls['address1'].setValue(this.sharedService.rateRequest.fromAddress.addressLine1);
          this.paymentForm.controls['address2'].setValue(this.sharedService.rateRequest.fromAddress.addressLine2);
          this.paymentForm.controls['city'].setValue(this.sharedService.rateRequest.fromAddress.city);
          this.paymentForm.controls['state'].setValue(this.sharedService.rateRequest.fromAddress.stateCode);
          this.paymentForm.controls['zip'].setValue(this.sharedService.rateRequest.fromAddress.zipcode);
        }
        else {
          this.paymentForm.controls['address1'].setValue('');
          this.paymentForm.controls['address2'].setValue('');
          this.paymentForm.controls['city'].setValue('');
          this.paymentForm.controls['state'].setValue('');
          this.paymentForm.controls['zip'].setValue('');
        }
      }
    );
  }

  initializeForm(): void {
    this.paymentForm = this.fb.group({
      bill: ['', Validators.required],
      selectCard: ['', Validators.required],
      selectMonth: ['', Validators.required],
      selectYear: ['', Validators.required],
      creditCardNo: ['', [Validators.required, Validators.pattern("[0-9]{16}(?<!000000)$")]],
      cvvNo: ['', [Validators.required, Validators.pattern("[0-9]{3}(?<!000)$")]],
      middleName: [this.Payment.middleName],
      firstName: [this.sharedService.Payment.firstName, [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z +\\-\']+')]],
      lastName: [this.sharedService.Payment.lastName, [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z +\\-\']+')]],
      companyName: [this.sharedService.Payment.company, [Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z +\\-\']+')]],
      EmailId: [this.sharedService.Payment.email, [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
      verifyEmail: [this.sharedService.Payment.Verifyemail, [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
      address1: ['', [Validators.required, Validators.minLength(10)]],
      address2: [''],
      city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(35), Validators.pattern('^[a-zA-Z +\\-\']+')]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required, Validators.pattern("[0-9]{5}(?<!00000)$")]],
      sameAddress: [false],
    }, {
      validators: this.MustMatch('EmailId', 'verifyEmail')
    });
  }

  showSummary(): void {
    this.spinner.show();
    this.paymentDetails();
    this.sharedService.payment(this.Payment).subscribe({
      next: (data: any) => {
        this.spinner.hide();
      },
      error: (error: HttpErrorResponse) => {
        this.spinner.hide();
      }
    })
  }

  restrictNumeric(event: any): any {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['MustMatch']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MustMatch: true });
      }
      else {
        matchingControl.setErrors(null);
      }
    }
  }

  paymentDetails(): void {
    this.sharedService.addressDetails = false;
    this.sharedService.paymentDetails = false;
    this.sharedService.summaryDetails = true;
    this.Payment.expirationMonth = 'XX';
    this.Payment.expirationYear = 'XXXX';
    this.Payment.creditCardNumber = this.paymentForm.controls['creditCardNo'].value;
    this.Payment.billTo = this.paymentForm.controls['bill'].value;
    this.Payment.creditCardType = this.paymentForm.controls['selectCard'].value;
    this.Payment.creditCardNumber = 'XXXX-XXXX-XXXX-' + this.paymentForm.controls['creditCardNo'].value.substr(this.paymentForm.controls['creditCardNo'].value.length - 4);
    this.Payment.cvvNumber = 'XXX';
    this.Payment.middleName = this.paymentForm.controls['middleName'].value;
    this.Payment.firstName = this.paymentForm.controls['firstName'].value;
    this.Payment.lastName = this.paymentForm.controls['lastName'].value;
    this.Payment.company = this.paymentForm.controls['companyName'].value;
    this.Payment.email = this.paymentForm.controls['EmailId'].value;
    this.Payment.Verifyemail = this.paymentForm.controls['verifyEmail'].value;
    this.Payment.isCreditAddSameAsShipAdd = this.paymentForm.controls['sameAddress'].value;
    this.Payment.paymentAddressRequest.addressLine1 = this.paymentForm.controls['address1'].value;
    this.Payment.paymentAddressRequest.addressLine2 = this.paymentForm.controls['address2'].value;
    this.Payment.paymentAddressRequest.city = this.paymentForm.controls['city'].value;
    this.Payment.paymentAddressRequest.state = this.paymentForm.controls['state'].value;
    this.Payment.paymentAddressRequest.zipCode = this.paymentForm.controls['zip'].value;
    this.Payment.paymentAddressRequest.phone = this.sharedService.OrderAdress.fromPhoneNumber;
    this.Payment.transactionId =  this.sharedService.transaction;
    this.sharedService.Payment = this.Payment;
  }

}
