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

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm(): void {
    this.checkRateForm = this.fb.group({
      Address1: ['', Validators.required],
      Address2: ['', Validators.required],
      City: ['', Validators.required],
      ZIP: ['', Validators.required],
      Add1: ['', Validators.required],
      Add2: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      }
    );
  }
  checkRate() {
    this.router.navigateByUrl('/signup');
  }
}
