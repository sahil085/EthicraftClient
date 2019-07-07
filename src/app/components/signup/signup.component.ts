import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AddressModel} from '../../models/Address.model';

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
  mobileNumber: any = '';
  whatsappNumber: any = '';
  country: any = '';
  gender: any = '';
  college: any = '';
  courseName: any = '';
  batch: any = '';
  achievements: any = '';
  hobbies: any = '';
  skills: any = '';
  inspirationSource: any = '';
  profilePic: any = '';


  constructor(private router: Router, private route: ActivatedRoute, private _formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      email: [this.email, Validators.required],
      password: [this.password, Validators.required],
      confirm: [this.confirm, Validators.required],
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
        state: ['', Validators.required]
      }),
      presentAddress: this._formBuilder.group({
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required]
      }),
      country: [this.country, Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      courseName: [this.courseName, Validators.required],
      college: [this.college, Validators.required],
      batch: [this.batch, Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      achievements: [this.achievements],
      hobbies: [this.hobbies],
      skills: [this.skills],
      inspirationSource: [this.inspirationSource],
      profilePic: [this.profilePic]
    });


  }

  submitForm = () => {
    this.formData = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value,
      ...this.fourthFormGroup.value
    };
    console.log(this.formData);
    if (this.firstFormGroup.invalid) {
      this.firstFormGroup.get('email').markAsTouched();
      this.firstFormGroup.get('password').markAsTouched();
      return;
    }
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirm.value;

    return pass === confirmPass ? null : { notSame: true }
  }
}
