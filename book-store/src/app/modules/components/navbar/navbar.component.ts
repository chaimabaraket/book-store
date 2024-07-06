import { Component, OnInit } from '@angular/core';
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

  constructor(private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.username = this.localStorage.retrieve('username') || null;
    this.role = this.localStorage.retrieve('role') || null;
    this.cartQuantity = this.localStorage.retrieve('cartQuantity') || 0;
  }

  getUsername() {
    return this.username;
  }

  isAdmin() {
    return this.role === 'ROLE_ADMIN';
  }
}
