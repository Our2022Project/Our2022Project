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

const routes: Routes = [  
  { path: 'login', component: LoginComponent },  
  { path: 'signup', component: SignupComponent },  
  { path: 'header', component: HeaderComponent }, 
  { path: 'dashboard', component: DashboardComponent }, 
  { path: 'footer', component: FooterComponent },
  { path: 'rate-transit', component: RateTranistComponent }, 
  { path: 'forgotPassword', component: ForgotPasswordComponent},
  { path: 'address-details', component: AddressDetailsComponent},
  { path: 'shipment-details', component: ShipmentDetailsComponent},
  { path: 'payment-details', component: PaymentDetailsComponent},
  { path: 'summary-details', component: SummaryDetailsComponent},
  { path: 'summary-details', component: SummaryDetailsComponent},
  { path: 'activate-user', component: ActivateUserComponent},
  { path: 'reset-password', component: ChangePasswordComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
