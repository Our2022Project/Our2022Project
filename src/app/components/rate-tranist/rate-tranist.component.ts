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
      FromAddress1: ['', [Validators.required, Validators.minLength(10)]],
      FromAddress2: [null],
      FromCity: ['', Validators.required,Validators.minLength(3),Validators.maxLength(35),Validators.pattern('[a-zA-Z]+$')],
      FromZIP: ['',[ Validators.required,Validators.pattern("[0-9]{6}")]],
      ToAdd1: ['', [Validators.required, Validators.minLength(10)]],
      ToAdd2: [null],
      Tocity: ['', Validators.required,Validators.minLength(3),Validators.maxLength(35),Validators.pattern('[a-zA-Z]+$')],
      Tozip: ['',[ Validators.required,Validators.pattern("[0-9]{6}")]],
      }
    );
  }
  checkRate() {
    this.router.navigateByUrl('/signup');
  }
}
