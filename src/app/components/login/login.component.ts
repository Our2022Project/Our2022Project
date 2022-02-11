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

  constructor(private router: Router, private fb: FormBuilder , private sharedService: sharedService) { }
  loginForm: any;
  fieldTextType: boolean = false;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  goToDashboard() {
    this.sharedService.login(this.loginForm.controls['userName'].value,this.loginForm.controls['password'].value).subscribe(data => {
      this.router.navigateByUrl('/dashboard');
    },
    (error) => {
    });
  }

  user_register() {
    this.router.navigateByUrl('/signup');
  }


}
