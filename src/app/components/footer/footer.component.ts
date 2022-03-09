import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sharedService } from 'src/app/Service/sharedService.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router , public sharedService: sharedService) { }
  check: boolean = false;

  gotToLoginOrDashboard(): void {
    if (this.sharedService.token === '') {
      this.router.navigateByUrl('/login');
    } else {
      this.router.navigateByUrl('/dashboard');
    } }  
 ngOnInit(): void {
  }
}
