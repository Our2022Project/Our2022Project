import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailValidator, FormBuilder, Validators } from '@angular/forms';
import { sharedService } from 'src/app/Service/sharedService.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private router: Router, private fb: FormBuilder, public sharedService: sharedService) { }
  forgotPassword: any;
  showTag: boolean = false;
  
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.forgotPassword = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    }
    );
  }

  forgotPass(): void {
    this.showTag = !this.showTag;
    this.initializeForm();
    this.sharedService.forgotPassword(this.forgotPassword.controls['email'].value).subscribe(data => {
    });

  }
}
