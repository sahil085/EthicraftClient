import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {College} from '../../../models/college';

@Component({
  selector: 'app-third-form',
  templateUrl: './third.form.component.html',
  styleUrls: ['./third.form.component.css']
})
export class ThirdFormComponent implements OnInit {

  @Input() thirdFormGroup: FormGroup;
  @Input() collegeList: College[] = [];
  newCollegeEntry: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  setOtherCollege(value) {
    this.newCollegeEntry = value === 'College Name and City';
  }

}
