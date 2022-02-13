import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailValidator, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-rate-tranist',
  templateUrl: './rate-tranist.component.html',
  styleUrls: ['./rate-tranist.component.scss']
})
export class RateTranistComponent implements OnInit {

  constructor(private router: Router, private fb: FormBuilder) { }
  checkRateForm: any;
  drop: boolean = false;
  check: boolean = false;

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm(): void {
    this.checkRateForm = this.fb.group({
      Address1: ['', [Validators.required, Validators.minLength(10)]],
      Address2: ['', [Validators.required, Validators.minLength(10)]],
      City: ['', Validators.required],
      ZIP: ['',[ Validators.required,Validators.pattern("[0-9]{6}")]],
      Add1: ['', [Validators.required, Validators.minLength(10)]],
      Add2: ['', [Validators.required, Validators.minLength(10)]],
      city: ['', Validators.required],
      zip: ['',[ Validators.required,Validators.pattern("[0-9]{6}")]],
      }
    );
  }
  checkRate() {
    this.router.navigateByUrl('/signup');
  }
  dropbtn(){
    this.drop = !this.drop;
    if(this.check == true){
      this.check = false;
    }else{
      this.check = true;
    } 
  }
}
