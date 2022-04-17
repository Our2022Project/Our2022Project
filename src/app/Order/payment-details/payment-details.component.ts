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
      bill: [ this.sharedService.payment1.billTo,Validators.required],
      selectCard: [this.sharedService.payment1.creditCardType,Validators.required],
      selectMonth: [this.sharedService.payselectMonth,Validators.required],
      selectYear: [this.sharedService.payselectYear,Validators.required],
      creditCardNo: [this.sharedService.payment1.creditCardNumber,[Validators.required, Validators.pattern("[0-9]{16}(?<!000000)$")]],
      cvvNo: [this.sharedService.payment1.cvvNumber,[Validators.required, Validators.pattern("[0-9]{3}(?<!000)$")]],
      middleName: [this.sharedService.payment1.middleName],
      firstName: [ this.sharedService.payment1.firstName,[Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z +\\-\']+')]],
      lastName: [ this.sharedService.payment1.lastName,[Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z +\\-\']+')]],
      companyName:[ this.sharedService.payment1.company,[Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z +\\-\']+')]],
      EmailId: [this.sharedService.payment1.email,[Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
      verifyEmail: [this.sharedService.payment1.Verifyemail,[Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
    },{
      validators: this.MustMatch('EmailId', 'verifyEmail')
    });
  }

  showSummary(): void{
    this.sharedService.addressDetails = false;
    this.sharedService.paymentDetails = false;
    this.sharedService.summaryDetails = true;
    this.sharedService.payselectMonth = this.paymentForm.controls['selectMonth'].value;
    this.sharedService.payselectYear = this.paymentForm.controls['selectYear'].value;  
    this.sharedService.paycreditCardNo = this.paymentForm.controls['creditCardNo'].value;
    this.sharedService.payment1.billTo =this.paymentForm.controls['bill'].value;
    this.sharedService.payment1.creditCardType = this.paymentForm.controls['selectCard'].value;
    this.sharedService.payment1.creditCardNumber = this.paymentForm.controls['creditCardNo'].value;
    this.sharedService.payment1.cvvNumber = this.paymentForm.controls['cvvNo'].value;
    this.sharedService.payment1.middleName = this.paymentForm.controls['middleName'].value;
    this.sharedService.payment1.firstName = this.paymentForm.controls['firstName'].value;
    this.sharedService.payment1.lastName = this.paymentForm.controls['lastName'].value;
    this.sharedService.payment1.company = this.paymentForm.controls['companyName'].value;
    this.sharedService.payment1.email = this.paymentForm.controls['EmailId'].value;
    this.sharedService.payment1.Verifyemail = this.paymentForm.controls['verifyEmail'].value;
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
}
