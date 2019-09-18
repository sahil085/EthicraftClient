import {BrowserModule} from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {SideNavComponent} from './components/side-nav/side-nav.component';
import {AuthService} from './service/auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/adminComponent/home/home.component';
import {AuthGuard} from './security/auth.guard';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SignupComponent} from './components/signup/signup.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule, MatPaginatorModule,
  MatSelectModule, MatSortModule,
  MatTableModule
} from '@angular/material';
import {CollegeRegistrationFormComponent} from './components/adminComponent/college-registration-form/college-registration-form.component';
import {FirstFormComponent} from './components/signup/first.form/first.form.component';
import {SecondFormComponent} from './components/signup/second.form/second.form.component';
import {ThirdFormComponent} from './components/signup/third.form/third.form.component';
import {FourthFormComponent} from './components/signup/fourth.form/fourth.form.component';
import {MatCardModule} from '@angular/material/card';
import {AssignRoleComponent} from './components/adminComponent/assign-role/assign-role.component';
import {CreateActivityComponent} from './components/adminComponent/create-activity/create-activity.component';
import {EditActivityComponent} from './components/adminComponent/edit-activity/edit-activity.component';
import {ViewActivityComponent} from './components/adminComponent/view-activity/view-activity.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {RequestActivityComponent} from './components/CAComponent/request-activity/request-activity.component';
import {ViewCAActivityComponent} from './components/CAComponent/view-activity/view-c-a-activity.component';
import {EditCAActivityComponent} from './components/CAComponent/edit-caactivity/edit-caactivity.component';
import {ViewCAMembersComponent} from './components/CAComponent/view-camembers/view-camembers.component';
import {MemberAttendanceCAComponent} from './components/CAComponent/member-attendance-ca/member-attendance-ca.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {EditCollegeComponent} from './components/adminComponent/edit-college/edit-college.component';
import {ViewCollegeComponent} from './components/adminComponent/view-college/view-college.component';
import {KeysPipe} from './pipe/keys-pipe';
import {PendingMembersComponent} from './components/pending-members/pending-members.component';
import {AccessDeniedComponent} from './access-denied/access-denied.component';
import {DashboardComponent} from './dashboard-component/dashboard.component';
import {NgxLoadingModule} from 'ngx-loading';
import {MembersViewComponent} from './components/members-view/members-view.component';
import {appRoutes} from './app.routing';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (localStorage.getItem('Authorization') == null) {
      console.log(localStorage.getItem('Authorization'));
      const xhr = req.clone({
        setHeaders: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      return next.handle(xhr);
    } else {
      const xhr = req.clone({
        setHeaders: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': 'Basic ' + localStorage.getItem('Authorization')
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
    CollegeRegistrationFormComponent,
    FirstFormComponent,
    SecondFormComponent,
    ThirdFormComponent,
    FourthFormComponent,
    FirstFormComponent,
    AssignRoleComponent,
    CreateActivityComponent,
    EditActivityComponent,
    ViewActivityComponent,
    ViewCAActivityComponent,
    RequestActivityComponent,
    EditCAActivityComponent,
    ViewCAMembersComponent,
    MemberAttendanceCAComponent,
    EditCollegeComponent,
    ViewCollegeComponent,
    KeysPipe,
    PendingMembersComponent,
    AccessDeniedComponent,
    DashboardComponent,
    MembersViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatAutocompleteModule,
    MatSelectModule,
    NgxLoadingModule.forRoot({}),
    RouterModule.forRoot(appRoutes),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [RouterModule, MatButtonModule, MatCheckboxModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: XhrInterceptor,
    multi: true
  }, {provide: LocationStrategy, useClass: HashLocationStrategy}, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
