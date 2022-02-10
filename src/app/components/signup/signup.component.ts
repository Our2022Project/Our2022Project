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
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]],
      ConfirmPassword: [null, [Validators.required, ]],
      Address1: ['', Validators.required],
      Address2: ['', Validators.required],
      City: ['', Validators.required],
      ZIP: ['', Validators.required],
      Phonenumber:[null,Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]
    }
    );
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

}
