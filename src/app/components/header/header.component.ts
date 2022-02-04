import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }
  showDroplink1: boolean = false;
  showDroplink2: boolean = false;
  showDroplink3: boolean = false;
  showDroplink4: boolean = false;
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


  dropBtn1(){
    if(this.showDroplink1 == true){
      this.showDroplink1 = false;
    }else{
      this.showDroplink1 = true;
    }
  }
  dropBtn2(){
    if(this.showDroplink2 == true){
      this.showDroplink2 = false;
    }else{
      this.showDroplink2 = true;
    }
  }
  dropBtn3(){
    if(this.showDroplink3 == true){
      this.showDroplink3 = false;
    }else{
      this.showDroplink3 = true;
    }
  }
  dropBtn4(){
    if(this.showDroplink4 == true){
      this.showDroplink4 = false;
    }else{
      this.showDroplink4 = true;
    }
  }
}


