import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {AddressModel} from '../../models/Address.model';
import {SignupService} from '../../service/signup.service';
import {CollegeService} from '../../service/college.service';
import Swal from 'sweetalert2';
import csc from 'country-state-city';
import {CustomValidators} from '../../Validators';
import {ErrorStateMatcher} from '@angular/material';
import {AppComponent} from '../../app.component';
import {College} from '../../models/college';
import {PageURL} from '../../constants/pageUrls';

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
  collegeList: College[] = [];


  constructor(private router: Router, private route: ActivatedRoute,
              private signUpService: SignupService, private collegeService: CollegeService,
              private _formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      email: [this.email, [Validators.required, Validators.email]],
      password: [this.password, [Validators.required]],
      confirm: [this.confirm, Validators.required ],
      firstName: [this.firstName, Validators.required],
      middleName: [this.middleName],
      lastName: [this.lastName, Validators.required],
      gender: [this.gender, Validators.required],
    }, {validator: CustomValidators.checkPasswords });
    this.secondFormGroup = this._formBuilder.group({
      mobileNumber: [this.mobileNumber, [
        Validators.required,
        Validators.pattern('[6-9]\\d{9}')
      ]],
      whatsappNumber: [this.whatsappNumber, [
        Validators.pattern('[6-9]\\d{9}')
      ]],
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

  fetchActiveCollege = () => {
  this.collegeService.findCollegeDropDown().subscribe(
    data => {
      this.collegeList = data;
    }
  );
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
      this.formData.collegeId = this.formData.collegeId * 1;
      const permanentStateId = this.formData.permanentAddress.state;
      const presentStateId = this.formData.presentAddress.state;
      this.formData.permanentAddress.state = csc.getStateById(permanentStateId).name;
      this.formData.presentAddress.state = csc.getStateById(presentStateId).name;
      this.signUpService.signUp(this.formData).subscribe(
        (data) => {
          if (data['errorMessage'] !== null) {
            AppComponent.showToaster(data['errorMessage'], 'error');
            this.router.navigateByUrl(PageURL.SIGNUP_URL);
          } else {
            AppComponent.showToaster(data['successMessage'], 'success');
            this.router.navigateByUrl(PageURL.HOME_URL);
          }
        },
        err => {
          if (err.status) {
            AppComponent.showToaster('Validation failed', 'error');
            this.router.navigateByUrl(PageURL.SIGNUP_URL);
          } else {
            AppComponent.showToaster(err['error'].message ? err['error'].message : err['error'].text, 'error');
            this.router.navigateByUrl(PageURL.SIGNUP_URL);
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
}
