import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sharedService } from 'src/app/Service/sharedService.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, public sharedService: sharedService,) { }
  check: boolean = false;
  searchBox: boolean = false;
  isValidToken: boolean = false;

  ngOnInit(): void {
    if(this.isValidToken == true){
      this.isValidToken = false;
    }else{
      this.isValidToken = true;
      }
    }
  
  goToLogin(): void {
    window.location.reload();
  }

  search() {
    if (this.searchBox == true) {
      this.searchBox = false;
    } else {
      this.searchBox = true;
    }
  }

  onclick() {
    if (this.check == true) {
      this.check = false;
    } else {
      this.check = true;
    }
  }

  rateCard() : void {
    this.sharedService.displayRateSection = true;
  }

  gotToLoginOrDashboard(): void {
    if(this.sharedService.token === '') {
      this.router.navigateByUrl('/login');
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }

}


