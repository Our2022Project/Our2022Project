import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  navShow: boolean = false;

  ngOnInit(): void {
  }

  goToLogin() {

    this.router.navigateByUrl(`/footer`);
  }

  onclick() {
    if (this.navShow == false) {
      this.navShow = true;
    } else {
      this.navShow = false;
    }
  }

}




