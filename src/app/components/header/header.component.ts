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
    if (this.isValidToken == true) {
      this.isValidToken = false;
    } else {
      this.isValidToken = true;
    }
  }

  goToLogin(): void {
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userName');
    this.sharedService.token = ''; 
    this.router.navigateByUrl('/login');
  }

  search(): void {
    if (this.searchBox == true) {
      this.searchBox = false;
    } else {
      this.searchBox = true;
    }
  }

  onclick(): void {
    if (this.check == true) {
      this.check = false;
    } else {
      this.check = true;
    }
  }

  rateCard(): void {
    this.router.navigateByUrl('/dashboard');
    this.sharedService.displayRateSection = true;
    this.sharedService.displaytrackSection = false;
  }
  track(): void {
    this.router.navigateByUrl('/dashboard');
    this.sharedService.displaytrackSection = true;
    this.sharedService.displayRateSection = false;
  }

  gotToLoginOrDashboard(): void {
    if (this.sharedService.token === '') {
      this.router.navigateByUrl('/login');
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }
  goToLoginOrSignup(): void {
    if (this.sharedService.isLoginTrue) {
      this.router.navigateByUrl('/signup');
      this.sharedService.loginOrSignup = 'Login';
    } else {
      this.router.navigateByUrl('/login')
      this.sharedService.loginOrSignup = 'Sign Up';
    }
  }

  // ship(): void {
  //   this.router.navigateByUrl('/address-details');
  // }
}