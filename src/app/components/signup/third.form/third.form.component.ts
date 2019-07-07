import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-third-form',
  templateUrl: './third.form.component.html',
  styleUrls: ['./third.form.component.css']
})
export class ThirdFormComponent implements OnInit {

  @Input() thirdFormGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
