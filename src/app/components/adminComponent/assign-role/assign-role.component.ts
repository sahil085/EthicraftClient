import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {userRoles} from '../../../constants';

@Component({
  selector: 'app-assign-role',
  templateUrl: './assign-role.component.html',
  styleUrls: ['./assign-role.component.css']
})
export class AssignRoleComponent implements OnInit {

  username = new FormControl();
  userRole = new FormControl();
  colleges = new FormControl();
  options: string[] = ['ravi.garg@tothenew.com', 'sahil.verma@tothenew.com', 'vermasahil269@gmail.com'];
  roles = [
    userRoles.EEO,
    userRoles.CAMPUS_AMBASSADOR,
    userRoles.SUPER_ADMIN,
    userRoles.ADMIN,
    userRoles.MEMBER
  ];
  collegeList: string[] = ['ABES', 'AKGEC', 'IITD', 'KIET', 'NIT', 'RKGIT'];
  showCollogeSelect = false;
  filteredUsernames: Observable<string[]>;

  constructor() { }

  ngOnInit() {
    this.filteredUsernames = this.username.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  changeSelection = () => {
    this.showCollogeSelect = this.userRole.value === userRoles.EEO;
  }

  submitForm = () => {
    if (this.username.value && this.userRole.value) {
    console.log({
      username: this.username.value,
      role: this.userRole.value,
      colleges: this.colleges.value || []
    });
  }
}
