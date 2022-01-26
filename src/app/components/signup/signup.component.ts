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
    
    ngOnInit(): void {
      this.initializeForm();
    }
  
    initializeForm(): void {
      this. SignupForm= this.fb.group({
        userName: ['', Validators.required],
        password: ['', Validators.required],
      });
    }
  
    goToLogin(){
      this.router.navigateByUrl('/signup');
    }
  
    user_register(){
      this.router.navigateByUrl('/signup');
    }
  
  }
