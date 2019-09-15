import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CollegeService} from '../../../service/college.service';
import {ActivatedRoute, Router} from '@angular/router';
import {College} from '../../../models/college';
import csc from 'country-state-city';
import {AppComponent} from '../../../app.component';
import {PageURL} from '../../../constants/pageUrls';

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
    this.collegeFormGroup = this.formBuilder.group({
      collegeName: ['', Validators.required],
      collegeAbbreviation: ['', Validators.required],
      universityName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      comments: [''],
      faculty: ['', Validators.required],
      referenceList: this.formBuilder.array([], Validators.required)
    });

    this.collegeService.findCollegeById(this.collegeId).subscribe((data: College) => {
      this.collegeFormGroup.get('collegeName').setValue(data.collegeName);
      this.collegeFormGroup.get('collegeAbbreviation').setValue(data.collegeAbbreviation);
      this.collegeFormGroup.get('universityName').setValue(data.universityName);
      this.collegeFormGroup.get('address').setValue(data.address);
      this.collegeFormGroup.get('comments').setValue(data.comments);
      this.collegeFormGroup.get('faculty').setValue(data.faculty);
      this.collegeFormGroup.get('state').setValue(data.state);
      this.collegeFormGroup.get('city').setValue(data.city);
      this.populatedReferDetails(data);
      this.collegeFormGroup.get('referenceList').setValue(data.referenceList);

      const stateId = this.stateList[this.stateList.findIndex((state) => state.name === data.state)].id;
      this.cityList = csc.getCitiesOfState('' + stateId);
    });


  }

  populatedReferDetails(data: College) {
    data.referenceList.forEach(() => {
      const categorySelectionArray = this.collegeFormGroup.get('referenceList') as FormArray;
      categorySelectionArray.push(this.createItem());
    });
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
              this.router.navigate([PageURL.VIEW_COLLEGE_URL]);
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
