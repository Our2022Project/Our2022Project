import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

 

    constructor(private router: Router, private fb: FormBuilder) { }
  
    SignupForm: any;
    isPassword:boolean = false;
    isUserName:boolean = false;
    isPasswordShow:boolean = true;
    isUserNameShow:boolean = true;
    
    ngOnInit(): void {
      this.initializeForm();
    }
  
    initializeForm(): void {
      this.SignupForm= this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
        userName: ['', Validators.required],
      });
    }

    continue(){
      this.isPasswordShow = false;
      this.isPassword = true;
    }
    continue1(){
      this.isUserNameShow = false;
      this.isUserName = true;
    }
  
    goToLogin(){
      this.router.navigateByUrl('/signup');
    }
  
    user_register(){
      this.router.navigateByUrl('/signup');
    }
    
    dashBoard(){
      this.router.navigateByUrl('/dashboard');
    }

  }
