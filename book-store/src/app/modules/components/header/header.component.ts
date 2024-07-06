import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string = '';
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.updateUserInfo();
  }

  updateUserInfo(): void {
    this.username = this.authService.getUsername() || '';
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  openSignup(): void {
    this.router.navigateByUrl('/signup');
  }

  openLogin(): void {
    this.router.navigateByUrl('/login');
  }

  logout(): void {
    this.authService.logout(); // Clear authentication state
    this.updateUserInfo(); // Update UI state
    this.router.navigateByUrl('/'); // Navigate to home or login page
  }
}
