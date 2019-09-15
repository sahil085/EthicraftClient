import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  referenceList: FormArray;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private collegeService: CollegeService
  ) {
    this.loading = false;
  }

  ngOnInit() {
    this.collegeFormGroup = this.formBuilder.group({
      collegeName: ['', Validators.required],
      collegeAbbreviation: ['', Validators.required],
      universityName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      comments: [''],
      faculty: ['', Validators.required],
      referenceList: this.formBuilder.array([this.createItem()], Validators.required)
    });

    this.stateList = csc.getStatesOfCountry('101');
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      designation: ['', Validators.required],
      contact: ['', Validators.required]
    });
  }

  get formArr() {
    return this.collegeFormGroup.get('referenceList') as FormArray;
  }

  addItem(): void {
    this.formArr.push(this.createItem());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
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
