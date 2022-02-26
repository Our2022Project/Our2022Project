import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { sharedService } from 'src/app/Service/sharedService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  constructor(private router: Router, private fb: FormBuilder, public sharedService: sharedService) { }
  loginForm: any;
  fieldTextType: boolean = false;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.pattern('^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[A-Z][A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]],

    });
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  goToDashboard() {
    this.sharedService.userName = this.loginForm.controls['userName'].value;
    this.sharedService.login(this.loginForm.controls['userName'].value, this.loginForm.controls['password'].value).subscribe(data => {
      if(data.accessToken === undefined) {
        this.initializeForm();
        this.sharedService.isValidToken = true;
      } else {
        this.sharedService.token = data.accessToken;
        this.sharedService.isValidToken = false;
        this.router.navigateByUrl('/dashboard');
        sessionStorage.setItem("token", JSON.stringify(this.sharedService.token));
        sessionStorage.setItem("userName", JSON.stringify(this.sharedService.userName));
      }
    },
      (error) => {
      });
  }

  user_register() {
    this.router.navigateByUrl('/signup');
  }
  forgot(){
    this.router.navigateByUrl('/forgotPassword');
  }

}
