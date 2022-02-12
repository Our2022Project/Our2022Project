import { HttpClient, HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class sharedService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) {

    }

    login(userName: String, password: string) {
        return this.http.post(environment.login, { userName: userName, password: password }, this.httpOptions);
    }
    register(userName: String, password: string, firstName: String, lastName: string, emailId: String, phoneNumber: string, addressLine1: String, city: string, state: String, zipCode: String, country: String, addressType: String, roles: string) {
        return this.http.post(environment.register, { userName: userName, password: password, firstName:firstName, lastName:lastName, emailId:emailId, phoneNumber:phoneNumber, addressLine1:addressLine1,  city:city, state:state, zipCode:zipCode, country:country, addressType:addressType, roles:roles,}, this.httpOptions);
    }



}