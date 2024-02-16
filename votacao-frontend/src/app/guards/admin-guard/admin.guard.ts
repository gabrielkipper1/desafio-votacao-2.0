import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { catchError, of, retry, tap } from 'rxjs';
import { showErrorSnackBar } from '../../helper-functions/show-snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getErrorMessage } from '../../helper-functions/get-error-message';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  if (auth === undefined) {
    showErrorSnackBar("Erro ao tentar acessar a página", snackBar);
    router.navigate(['/']);
    return false;
  }

  return auth.isAdmin().pipe(
    catchError((error) => {
      auth.signOut();
      showErrorSnackBar(getErrorMessage(error.error), snackBar);
      router.navigate(['/']);
      return of(false);
    }),
    tap((isAdmin) => {
      if (!isAdmin) {
        showErrorSnackBar("Somente administradores podem acessar essa página", snackBar);
        router.navigate(['/']);
        return false;
      }
      return true;
    })
  );
};

