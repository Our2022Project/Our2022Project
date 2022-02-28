import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { sharedService } from 'src/app/Service/sharedService.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {

  constructor(private fb: FormBuilder, public sharedService: sharedService) { }
  tracking: any;
  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm(): void {
    this.tracking = this.fb.group({
      trackingID: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    }
    );
  }
}
