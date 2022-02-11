import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailValidator, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {



  constructor(private router: Router, private fb: FormBuilder) { }

  SignupForm: any;
  fieldTextType: boolean = false;
  fieldType: boolean = false;



  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.SignupForm = this.fb.group({
      userName: ['', [Validators.required, Validators.pattern( '^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$')]],
      password: ['', [Validators.required, Validators.minLength(8),Validators.pattern('(?=.*[A-Z][A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]],
      firstName: ['', [Validators.required,Validators.pattern('^([A-Z][a-z][a-z]+)$')]],
      lastName: ['', [Validators.required,Validators.pattern('^([A-Z][a-z][a-z]+)$')]],
      emailId: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      addressLine1: ['', [Validators.required, Validators.minLength(10),Validators.pattern('^([a-z][a-z]+)$')]],
      city: ['', [Validators.required,Validators.pattern('^([a-z][a-z]+)$')]],
      state: ['', [Validators.required,Validators.pattern('^([a-z][a-z]+)$')]],
      zipCode: ['',[ Validators.required,Validators.pattern("[0-9]{6}")]],
      country: ['', [Validators.required,Validators.pattern('^([a-z][a-z]+)$')]],
      addressType: ['', [Validators.required,Validators.pattern('^([a-z][a-z]+)$')]],
      
    
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
    this.router.navigateByUrl('/login');
  }


}
