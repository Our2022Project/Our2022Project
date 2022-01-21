import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {FooterComponent} from './components/footer/footer.component';

const routes: Routes = [  
  { path: 'login', component: LoginComponent },  
  { path: 'signup', component: SignupComponent },  
  { path: 'header', component: HeaderComponent }, 
  { path: 'dashboard', component: DashboardComponent }, 
  { path: 'footer', component: FooterComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
