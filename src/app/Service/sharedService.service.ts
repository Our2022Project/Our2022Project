import { HttpClient, HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Address } from "../Models/Address";
import { RegisterData } from "../Models/SignUp";
import {OrderAdress } from "../Models/OrderAdress";
import { Payment } from "../Models/Payment";
import { shipment } from "../Models/Shipment";

@Injectable()
export class sharedService {
    show2: boolean = false;
    show1: boolean = false;
    show: boolean = false;
    [x: string]: any;
    shipDate: string = '';
    isValidToken: boolean = false;
    isRegistrationDone: boolean = false;
    isUserAlreadyExsits: boolean = false;
    token: string = '';
    userName: string = '';
    displayRateSection: boolean = false;
    displaytrackSection: boolean = false;
    isLoginTrue: boolean = false;
    loginOrSignup: string = 'Sign Up';
    addressDetails: boolean = true;
    shipmentDetails: boolean = false;
    paymentDetails: boolean = false;
    summaryDetails: boolean = false;
    Validate: boolean = false;
    fromAddress = new Address();
    toAddress = new Address();
    addyourName:string='';
    addfromPhone:string='';
    addfromState:string='';
    addfromEmail:string='';
    addfromAddress:string='';
    addfromCity:string='';
    addtoRecipient:string=';'
    addtoPhone:string='';
    addtoState:string='';
    addtoEmail:string='';
    addtoAddress:string='';
    addtoCity:string='';
    avaiableDate:string='';
    payselectMonth:String='';
    payselectYear:string='';
    paycreditCardNo:string='';
    yourCompany:string='';
    toCompany:string='';

    usstateName = [{ name: 'Alabama (AL)', id: 'AL' },
    { name: 'Alaska (AK)', id: 'AK' },
    { name: 'American Samoa (AS)', id: 'AS' },
    { name: 'Arizona (AZ)', id: 'AZ' },
    { name: 'Arkansas (AR)', id: 'AR' },
    { name: 'California (CA)', id: 'CA' },
    { name: 'Colorado (CO)', id: 'CO' },
    { name: 'Connecticut (CT)', id: 'CT' },
    { name: 'Delaware (DE)', id: 'DE' },
    { name: 'District Of Columbia (DC)', id: 'DC' },
    { name: 'Federated States of Mironesia (FM)', id: 'FM' },
    { name: 'Florida (FL)', id: 'FL' },
    { name: 'Georgia (GA)', id: 'GA' },
    { name: 'GUAM (GU)', id: 'GU' },
    { name: 'Hawaii (HI)', id: 'HI' },
    { name: 'Idaho (ID)', id: 'ID' },
    { name: 'Illinois (IL)', id: 'IL' },
    { name: 'Indiana (IN)', id: 'IN' },
    { name: 'Iowa (IA)', id: 'IA' },
    { name: 'Kansas (KS)', id: 'KS' },
    { name: 'Kentucky (KY)', id: 'KY' },
    { name: 'Louisiana (LA)', id: 'LA' },
    { name: 'Maine (ME)', id: 'ME' },
    { name: 'Maryland (MD)', id: 'MD' },
    { name: 'Massachusetts (MA)', id: 'MA' },
    { name: 'Michigan (MI)', id: 'MI' },
    { name: 'Minnesota (MN)', id: 'MN' },
    { name: 'Mississippi (MS)', id: 'MS' },
    { name: 'Missouri (MO)', id: 'MO' },
    { name: 'Montana (MT)', id: 'MT' },
    { name: 'Nebraska (NE)', id: 'NE' },
    { name: 'Nevada (NV)', id: 'NV' },
    { name: 'New Hampshire (NH)', id: 'NH' },
    { name: 'New Jersey (NJ)', id: 'NJ' },
    { name: 'New Mexico (NM)', id: 'NM' },
    { name: 'New York (NY)', id: 'NY' },
    { name: 'North Carolina (NC)', id: 'NC' },
    { name: 'North Dakota (ND)', id: 'ND' },   
    { name: 'Ohio (OH)', id: 'OH' },
    { name: 'Oklahoma (OK)', id: 'OK' },
    { name: 'Oregon (OR)', id: 'OR' },
    { name: 'Palau (PW)', id: 'PW' },
    { name: 'Pennsylvania (PA)', id: 'PA' },
    { name: 'Puerto Rico (PR)', id: 'PR' },
    { name: 'Rhode Island (RI)', id: 'RI' },
    { name: 'South Carolina (SC)', id: 'SC' },
    { name: 'South Dakota (SD)', id: 'SD' },
    { name: 'Tennessee (TN)', id: 'TN' },
    { name: 'Texas (TX)', id: 'TX' },
    { name: 'Utah (UT)', id: 'UT' },
    { name: 'Vermont (VT)', id: 'VT' },
    { name: 'Virginia (VA)', id: 'VA' },
    { name: 'Washington (WA)', id: 'WA' },
    { name: 'West Virginia (WV)', id: 'WV' },
    { name: 'Wisconsin (WI)', id: 'WI' },
    { name: 'Wyoming (WY)', id: 'WY' }
    ];
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    constructor(private http: HttpClient) {

    }

    login(userName: String, password: string): Observable<any> {
        return this.http.post(environment.login, { userName: userName, password: password }, this.httpOptions);
    }

    register(registerObj: RegisterData): Observable<any> {
        return this.http.post(environment.register, registerObj, this.httpOptions);
    }

    forgotPassword(emailId: String): Observable<any> {
        return this.http.post(environment.forgotPassword, { userEmail: emailId }, this.httpOptions);
    }

    rate(fromAddress: Address, toAddress: Address, shipDate: string, declaredValue: string, packageWeight: string, ): Observable<any> {
        return this.http.post(environment.rate, { fromAddress: fromAddress, toAddress: toAddress, shipDate: shipDate, declaredValue: declaredValue, packageWeight: packageWeight }, this.httpOptions);
    }
    addressDetalis(OrderAdress: OrderAdress): Observable<any> {
        return this.http.post(environment.addressDetalis,OrderAdress, this.httpOptions);
    }

    activateUser(activeUserToken: String): Observable<any> {
        return this.http.put(environment.activateUser+'?activeUserToken='+activeUserToken, {} ,this.httpOptions);
    }

    resetPassword(newPassword: String, token: String): Observable<any> {
        return this.http.put(environment.resetPassword +'?token='+token, { newPassword: newPassword }, this.httpOptions);
    }
    
    payment(Payment: Payment): Observable<any> {
        return this.http.post(environment.payment, Payment, this.httpOptions);
    }
    
    shipment(shipment: shipment): Observable<any> {
        return this.http.post(environment.shipment, shipment, this.httpOptions);
    }
}