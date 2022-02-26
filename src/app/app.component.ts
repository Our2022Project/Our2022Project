import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { sharedService } from './Service/sharedService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TrackingService';

  constructor(private router: Router, private sharedService:sharedService) { }

  ngOnInit(): void {
  if(sessionStorage.getItem("token") === null){
      this.router.navigateByUrl(`/login`);
    }else{
      this.sharedService.token = JSON.parse(sessionStorage.getItem("token") || "");
      this.sharedService.userName = JSON.parse(sessionStorage.getItem("userName") || "");
      this.router.navigateByUrl(`/dashboard`);
      
    }
  }
  
}
