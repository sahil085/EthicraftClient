export class Constant {


  public static userRoles = {

    EEO: 'EEO',
    SUPER_ADMIN: 'SUPER ADMIN',
    CAMPUS_AMBASSADOR: 'CAMPUS AMBASSADOR',
    ADMIN: 'ADMIN',
    USER: 'USER',
    MEMBER: 'MEMBER'
  };

  public static getAllRoles(): string[] {
    return [this.userRoles.ADMIN, this.userRoles.CAMPUS_AMBASSADOR, this.userRoles.EEO, this.userRoles.MEMBER, this.userRoles.SUPER_ADMIN, this.userRoles.ADMIN];
  }

  public static DUMMY_MALE_PROFILE_IMG = 'https://res.cloudinary.com/dnuq1lgqs/image/upload/v1568371336/man_w6qb09.jpg';

}
