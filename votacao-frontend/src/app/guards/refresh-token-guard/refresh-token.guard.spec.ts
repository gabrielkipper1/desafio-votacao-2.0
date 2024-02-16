import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

import { refreshTokenGuard } from './refresh-token.guard';
import { AuthService } from '../../services/auth-service/auth.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../../services/token-service/token.service';

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

  it('should not call validate() if user has no token saved', () => {
    const tokenService = TestBed.inject(TokenService);
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'validate');

    tokenService.removeToken();
    const routeSnapshot = {} as ActivatedRouteSnapshot;
    const stateSnapshot = {} as RouterStateSnapshot;

    const value = executeGuard(routeSnapshot, stateSnapshot);
    expect(authService.validate).not.toHaveBeenCalled();
  })

  it('should call validate() if user has token saved', () => {
    const tokenService = TestBed.inject(TokenService);
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'validate').and.returnValue(of(true));

    const routeSnapshot = {} as ActivatedRouteSnapshot;
    const stateSnapshot = {} as RouterStateSnapshot;

    tokenService.saveToken({
      isAdmin: false,
      token: "test token",
      user: {
        email: "test@test.com",
        id: 1,
        name: "test"
      }
    })

    const value = executeGuard(routeSnapshot, stateSnapshot);
    expect(authService.validate).toHaveBeenCalled();
  });
});
