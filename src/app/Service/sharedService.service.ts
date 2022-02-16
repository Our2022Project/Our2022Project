import { HttpClient, HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { address } from "../Model/address";
import { RegisterData } from "../Model/SignUp"

@Injectable()
export class sharedService {

    isValidToken:boolean = false;
    isRegistrationDone:boolean = false;
    isUserAlreadyExsits:boolean = false;
    token:string = '';
    userName:string = '';

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

    rate(fromAddress: address, toAddress: address) : Observable<any> {
        return this.http.post(environment.rate, { fromAddress:fromAddress, toAddress:toAddress }, {
            headers: new HttpHeaders(
                {
                  'Authorization': 'Bearer ' + this.token,
                   'Content-Type': 'application/json'
                })
        });
    }



}