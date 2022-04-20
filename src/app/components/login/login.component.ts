import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { sharedService } from 'src/app/Service/sharedService.service';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  constructor(private router: Router, private fb: FormBuilder, public sharedService: sharedService, public spinner: NgxSpinnerService,) { }
  loginForm: any;
  fieldTextType: boolean = false;

  ngOnInit(): void {
    this.initializeForm();
    this.sharedService.isLoginTrue = true;
    this.sharedService.loginOrSignup = 'Sign Up';
  }

  initializeForm(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.pattern('^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[A-Z][A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]],

    });
  }

  toggleFieldTextType(): void {
    this.fieldTextType = !this.fieldTextType;
  }

  goToDashboard(): void {
    this.spinner.show();
    this.sharedService.userName = this.loginForm.controls['userName'].value;
    this.sharedService.login(this.loginForm.controls['userName'].value, this.loginForm.controls['password'].value).subscribe({
      next: (data: any) => {
        this.spinner.hide();
        this.sharedService.token = data.accessToken;
        this.sharedService.isValidToken = false;
        this.router.navigateByUrl('/dashboard');
        sessionStorage.setItem("token", this.sharedService.token);
        sessionStorage.setItem("userName", this.sharedService.userName);
      },
      error: (error: HttpErrorResponse) => {
        this.spinner.hide();
        //this.initializeForm();
        this.sharedService.isValidToken = true;
        console.error('error at login ', error);
        console.error('error at login ', error?.error.message);
      },
    });
  }

  user_register(): void {
    this.router.navigateByUrl('/signup');
  }

  forgot(): void {
    this.router.navigateByUrl('/forgotPassword');
  }

  isValidForm(): void {
    if (this.loginForm.valid) {
      this.goToDashboard();
    }
  }

}
