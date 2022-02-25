import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sharedService } from 'src/app/Service/sharedService.service';
import { RegisterData, userAddressRequestList } from 'src/app/Models/SignUp';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {



  constructor(private router: Router, private fb: FormBuilder, public sharedService: sharedService) { }

  SignupForm: any;
  fieldTextType: boolean = false;
  fieldType: boolean = false;
  registerObj = new RegisterData();
  registerAddressObj = new userAddressRequestList();


  ngOnInit(): void {
    this.registerObj.roles = [];
    this.registerObj.userAddressRequestList = [];
    this.initializeForm();
  }

  initializeForm(): void {
    this.SignupForm = this.fb.group({
      userName: ['', [Validators.required, Validators.pattern('^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern('(?=.*[A-Z][A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern('(?=.*[A-Z][A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z +\\-\']+')]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z +\\-\']+')]],
      emailId: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      addressLine1: ['', [Validators.required]],
      city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(35), Validators.pattern('^[a-zA-Z +\\-\']+')]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.pattern("[0-9]{5}(?<!00000)$")]],
      Phonecode: [null,],
    }, {
      validators: this.MustMatch('password', 'confirmPassword')
    });
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  toggleFieldType() {
    this.fieldType = !this.fieldType;
  }

  goToLogin() {
    this.mappingData();
    this.sharedService.register(this.registerObj).subscribe(data => {
      this.sharedService.isRegistrationDone = false;
      this.sharedService.isUserAlreadyExsits = true;
      this.registerObj.roles = [];
      this.registerObj.userAddressRequestList = [];
      this.initializeForm();
    },
      (error) => {
        this.sharedService.isRegistrationDone = true;
        this.sharedService.isUserAlreadyExsits = false;
        this.router.navigateByUrl('/login');
      });
  }

  mappingData(): void {
    this.registerObj.userName = this.SignupForm.controls['userName'].value;
    this.registerObj.password = this.SignupForm.controls['password'].value;
    this.registerObj.password = this.SignupForm.controls['confirmPassword'].value;
    this.registerObj.firstName = this.SignupForm.controls['firstName'].value;
    this.registerObj.lastName = this.SignupForm.controls['lastName'].value;
    this.registerObj.emailId = this.SignupForm.controls['emailId'].value;
    this.registerObj.phoneNumber = this.SignupForm.controls['phoneNumber'].value;
    this.registerObj.roles.push("admin");
    this.registerAddressObj.addressLine1 = this.SignupForm.controls['addressLine1'].value;
    this.registerAddressObj.city = this.SignupForm.controls['city'].value;
    this.registerAddressObj.state = this.SignupForm.controls['state'].value;
    this.registerAddressObj.zipCode = this.SignupForm.controls['zipCode'].value;
    this.registerAddressObj.country = "US";
    this.registerAddressObj.addressType = 'Home';
    this.registerObj.userAddressRequestList.push(this.registerAddressObj);
  }


  selectstate: string = '';
  selectchangehandler(event: any) {
    this.state.setValue(event.target.value, {
      onlySelf: true
    })
  }
  get state() {
    return this.SignupForm.get('state');
  }

  MustMatch(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['MustMatch']){
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MustMatch: true });
      }
      else{
        matchingControl.setErrors(null);
      }
    }

  }
  get f() {
    return this.SignupForm.controls
  }

  restrictNumeric(event: any): any {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }
  
}
