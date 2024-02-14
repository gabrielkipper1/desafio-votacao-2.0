import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { inject } from '@angular/core';
import { RouteService } from '../../services/route-service/route.service';
import { catchError, of } from 'rxjs';

export const refreshTokenGuard: CanActivateFn = (route, state) => {
  console.log("refreshTokenGuard");
  const authService: AuthService = inject(AuthService);
  console.log("updating infos")
  return authService.updateUserInfo().pipe(
    catchError((error) => {
      return of(true);
    })
  );
};
