import {College} from './college';
import {AddressModel} from './Address.model';

export class Member {

  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  mobileNumber: number;
  college: College;
  memberApproved: boolean;
  achievements: string;
  batch: string;
  courseName: string;
  email: string;
  gender: string;
  hobbies: string;
  inspirationSource: string;
  membershipId: string;
  permanentAddress: AddressModel;
  presentAddress: AddressModel;
  profilePic: string;
  skills: string;
  whatsappNumber: number;
}

