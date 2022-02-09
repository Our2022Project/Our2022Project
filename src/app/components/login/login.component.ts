import { Component, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router, private fb: FormBuilder) { }
  loginForm: any;
  fieldTextType: boolean = false;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.pattern('^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$')]],
      password: ['', [Validators.required, Validators.minLength(8),Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]],
    });
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  goToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }

  user_register() {
    this.router.navigateByUrl('/signup');
  }


}
