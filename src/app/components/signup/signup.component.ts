import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AddressModel} from '../../models/Address.model';
import {SignupService} from '../../service/signup.service';
import {CollegeService} from '../../service/college.service';
import Swal from 'sweetalert2';
import csc from 'country-state-city';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formData: any = [];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  email: any = '';
  password: any = '';
  confirm: any = '';
  firstName: any = '';
  middleName: any = '';
  lastName: any = '';
  mobileNumber: number ;
  whatsappNumber: number ;
  country: any = '';
  gender: any = '';
  collegeId: any = '';
  courseName: any = '';
  batch: any = '';
  achievements: any = '';
  hobbies: any = '';
  skills: any = '';
  inspirationSource: any = '';
  profilePic: any = '';
  collegeList: any = [];


  constructor(private router: Router, private route: ActivatedRoute,
              private signUpService: SignupService, private collegeService: CollegeService,
              private _formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      email: [this.email, [Validators.required, Validators.email]],
      password: [this.password, Validators.required],
      confirm: [this.confirm, {validator: this.checkPasswords} ],
      firstName: [this.firstName, Validators.required],
      middleName: [this.middleName],
      lastName: [this.lastName, Validators.required],
      gender: [this.gender, Validators.required],
    }, {validator: this.checkPasswords });
    this.secondFormGroup = this._formBuilder.group({
      mobileNumber: [this.mobileNumber, Validators.required],
      whatsappNumber: [this.whatsappNumber],
      permanentAddress: this._formBuilder.group({
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: [this.country, Validators.required]
      }),
      presentAddress: this._formBuilder.group({
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: [this.country, Validators.required]
      }),
    });
    this.thirdFormGroup = this._formBuilder.group({
      courseName: [this.courseName, Validators.required],
      collegeId: [this.collegeId, Validators.required],
      batch: [this.batch, Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      achievements: [this.achievements],
      hobbies: [this.hobbies],
      skills: [this.skills],
      inspirationSource: [this.inspirationSource],
      profilePic: [this.profilePic]
    });

  this.fetchActiveCollege();
  }

  fetchActiveCollege() {
  this.collegeList = this.collegeService.findCollegeDropDown().subscribe(
    data => {
      this.collegeList = data;
    }
  );
  console.log(this.collegeList);
  }



  submitForm = () => {
    if (this.firstFormGroup.invalid || this.secondFormGroup.invalid || this.thirdFormGroup.invalid || this.fourthFormGroup.invalid) {

    } else {
      this.formData = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
        ...this.thirdFormGroup.value,
        ...this.fourthFormGroup.value
      };
      console.log(this.formData);
      this.formData.collegeId = this.formData.collegeId * 1;
      const permanentStateId = this.formData.permanentAddress.state;
      const presentStateId = this.formData.presentAddress.state;
      this.formData.permanentAddress.state = csc.getStateById(permanentStateId).name;
      this.formData.presentAddress.state = csc.getStateById(presentStateId).name;
      console.log(this.formData);
      this.signUpService.signUp(this.formData).subscribe(
        (data) => {
          if (data['errorMessage'] !== null) {
            this.showToaster(data['errorMessage'], 'error');
          } else {
            this.showToaster(data['successMessage'], 'success');
          }
        },
        err => {
          if (err.status) {
            this.showToaster('Validation failed', 'error');

          } else {
            this.showToaster(err['error'].message ? err['error'].message : err['error'].text, 'error');

          }
        }
      );
    }


    if (this.firstFormGroup.invalid) {
      this.firstFormGroup.get('email').markAsTouched();
      this.firstFormGroup.get('password').markAsTouched();
      return;
    }

  }

  showToaster(message, type) {
    Swal({
      title: message,
      type: type,
      timer: 1500
    });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirm.value;
    console.log(pass + ' -- ' + confirmPass);
    console.log(pass === confirmPass ? null : { notSame: true });
    return pass === confirmPass ? null : { notSame: true };
  }
}
