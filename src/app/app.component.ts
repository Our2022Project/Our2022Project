import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { sharedService } from './Service/sharedService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TrackingService';
  activatePage?: string;
  resetPage?: string;

  constructor(private router: Router, private route: ActivatedRoute, private sharedService:sharedService) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.activatePage = params['activeUserToken'];
        this.resetPage = params['token'];
      }
    );

    if (sessionStorage.getItem("token") === null && this.activatePage === null && this.resetPage === null) {
      this.router.navigateByUrl('/login');
    } else if (this.activatePage) {
      this.router.navigateByUrl('/activate-user');
    } else if (this.activatePage) {
      this.router.navigateByUrl('/reset-password');
    } else {
      this.sharedService.token = JSON.parse(sessionStorage.getItem("token") || "");
      this.sharedService.userName = JSON.parse(sessionStorage.getItem("userName") || "");
      this.router.navigateByUrl('/dashboard');

    }
  }
  
}
