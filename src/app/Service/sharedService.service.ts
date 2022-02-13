import { HttpClient, HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { RegisterData } from "../Model/SignUp"

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
    register(registerObj: RegisterData) {
        return this.http.post(environment.register, registerObj, this.httpOptions);
    }



}