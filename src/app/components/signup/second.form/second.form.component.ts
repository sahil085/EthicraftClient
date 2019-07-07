import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-second-form',
  templateUrl: './second.form.component.html',
  styleUrls: ['./second.form.component.css']
})
export class SecondFormComponent implements OnInit {

  @Input() secondFormGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
