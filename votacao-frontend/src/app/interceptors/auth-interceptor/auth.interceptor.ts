import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth-service/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  blackListedRoutes: string[] = ["signin", "signup"];

  constructor(private auth: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.blackListedRoutes.includes(request.url.split("/").pop()!)) {
      return next.handle(request);
    }

    if (this.auth.getToken() !== undefined) {
      console.log()
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.userToken?.token}`
        }
      });
    }

    return next.handle(request);
  }
}
