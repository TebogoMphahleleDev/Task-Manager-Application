import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class Login {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  private apiUrl = 'http://localhost:5000/login';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post<{ success: boolean; message?: string }>(this.apiUrl, {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (response) => {
        if (response.success) {
          this.errorMessage = '';
          // Navigate to dashboard
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = response.message || 'Login failed';
        }
      },
      error: (err) => {
        this.errorMessage = 'Login failed due to server error';
      }
    });
  }
}
