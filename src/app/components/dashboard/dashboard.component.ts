import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sharedService } from 'src/app/Service/sharedService.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, public sharedService: sharedService) { }

  ngOnInit(): void {

  }

  checkrate(): void {
    this.sharedService.displayRateSection = true;
    this.sharedService.displaytrackSection = false;
  }

  track(): void {
    this.sharedService.displayRateSection = false;
    this.sharedService.displaytrackSection = true;
  }

  ship(): void {
    this.sharedService.displayRateSection = false;
    this.sharedService.displaytrackSection = false;
    this.router.navigateByUrl('/address-details');
  }
  location(): void {
    this.sharedService.displayRateSection = false;
    this.sharedService.displaytrackSection = false;
  }

}
