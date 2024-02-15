import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { inject } from '@angular/core';
import { RouteService } from '../../services/route-service/route.service';
import { catchError, of } from 'rxjs';

export const refreshTokenGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const token = authService.getToken();

  if (token === undefined || token.token === undefined || token.token === "") {
    return of(false);
  }


  return authService.validate(token.token).pipe(
    catchError((error) => {
      return of(true);
    })
  );
};
