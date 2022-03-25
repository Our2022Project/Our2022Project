import { Component, OnInit } from '@angular/core';
import { sharedService } from 'src/app/Service/sharedService.service';

@Component({
  selector: 'app-summary-details',
  templateUrl: './summary-details.component.html',
  styleUrls: ['./summary-details.component.scss']
})
export class SummaryDetailsComponent implements OnInit {

  constructor( public sharedService: sharedService) { }

  ngOnInit(): void {
  }

}
