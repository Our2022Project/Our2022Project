import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { RateTranistComponent } from '../app/components/rate-tranist/rate-tranist.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AddressDetailsComponent } from './Order/address-details/address-details.component';
import { ShipmentDetailsComponent } from './Order/shipment-details/shipment-details.component';
import { PaymentDetailsComponent } from './Order/payment-details/payment-details.component';
import { SummaryDetailsComponent } from './Order/summary-details/summary-details.component';
import { ActivateUserComponent } from './components/activate-user/activate-user.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AuthGuard } from './_helper/auth-guard';
import { BasicGuard } from './_helper/basic-guard';

const routes: Routes = [  
  { path: '', component: LoginComponent, canActivate: [BasicGuard] },   
  { path: 'login', component: LoginComponent, canActivate: [BasicGuard] },  
  { path: 'signup', component: SignupComponent, canActivate: [BasicGuard] },  
  { path: 'header', component: HeaderComponent, canActivate: [BasicGuard] }, 
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]}, 
  { path: 'footer', component: FooterComponent },
  { path: 'rate-transit', component: RateTranistComponent, canActivate: [AuthGuard] }, 
  { path: 'forgotPassword', component: ForgotPasswordComponent, canActivate: [BasicGuard]},
  { path: 'address-details', component: AddressDetailsComponent, canActivate: [AuthGuard]},
  { path: 'shipment-details', component: ShipmentDetailsComponent, canActivate: [AuthGuard]},
  { path: 'payment-details', component: PaymentDetailsComponent, canActivate: [AuthGuard]},
  { path: 'summary-details', component: SummaryDetailsComponent, canActivate: [AuthGuard]},
  { path: 'activate-user', component: ActivateUserComponent, canActivate: [BasicGuard]},
  { path: 'reset-password', component: ChangePasswordComponent, canActivate: [BasicGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
