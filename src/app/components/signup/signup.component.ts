import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  firstCtrl: any = '';
  secondCtrl: any = '';

  constructor(private router: Router, private route: ActivatedRoute, private _formBuilder: FormBuilder) {

  }

  ngOnInit() {
    const that = this;
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [this.firstCtrl, Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: [this.secondCtrl, Validators.required]
    });

    // this.signupForm = new FormGroup({
    //   email: new FormControl(),
    //   password: new FormControl(),
    //   confirm: new FormControl(),
    //   firstName: new FormControl(),
    //   surname: new FormControl(),
    //   contact: new FormControl(),
    //   whatsapp: new FormControl(),
    //   address: new FormControl(),
    //   city: new FormControl(),
    //   state: new FormControl(),
    //   country: new FormControl(),
    //   gender: new FormControl(),
    //   college: new FormControl(),
    //   course: new FormControl(),
    //   year: new FormControl(),
    //   achievements: new FormControl(),
    //   hobbies: new FormControl(),
    //   skills: new FormControl()
    // });


  }

  submitForm = () => {
    if (this.signupForm.invalid) {
      console.log('hello', this.signupForm.value);
      this.signupForm.get('email').markAsTouched();
      this.signupForm.get('password').markAsTouched();
      return;
    } else {
      console.log(this.signupForm.value);
    }
  }
}
