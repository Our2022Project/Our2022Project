import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RateTranistComponent } from '../app/components/rate-tranist/rate-tranist.component';
import { sharedService } from './Service/sharedService.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './Service/auth.interceptor';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TrackingComponent } from './components/tracking/tracking.component';
import { AddressDetailsComponent } from './Order/address-details/address-details.component';
import { ShipmentDetailsComponent } from './Order/shipment-details/shipment-details.component';
import { PaymentDetailsComponent } from './Order/payment-details/payment-details.component';
import { SummaryDetailsComponent } from '../app/Order/summary-details/summary-details.component';
import {MaterialExampleModule} from '../material.module';
import { DatePipe } from '@angular/common';
import { ActivateUserComponent } from './components/activate-user/activate-user.component';
import { Routes, RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    FooterComponent,
    RateTranistComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    TrackingComponent,
    AddressDetailsComponent,
    ShipmentDetailsComponent,
    PaymentDetailsComponent,
    SummaryDetailsComponent,
    ActivateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    MaterialExampleModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    sharedService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
