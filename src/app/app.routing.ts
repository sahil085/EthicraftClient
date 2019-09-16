import {Routes} from '@angular/router';
import {HomeComponent} from './components/adminComponent/home/home.component';
import {PageURL} from './constants/pageUrls';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {CollegeRegistrationFormComponent} from './components/adminComponent/college-registration-form/college-registration-form.component';
import {AssignRoleComponent} from './components/adminComponent/assign-role/assign-role.component';
import {CreateActivityComponent} from './components/adminComponent/create-activity/create-activity.component';
import {ViewActivityComponent} from './components/adminComponent/view-activity/view-activity.component';
import {EditActivityComponent} from './components/adminComponent/edit-activity/edit-activity.component';
import {RequestActivityComponent} from './components/CAComponent/request-activity/request-activity.component';
import {ViewCAActivityComponent} from './components/CAComponent/view-activity/view-c-a-activity.component';
import {EditCAActivityComponent} from './components/CAComponent/edit-caactivity/edit-caactivity.component';
import {ViewCAMembersComponent} from './components/CAComponent/view-camembers/view-camembers.component';
import {MemberAttendanceCAComponent} from './components/CAComponent/member-attendance-ca/member-attendance-ca.component';
import {EditCollegeComponent} from './components/adminComponent/edit-college/edit-college.component';
import {ViewCollegeComponent} from './components/adminComponent/view-college/view-college.component';
import {MembersViewComponent} from './components/members-view/members-view.component';
import {AuthGuard} from './security/auth.guard';
import {Constant} from './constants/constant';
import {SideNavComponent} from './components/side-nav/side-nav.component';
import {AccessDeniedComponent} from './access-denied/access-denied.component';
import {PendingMembersComponent} from './components/pending-members/pending-members.component';

export const appRoutes: Routes = [
  {
    path: PageURL.HOME_URL,
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      roles: Constant.getAllRoles()
    }
  },
  {
    path: PageURL.LOGIN_URL,
    component: LoginComponent
  },
  {
    path: PageURL.SIGNUP_URL,
    component: SignupComponent
  },
  {
    path: PageURL.SIDE_NAV_URL,
    component: SideNavComponent
  },
  {
    path: PageURL.ACCESS_DENIED,
    component: AccessDeniedComponent
  },
  {
    path: PageURL.COLLEGE_REGISTRATION_URL,
    component: CollegeRegistrationFormComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Constant.userRoles.ADMIN]
    }
  },
  {
    path: PageURL.ASSIGN_ROLE_URL,
    component: AssignRoleComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Constant.userRoles.ADMIN]
    }
  },
  {
    path: PageURL.CREATE_ACTIVITY_URL,
    component: CreateActivityComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Constant.userRoles.ADMIN]
    }
  },
  {
    path: PageURL.VIEW_ACTIVITY_URL,
    component: ViewActivityComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Constant.userRoles.ADMIN]
    }
  },
  {
    path: PageURL.EDIT_ACTIVITY_URL,
    component: EditActivityComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Constant.userRoles.ADMIN]
    }
  },
  {
    path: PageURL.REQUEST_ACTIVITY_URL,
    component: RequestActivityComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Constant.userRoles.CAMPUS_AMBASSADOR]
    }
  },
  {
    path: PageURL.VIEW_CA_ACTIVITY_URL,
    component: ViewCAActivityComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Constant.userRoles.CAMPUS_AMBASSADOR]
    }
  },
  {
    path: PageURL.EDIT_CA_ACTIVITY_URL,
    component: EditCAActivityComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Constant.userRoles.CAMPUS_AMBASSADOR]
    }
  },
  {
    path: PageURL.VIEW_CA_MEMBERS_URL,
    component: ViewCAMembersComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Constant.userRoles.CAMPUS_AMBASSADOR]
    }
  },
  {
    path: PageURL.CA_MARK_ATTENDANCE_URL,
    component: MemberAttendanceCAComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Constant.userRoles.CAMPUS_AMBASSADOR]
    }
  },
  {
    path: PageURL.EDIT_COLLEGE_URL,
    component: EditCollegeComponent,
    canActivate: [AuthGuard], data: {
      roles: [Constant.userRoles.ADMIN]
    }
  },
  {
    path: PageURL.VIEW_COLLEGE_URL,
    component: ViewCollegeComponent,
    canActivate: [AuthGuard], data: {
      roles: [Constant.userRoles.ADMIN]
    }
  },
  {
    path: PageURL.PENDING_REQUEST_URL,
    component: PendingMembersComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Constant.userRoles.ADMIN, Constant.userRoles.CAMPUS_AMBASSADOR]
    }
  },
  {
    path: PageURL.VIEW_MEMBERS_URL,
    component: MembersViewComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Constant.userRoles.ADMIN, Constant.userRoles.CAMPUS_AMBASSADOR]
    }
  }
];
