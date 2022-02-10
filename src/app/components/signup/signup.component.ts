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
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]],
      ConfirmPassword: [null, [Validators.required,]],
      Phonenumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      Address1: ['', Validators.required, Validators.minLength(10)],
      Address2: ['', Validators.required],
      City: ['', Validators.required],
      ZIP: ['', Validators.required,],
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
