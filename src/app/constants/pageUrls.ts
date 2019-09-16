export class PageURL {

  // COMMON
  public static HOME_URL = ``;
  public static SIGNUP_URL = `signup`;
  public static LOGIN_URL = `login`;
  public static ACCESS_DENIED = `accessDenied`;
  public static SIDE_NAV_URL = `sideNav`;

  // ADMIN
  public static COLLEGE_REGISTRATION_URL = `registerCollege`;
  public static EDIT_COLLEGE_URL = `admin/college/edit/:id`;
  public static VIEW_COLLEGE_URL = `admin/college/view`;

  public static ASSIGN_ROLE_URL = `assignRole`;
  public static PENDING_REQUEST_URL = `pending-members`;

  public static CREATE_ACTIVITY_URL = `admin/activity/create`;
  public static VIEW_ACTIVITY_URL = `admin/activity/view`;
  public static EDIT_ACTIVITY_URL = `admin/activity/edit/:id`;

  // CAMPUS AMBASSADOR
  public static REQUEST_ACTIVITY_URL = `ca/activity/request`;
  public static VIEW_CA_ACTIVITY_URL = `ca/activity/view`;
  public static EDIT_CA_ACTIVITY_URL = `ca/activity/edit/:id`;
  public static CA_MARK_ATTENDANCE_URL = `ca/member/markAttendance/:activityId`;

  public static VIEW_CA_MEMBERS_URL = `ca/member/view`;

  // BOTH
  public static VIEW_MEMBERS_URL = `memberList`;
}
