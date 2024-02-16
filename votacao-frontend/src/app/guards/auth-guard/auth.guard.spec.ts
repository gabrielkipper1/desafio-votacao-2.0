import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CanActivateFn, Router, RouterModule } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { RouteService } from '../../services/route-service/route.service';
import { authGuard } from './auth.guard';
import { LoginScreenComponent } from '../../screens/login-screen/login-screen.component';
import { adminGuard } from '../admin-guard/admin.guard';

describe('AuthGuard', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routeServiceSpy: jasmine.SpyObj<RouteService>;
  let router: Router;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot(
          [{ path: 'login', component: LoginScreenComponent }]
        )
      ],
      providers: [authGuard]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
