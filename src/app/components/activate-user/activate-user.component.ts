import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router} from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { sharedService } from 'src/app/Service/sharedService.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.scss']
})
export class ActivateUserComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, public sharedService: sharedService, public spinner: NgxSpinnerService,) { }
  activateToken: string = '';
  errorMessage: string = '';
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.activateToken = params['activeUserToken'];
      }
    );
  }


  activateUserLink(): void {
    this.spinner.show();
    this.sharedService.activateUser(this.activateToken).subscribe( data => {
      this.spinner.hide();
        this.router.navigateByUrl('/login');
      },
      (error)=> {
        this.spinner.hide();
        if (error?.status === 200 || error?.status === 201) {
          this.router.navigateByUrl('/login');
        } else {
          console.error(error); 
          this.errorMessage = error?.error.message || error?.error;
        }
      }
      );
  }
}
