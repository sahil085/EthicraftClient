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
import {PendingMemberRequestComponent} from './components/adminComponent/pending-member-request/pending-member-request.component';
import {MembersViewComponent} from './components/members-view/members-view.component';

export const appRoutes: Routes = [
  {
    path: PageURL.HOME_URL,
    component: HomeComponent
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
    path: PageURL.COLLEGE_REGISTRATION_URL,
    component: CollegeRegistrationFormComponent
  },
  {
    path: PageURL.ASSIGN_ROLE_URL,
    component: AssignRoleComponent
  },
  {
    path: PageURL.CREATE_ACTIVITY_URL,
    component: CreateActivityComponent
  },
  {
    path: PageURL.VIEW_ACTIVITY_URL,
    component: ViewActivityComponent
  },
  {
    path: PageURL.EDIT_ACTIVITY_URL,
    component: EditActivityComponent
  },
  {
    path: PageURL.REQUEST_ACTIVITY_URL,
    component: RequestActivityComponent
  },
  {
    path: PageURL.VIEW_CA_ACTIVITY_URL,
    component: ViewCAActivityComponent
  },
  {
    path: PageURL.EDIT_CA_ACTIVITY_URL,
    component: EditCAActivityComponent
  },
  {
    path: PageURL.VIEW_CA_MEMBERS_URL,
    component: ViewCAMembersComponent
  },
  {
    path: PageURL.CA_MARK_ATTENDANCE_URL,
    component: MemberAttendanceCAComponent
  },
  {
    path: PageURL.EDIT_COLLEGE_URL,
    component: EditCollegeComponent
  },
  {
    path: PageURL.VIEW_COLLEGE_URL,
    component: ViewCollegeComponent
  },
  {
    path: PageURL.PENDING_REQUEST_URL,
    component: PendingMemberRequestComponent
  },
  {
    path: PageURL.VIEW_MEMBERS_URL,
    component: MembersViewComponent
  }
];
