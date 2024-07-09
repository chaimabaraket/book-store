import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username: string | null = null;
  role: string | null = null;
  cartQuantity: number = 0;

  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadUserDetails(); // Load user details initially

    // Subscribe to changes in local storage (if necessary)
    this.localStorage.observe('username').subscribe(() => {
      this.loadUserDetails();
    });
    this.localStorage.observe('role').subscribe(() => {
      this.loadUserDetails();
    });
    this.localStorage.observe('cartQuantity').subscribe(() => {
      this.loadUserDetails();
    });
  }

  private loadUserDetails() {
    this.username = this.localStorage.retrieve('username') || null;
    this.role = this.localStorage.retrieve('role') || null;
    this.cartQuantity = this.localStorage.retrieve('cartQuantity') || 0;

    // Manually trigger change detection
    this.cdr.detectChanges();
  }

  getUsername() {
    return this.username;
  }

  isAdmin() {
    return this.role === 'ROLE_ADMIN';
  }

  handleNavigation(page: string) {
    this.router.navigate([`/${page}`]);
  }
}
