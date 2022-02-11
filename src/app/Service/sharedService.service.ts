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

    constructor( private http:HttpClient ) {

     }

    login(userName: String, password: string) {
        return this.http.post(environment.login, { userName: userName, password: password }, this.httpOptions);
    }


}