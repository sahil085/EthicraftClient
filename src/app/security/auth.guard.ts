import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../service/auth.service';
import {UserService} from '../service/user.service';
import {map, take} from 'rxjs/operators';
import {LoginComponent} from '../components/login/login.component';
import {AppComponent} from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService,
              private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const roles = next.data.roles as Array<String>;
    if (this.auth.isLoggednIn() && roles.indexOf(UserService.getCurrentRole()) > -1) {
      return true;
    } else if (this.auth.isLoggednIn() && roles.indexOf(UserService.getCurrentRole()) < 0) {
      this.router.navigate(['accessDenied']);
      return true;
    } else {
      this.router.navigate(['login'], {queryParams: {returnUrl: state.url}});
      return false;
    }

  }
}
