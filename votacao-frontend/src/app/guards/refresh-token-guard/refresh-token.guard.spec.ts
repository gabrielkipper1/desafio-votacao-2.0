import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

import { refreshTokenGuard } from './refresh-token.guard';
import { AuthService } from '../../services/auth-service/auth.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('refreshTokenGuard', () => {

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => refreshTokenGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, HttpClient],
      imports: [HttpClientTestingModule]

    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should call updateUserInfo() on the AuthService', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'updateUserInfo').and.returnValue(of(true));

    const routeSnapshot = {} as ActivatedRouteSnapshot;
    const stateSnapshot = {} as RouterStateSnapshot;

    const value = executeGuard(routeSnapshot, stateSnapshot);
    expect(authService.updateUserInfo).toHaveBeenCalled();
  });
});
