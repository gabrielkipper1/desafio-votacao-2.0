import { Injectable } from '@angular/core';
import { UserTokenData } from '../../interfaces/auth/user-token-data';
import { UnsubscriptionError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private userToken: UserTokenData | undefined;

  constructor() { }

  getToken() {
    if (this.userToken === undefined) {
      this.userToken = this.loadToken();
    }

    return this.userToken;
  }

  hasToken(): boolean {
    return this.loadToken() !== undefined;
  }

  removeToken() {
    localStorage.setItem('user-token', "");
    this.userToken = undefined;
  }

  saveToken(userToken: UserTokenData) {
    this.userToken = userToken;
    localStorage.setItem('user-token', JSON.stringify(userToken));
  }

  loadToken(): UserTokenData | undefined {
    if (this.userToken === undefined) {
      const token = localStorage.getItem('user-token');

      if (token !== undefined && token !== null && token !== "") {
        try {
          this.userToken = JSON.parse(token);
        }
        catch (e) {
          return undefined;
        }
      }
    }

    return this.userToken;
  }

}
