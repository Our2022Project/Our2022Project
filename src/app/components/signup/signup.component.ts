import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailValidator, FormBuilder, Validators } from '@angular/forms';
import { sharedService } from 'src/app/Service/sharedService.service';
import { RegisterData, userAddressRequestList } from 'src/app/Model/SignUp';

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
  registerObj = new RegisterData();
  registerAddressObj = new userAddressRequestList();


  ngOnInit(): void {
    this.registerObj.roles = [];
    this.registerObj.userAddressRequestList = [];
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
    this.mappingData();
    this.sharedService.register(this.registerObj).subscribe(data => {
      this.router.navigateByUrl('/login');
    },
      (error) => {
      });
  }

  mappingData(): void {
    this.registerObj.userName = this.SignupForm.controls['userName'].value;
    this.registerObj.password = this.SignupForm.controls['password'].value;
    this.registerObj.firstName = this.SignupForm.controls['firstName'].value;
    this.registerObj.lastName = this.SignupForm.controls['lastName'].value;
    this.registerObj.emailId = this.SignupForm.controls['emailId'].value;
    this.registerObj.phoneNumber = this.SignupForm.controls['phoneNumber'].value;
    this.registerObj.roles.push("admin");
    this.registerAddressObj.addressLine1 = this.SignupForm.controls['addressLine1'].value;
    this.registerAddressObj.city = this.SignupForm.controls['city'].value;
    this.registerAddressObj.state = this.SignupForm.controls['state'].value;
    this.registerAddressObj.zipCode = this.SignupForm.controls['zipCode'].value;
    this.registerAddressObj.country = this.SignupForm.controls['country'].value;
    this.registerAddressObj.addressType = 'Home';
    this.registerObj.userAddressRequestList.push(this.registerAddressObj);
  }

}
