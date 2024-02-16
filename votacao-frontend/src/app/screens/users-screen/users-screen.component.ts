import { Component } from '@angular/core';
import { LoadingComponent } from '../../components/loading-component/loading.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Observable, catchError } from 'rxjs';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user-service/user.service';
import { HttpClient } from '@angular/common/http';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { UserAdmin } from '../../interfaces/user-admin';
import { Router } from '@angular/router';
import { getErrorMessage } from '../../helper-functions/get-error-message';

@Component({
  selector: 'app-users-screen',
  standalone: true,
  imports: [LoadingComponent, MatIconModule, MatButtonModule, CommonModule, UserCardComponent],
  templateUrl: './users-screen.component.html',
  styleUrl: './users-screen.component.scss'
})
export class UsersScreenComponent {
  users$!: Observable<UserAdmin[]>;
  errorMessage: string | undefined = undefined;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.users$ = this.userService.getUserRoles().pipe(catchError((err) => { this.setErrorMessage(err); return []; }));
  }

  setErrorMessage(error: Error) {
    this.errorMessage = getErrorMessage(error);
  }

  goToHome() {
    this.router.navigate(['/', 'home']);
  }
}
