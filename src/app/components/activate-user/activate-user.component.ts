import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router} from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { sharedService } from 'src/app/Service/sharedService.service';
@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.scss']
})
export class ActivateUserComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, public sharedService: sharedService) { }
  activateToken: string = '';
  errorMessage: string = '';
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); 
        this.activateToken = params['activeUserToken'];
        console.log(this.activateToken);
      }
    );
  }


  activateUserLink(): void {
    this.sharedService.activateUser(this.activateToken).subscribe(
      data => {
        this.router.navigateByUrl('/login');
      },
      error => {
        console.error(error); 
        this.errorMessage = error?.error.message || error?.error;
      }
      );
  }
}
