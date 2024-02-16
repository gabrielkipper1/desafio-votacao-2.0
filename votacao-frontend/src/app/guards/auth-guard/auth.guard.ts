import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { RouteService } from '../../services/route-service/route.service';
import { catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const routeService: RouteService = inject(RouteService);

  if (authService.getToken() === undefined) {
    routeService.saveRoute(state.url);
    router.navigate(['/', 'login']);
    return false;
  }

  return authService.isLoggedIn().pipe(
    catchError((error) => {
      routeService.saveRoute(state.url);
      router.navigate(['/', 'login']);
      return of(false);
    })
  );
};
