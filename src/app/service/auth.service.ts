import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable()
export class AuthService {
  constructor(private myRoute: Router) { }

  isAuthenticated() {
    return localStorage.getItem('isAuthenticated');
  }
  isLoggednIn() {
    return this.isAuthenticated() !== null;
  }
  logout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.myRoute.navigate(['login']);
  }
}

