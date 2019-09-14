import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CollegeService} from '../../../service/college.service';
import Swal from 'sweetalert2';
import csc from 'country-state-city';
import {PageURL} from '../../../constants/pageUrls';


@Component({
  selector: 'app-college-registration-form',
  templateUrl: './college-registration-form.component.html',
  styleUrls: ['./college-registration-form.component.css']
})
export class CollegeRegistrationFormComponent implements OnInit {

  collegeFormGroup: FormGroup;
  stateList: any[] = [];
  cityList: any[] = [];
  loading: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private collegeService: CollegeService
  ) {
    this.loading = false;
  }

  ngOnInit() {
    this.collegeFormGroup = this._formBuilder.group({
      collegeName: ['', Validators.required],
      collegeAbbreviation: ['', Validators.required],
      universityName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      comments: [''],
      faculty: ['', Validators.required],
      referenceList: this._formBuilder.array([], Validators.required)
      // referencePersonName: ['', Validators.required],
      // referencePersonContact: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]]
    });

    this.stateList = csc.getStatesOfCountry('101');

  }

  onStateChange(event) {
    this.cityList = csc.getCitiesOfState('' + event.value);
  }

  submitForm = () => {
    this.loading = true;
    if (this.collegeFormGroup.valid) {
      this.collegeFormGroup.value.state = this.stateList[this.stateList.findIndex(
        (elem) => elem.id === this.collegeFormGroup.value.state)].name;
      this.collegeService.registerCollege(this.collegeFormGroup.value).subscribe(
        (data) => {
          if (data['errorMessage'] !== null) {
            this.showToaster(data['errorMessage'], 'error');
          } else {
            this.showToaster(data['successMessage'], 'success');
            setTimeout(() => {
              this.loading = false;
              this.router.navigate([PageURL.VIEW_COLLEGE_URL]);
            }, 2000);
          }
        }
        ,
        err => {
          if (err.status === 400) {
            this.showToaster('Validation failed', 'error');

          } else {
            this.showToaster(err['error'].message ? err['error'].message : err['error'].text, 'error');

          }
          this.loading = false;
        }
      );

    }
  }


  showToaster = (message, type) => {
    Swal({
      title: message,
      type: type,
      timer: 1500
    });
  }
}
