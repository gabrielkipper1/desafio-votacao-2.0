import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { showErrorSnackBar } from '../../helper-functions/show-snack-bar';
import { RouteService } from '../../services/route-service/route.service';

@Injectable()
export class JwtErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private auth: AuthService, private snackBar: MatSnackBar, private routeService: RouteService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request);
  }

  saveRoute() {
    this.routeService.saveRoute(this.router.url);
  }

  showErrorSnackBar(message: string) {
    showErrorSnackBar("Sua sessão expirou, faça login novamente", this.snackBar);
  }
}
