import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }
  check: boolean = false;
  searchBox: boolean = false;

  ngOnInit(): void {
  }

  goToLogin() {

    this.router.navigateByUrl(`/footer`);
  }

  search(){ 
    if(this.searchBox == true){
    this.searchBox = false;
  }else{
    this.searchBox = true;
  }
}

  onclick() {
    if(this.check == true){
      this.check = false;
    }else{
      this.check = true;
    } 
  } 
}


