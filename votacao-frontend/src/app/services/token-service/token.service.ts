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
    return this.userToken;
  }

  removeToken() {
    localStorage.setItem('user-token', "");
  }

  hasToken() {
    return this.userToken !== undefined;
  }

  saveToken(userToken: UserTokenData) {
    console.log("saving token", userToken);
    localStorage.setItem('user-token', JSON.stringify(userToken));
  }

  loadToken(): UserTokenData | undefined {
    console.log("load token from auth service");
    if (this.userToken === undefined) {
      const token = localStorage.getItem('user-token');

      if (token !== undefined && token !== null && token !== "") {
        try {
          this.userToken = JSON.parse(token);
        }
        catch (e) {
          console.log("[TOKEN] error parsing token");
          return undefined;
        }
      }
    }

    return this.userToken;
  }

}
