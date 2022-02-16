import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { sharedService } from "./sharedService.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private sharedService:sharedService) { }

     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let request = req;
        if (this.sharedService.token !== '') {
          request = req.clone({
            setHeaders: {
              authorization: `Bearer ${ this.sharedService.token }`
            }
          });
        }
        return next.handle(request).pipe();
     }

} 