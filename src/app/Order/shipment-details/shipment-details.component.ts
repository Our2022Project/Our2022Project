import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sharedService } from 'src/app/Service/sharedService.service';
@Component({
  selector: 'app-shipment-details',
  templateUrl: './shipment-details.component.html',
  styleUrls: ['./shipment-details.component.scss']
})
export class ShipmentDetailsComponent implements OnInit {

  constructor(private router: Router, private fb: FormBuilder, public sharedService: sharedService) { }

  shipmentForm: any;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.shipmentForm = this.fb.group({


    });
  }

}
