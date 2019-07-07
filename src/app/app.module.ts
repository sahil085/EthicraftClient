import { BrowserModule } from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import {AuthService} from './service/auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import { HomeComponent } from './components/adminComponent/home/home.component';
import {AuthGuard} from './security/auth.guard';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SignupComponent } from './components/signup/signup.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule, MatOptionModule, MatSelect, MatSelectModule} from '@angular/material';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {CollegeRegistrationFormComponent} from './components/adminComponent/college-registration-form/college-registration-form.component';
import {KeysPipe} from './pipe/keys-pipe';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'registerCollege', component: CollegeRegistrationFormComponent},
];

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (localStorage.getItem('Authorization') == null) {
      console.log(localStorage.getItem('Authorization'));
      const xhr = req.clone({
        setHeaders: {
          'X-Requested-With' : 'XMLHttpRequest'
        }
      });
      return next.handle(xhr);
    } else {
      const xhr = req.clone({
        setHeaders: {
          'X-Requested-With' : 'XMLHttpRequest',
          'Authorization' : 'Basic ' + localStorage.getItem('Authorization')
        }
      });
      return next.handle(xhr);
    }
  }
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    KeysPipe,
    CollegeRegistrationFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule, MatButtonModule, MatCheckboxModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: XhrInterceptor,
    multi: true
  }, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
