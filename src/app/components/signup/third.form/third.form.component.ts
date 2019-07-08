import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {KeyValue} from '@angular/common';

@Component({
  selector: 'app-third-form',
  templateUrl: './third.form.component.html',
  styleUrls: ['./third.form.component.css']
})
export class ThirdFormComponent implements OnInit {

  @Input() thirdFormGroup: FormGroup;
  @Input() collegeList: any ;

  constructor() { }

  ngOnInit() {
  }

  keyComparator(a: KeyValue<number, String>, b: KeyValue<number, String>) {
    return 0;
  }

}
