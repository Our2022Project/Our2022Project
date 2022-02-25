import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TrackingService';

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("token") === null){
      this.router.navigateByUrl(`/login`);
    }else{
      this.router.navigateByUrl(`/dashboard`);
    }
  }
  
}
