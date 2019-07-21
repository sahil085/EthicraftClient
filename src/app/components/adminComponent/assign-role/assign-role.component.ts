import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {userRoles} from '../../../constants';
import Swal from 'sweetalert2';
import {AppComponent} from '../../../app.component';

@Component({
  selector: 'app-assign-role',
  templateUrl: './assign-role.component.html',
  styleUrls: ['./assign-role.component.css']
})
export class AssignRoleComponent implements OnInit {

  username = new FormControl('', [Validators.required, Validators.email]);
  userRole = new FormControl('', Validators.required);
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

  constructor() {
  }

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
    if (this.username.value && this.userRole.value && this.userRole.value !== userRoles.EEO) {
      console.log({
        username: this.username.value,
        role: this.userRole.value,
        colleges: this.colleges.value || []
      });
      AppComponent.showToaster('User Role assigned successfully', 'success');
    } else if (this.userRole.value === userRoles.EEO && this.colleges.value && this.colleges.value[0]) {
      AppComponent.showToaster('User Role assigned successfully', 'success');
    } else {
      AppComponent.showToaster('Please assign colleges under EEO', 'error');
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
