import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';
import { User } from '../../interfaces/user';
import { UserAdmin } from '../../interfaces/user-admin';
import { SetRoleData } from '../../interfaces/set-role-data';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserRoles(): Observable<UserAdmin[]> {
    return this.http.get<UserAdmin[]>(environment.host + environment.user).pipe(map((json: any) => json['users'] as UserAdmin[]));
  }

  updateUserRole(data: SetRoleData): Observable<UserAdmin> {
    return this.http.post<UserAdmin>(environment.host + environment.user_role, { data: data });
  }
}
