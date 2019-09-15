import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {LoginService} from '../../service/login.service';
import {Constant} from '../../constants/constant';
import {HomeComponent} from '../adminComponent/home/home.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public username: string;
  public password: string;
  public invalidMessage: string;
  public returnUrl: string;
  public isLoginSubmit = false;

  constructor(private _ngZone: NgZone, public loginService: LoginService, private fb: FormBuilder,
              private router: Router, private route: ActivatedRoute, public auth: AuthService, public hom: HomeComponent) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [this.username, [Validators.required, Validators.email]],
      password: [this.password, Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log(this.route.snapshot.queryParams['returnUrl']);
    if (this.auth.isLoggednIn()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  login() {
    this.isLoginSubmit = true;
    console.log(this.loginForm.value);
    if (!this.loginForm.invalid) {
      this.loginService.logIn(this.loginForm.value).subscribe(data => {

        // localStorage.setItem('currentUser', data.json().principal);
        const authorities = data.json().principal.authorities;
        localStorage.setItem('user', JSON.stringify(data.json().principal));
        localStorage.setItem('authorities', authorities);
        const roles = authorities.map(role => role.authority);
        console.log(roles);
        if (roles.indexOf(Constant.userRoles.ADMIN) > -1) {
          localStorage.setItem('role', Constant.userRoles.ADMIN);
        } else if (roles.indexOf(Constant.userRoles.CAMPUS_AMBASSADOR) > -1) {
          localStorage.setItem('role', Constant.userRoles.CAMPUS_AMBASSADOR);
        } else {
          localStorage.setItem('role', roles[0]);
        }
        localStorage.setItem('isAuthenticated', 'true');
        this.hom.isLoggedIn = true;
          this.router.navigate([this.returnUrl]);
      }, err => {
        if (err.status === 401) {
          this.invalidMessage = 'EmailId Or Password Is Incorrect';
        }
        // this.errorMessage="error :  Username or password is incorrect";
      });
    }
  }


}
