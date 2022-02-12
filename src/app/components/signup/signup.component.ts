import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailValidator, FormBuilder, Validators } from '@angular/forms';
import { sharedService } from 'src/app/Service/sharedService.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {



  constructor(private router: Router, private fb: FormBuilder, private sharedService: sharedService) { }

  SignupForm: any;
  fieldTextType: boolean = false;
  fieldType: boolean = false;



  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.SignupForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      emailId: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      addressLine1: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      country: ['', [Validators.required]],
      addressType: ['', [Validators.required]],
      roles: ['', [Validators.required]],


    }
    );
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  toggleTextType() {
    this.fieldType = !this.fieldType;
  }
  goToLogin() {
    //this.router.navigateByUrl('/login');
    this.sharedService.register(this.SignupForm.controls['userName'].value, this.SignupForm.controls['password'].value, this.SignupForm.controls['firstName'].value, this.SignupForm.controls['lastName'].value, this.SignupForm.controls['emailId'].value, this.SignupForm.controls['phoneNumber'].value, this.SignupForm.controls['addressLine1'].value, this.SignupForm.controls['city'].value, this.SignupForm.controls['state'].value, this.SignupForm.controls['zipCode'].value, this.SignupForm.controls['country'].value, this.SignupForm.controls['addressType'].value, this.SignupForm.controls['roles'].value).subscribe(data => {
      this.router.navigateByUrl('/login');
    },
      (error) => {
      });
  }



}
