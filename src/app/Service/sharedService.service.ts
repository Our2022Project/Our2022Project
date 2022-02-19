import { HttpClient, HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Address } from "../Models/Address";
import { RegisterData } from "../Models/SignUp"

@Injectable()
export class sharedService {

    isValidToken:boolean = false;
    isRegistrationDone:boolean = false;
    isUserAlreadyExsits:boolean = false;
    token:string = '';
    userName:string = '';
    displayRateSection:boolean = false;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    constructor(private http: HttpClient) {

    }

    login(userName: String, password: string) : Observable<any> {
        return this.http.post(environment.login, { userName: userName, password: password }, this.httpOptions);
    }

    register(registerObj: RegisterData) : Observable<any> {
        return this.http.post(environment.register, registerObj, this.httpOptions);
    }

    forgotPassword(emailId: String) : Observable<any> {
        return this.http.post(environment.forgotPassword, { userEmail: emailId }, this.httpOptions);
    }

    rate(fromAddress: Address, toAddress: Address) : Observable<any> {
        return this.http.post(environment.rate, { fromAddress:fromAddress, toAddress:toAddress }, this.httpOptions);
    }



}