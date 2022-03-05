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
      trackingID: ['', [Validators.required, Validators.pattern("[0-9]{14}$")]],
    });
}
restrictNumeric(event: any): any {
  return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  
}
}
