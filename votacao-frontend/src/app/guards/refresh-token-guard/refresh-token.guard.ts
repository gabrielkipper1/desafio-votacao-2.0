import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { inject } from '@angular/core';
import { RouteService } from '../../services/route-service/route.service';
import { catchError, of } from 'rxjs';

export const refreshTokenGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const token = authService.getToken();

  //this guard does not prevente the user from accessing the route
  //it only checks if the token is still valid and if not, it will log the user out
  if (token === undefined || token.token === undefined || token.token === "") {
    return of(true);
  }

  return authService.validate(token.token).pipe(
    catchError((error) => {
      return of(true);
    })
  );
};
