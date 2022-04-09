import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sharedService } from 'src/app/Service/sharedService.service';
import { ActivatedRoute, Router} from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private fb: FormBuilder, public sharedService: sharedService, private router: Router, private route: ActivatedRoute, public spinner: NgxSpinnerService,) { }
  changeForm: any;
  fieldTextType: boolean = false;
  fieldType: boolean = false;
  TextType: boolean = false;
  resetToken: string = '';
  error: boolean = false;
  errorMessage: string = '';

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.resetToken = params['token'];
      }
    );
    this.initializeForm();
  }

  initializeForm(): void {
    this.changeForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern('(?=.*[A-Z][A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern('(?=.*[A-Z][A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]],
    }, {
      validators: this.MustMatch('newPassword', 'confirmPassword')
    });
  }

  toggleFieldTextType(): void {
    this.fieldTextType = !this.fieldTextType;
  }
  toggleTextType(): void {
    this.fieldType = !this.fieldType;
  }
  toggleType(){
    this.TextType = !this.TextType;
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['MustMatch']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MustMatch: true });
      }
      else {
        matchingControl.setErrors(null);
      }
    }

  }
  get f() {
    return this.changeForm.controls
  }

  resetPassword() : void {
    this.spinner.show();
    this.sharedService.resetPassword(this.changeForm.controls['newPassword'].value, this.resetToken).subscribe( data => {
      this.spinner.hide();
       this.router.navigateByUrl('/login');
      },
      error => {
        this.spinner.hide();
        if (error?.status === 200 || error?.status === 201) {
          this.router.navigateByUrl('/login');
        } else {
          this.error = true;
          console.error(error); 
          this.errorMessage = error?.error.message || error?.error;
        }
      }
      );
  }
}



