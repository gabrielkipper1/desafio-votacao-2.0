import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInData } from '../../interfaces/auth/sign-in-data';
import { SignUpData } from '../../interfaces/auth/sign-up-data';
import { Observable, Subscription, catchError, map, of } from 'rxjs';
import { UserTokenData } from '../../interfaces/auth/user-token-data';
import { TokenService } from '../token-service/token.service';
import { JsonPipe } from '@angular/common';
import { SubscriptSizing } from '@angular/material/form-field';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userToken: UserTokenData | undefined;
  onSignIn!: Subscription;

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  signIn(signInData: SignInData): Observable<UserTokenData> {
    return this.http.post<UserTokenData>(environment.host + environment.signIn, signInData).pipe(map(data => {
      console.log("signin data", data)
      this.saveToken(data);
      return data;
    }));
  }

  signUp(signUpData: SignUpData) {
    return this.http.post(environment.host + environment.signUp, signUpData).pipe(map(data => {
      this.saveToken(data as UserTokenData);
      return data;
    }));
  }

  validate(userToken: string): Observable<boolean> {
    if (this.tokenService === undefined) {
      return of(false);
    }

    return this.http.post<UserTokenData>(environment.host + environment.validate, { token: userToken }).
      pipe(map(data => {
        this.saveToken(data);
        return true;
      }));
  }

  updateUserInfo(): Observable<boolean> {
    const token = this.getToken();
    if (token === undefined) {
      return of(true);
    }

    return this.validate(token.token);
  }

  isLoggedIn(): Observable<boolean> {
    if (this.userToken !== undefined) {
      return this.validate(this.userToken.token).pipe(map(data => {
        return data !== undefined;
      }));
    }
    return of(false);
  }

  saveToken(tokenData: UserTokenData) {
    console.log("save token from auth service", tokenData);
    this.userToken = tokenData;
    this.tokenService.saveToken(tokenData);
  }

  signOut() {
    this.userToken = undefined;
    this.tokenService.removeToken();
  }

  getToken(): UserTokenData | undefined {
    console.log("get token from auth service");
    if (this.tokenService.getToken() !== undefined) {
      return this.userToken;
    }

    this.userToken = this.tokenService.loadToken();
    return this.userToken;
  }

}
