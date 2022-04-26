import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { sharedService } from './Service/sharedService.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TrackingService';
  activatePage?: string;
  resetPage?: string;

  constructor(private router: Router, private route: ActivatedRoute, private sharedService:sharedService) { }
  
  @HostListener('window:popstate', ['$event'])
  onPopState(_event: any) {
    window.location.reload();
  }
  
  ngOnInit(): void {
    
  }
  
}
