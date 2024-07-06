import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../../authentication/auth.service";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = `Basic ${window.btoa(
      this.authService.loginRequest.username + ":" + this.authService.loginRequest.password)}`

    const authReq = req.clone({
      headers: req.headers.set('authorization', authToken)
    });
    return next.handle(authReq);
  }
}
