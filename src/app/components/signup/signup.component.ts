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



  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.SignupForm = this.fb.group({
      email: ['', Validators.required,Validators.email],
      Createpassword: ['', Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')],
      Confirmpassword: ['', Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')],
      Address1: ['', Validators.required],
      Address2: ['', Validators.required],
      City: ['', Validators.required],
      ZIP: ['', Validators.required,Validators.maxLength(16)],
    });
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

}
