import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../interfaces/user';
import { CommonModule } from '@angular/common';
import { UserAdmin } from '../../interfaces/user-admin';
import { UserService } from '../../services/user-service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { showErrorSnackBar } from '../../helper-functions/show-snack-bar';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() user!: UserAdmin;
  errorMessage: string | undefined = undefined;

  constructor(private userService: UserService, private snack: MatSnackBar) { }

  toggleAdminStatus(): void {
    this.userService.updateUserRole({ userId: this.user.id, active: !this.user.isadmin })
      .subscribe({
        next: (user: UserAdmin) => {
          this.user.isadmin = user.isadmin
        },
        error: (err: any) => showErrorSnackBar(err.error, this.snack),
      });
  }
}
