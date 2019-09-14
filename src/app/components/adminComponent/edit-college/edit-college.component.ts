import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CollegeService} from '../../../service/college.service';
import {ActivatedRoute, Router} from '@angular/router';
import {College} from '../../../models/college';
import csc from 'country-state-city';
import {AppComponent} from '../../../app.component';

@Component({
  selector: 'app-edit-college',
  templateUrl: './edit-college.component.html',
  styleUrls: ['./edit-college.component.css']
})
export class EditCollegeComponent implements OnInit {

  collegeFormGroup: FormGroup;
  collegeId: string;
  loading = false;
  stateList: any[] = [];
  cityList: any[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private collegeService: CollegeService,
    private activatedRoute: ActivatedRoute
  ) {
    this.stateList = csc.getStatesOfCountry('101');
    this.collegeId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  onStateChange(event) {
    const stateId = this.stateList[this.stateList.findIndex((state) => state.name === event.value)].id;
    this.cityList = csc.getCitiesOfState('' + stateId);
    this.collegeFormGroup.get('city').setValue('');
  }

  ngOnInit() {
    this.collegeService.findCollegeById(this.collegeId).subscribe((data: College) => {
      this.collegeFormGroup.get('collegeName').setValue(data.collegeName);
      this.collegeFormGroup.get('collegeAbbreviation').setValue(data.collegeAbbreviation);
      this.collegeFormGroup.get('universityName').setValue(data.universityName);
      this.collegeFormGroup.get('address').setValue(data.address);
      this.collegeFormGroup.get('comments').setValue(data.comments);
      this.collegeFormGroup.get('faculty').setValue(data.faculty);
      this.collegeFormGroup.get('referencePersonName').setValue(data.referencePersonName);
      this.collegeFormGroup.get('referencePersonContact').setValue(data.referencePersonContact);
      this.collegeFormGroup.get('state').setValue(data.state);
      this.collegeFormGroup.get('city').setValue(data.city);
      const stateId = this.stateList[this.stateList.findIndex((state) => state.name === data.state)].id;
      this.cityList = csc.getCitiesOfState('' + stateId);
    });

    this.collegeFormGroup = this.formBuilder.group({
      collegeName: ['', Validators.required],
      collegeAbbreviation: ['', Validators.required],
      universityName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      comments: [''],
      faculty: ['', Validators.required],
      referencePersonName: ['', Validators.required],
      referencePersonContact: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]]
    });
  }

  submitForm() {
    if (this.collegeFormGroup.valid) {
      this.loading = true;
      this.collegeService.updateCollegeInfo(this.collegeId, this.collegeFormGroup.value).subscribe((data) => {
          if (data['errorMessage'] !== null) {
            AppComponent.showToaster(data['errorMessage'], 'error');
          } else {
            AppComponent.showToaster(data['successMessage'], 'success');
            setTimeout(() => {
              this.loading = false;
              this.router.navigate(['/admin/college/view']);
            }, 2000);
          }
        }, err => {
          if (err.status === 400) {
            AppComponent.showToaster('Validation failed', 'error');

          } else {
            AppComponent.showToaster(err['error'].message ? err['error'].message : err['error'].text, 'error');

          }
          this.loading = false;
        }
      );
    }
  }

}
