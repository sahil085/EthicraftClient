import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {AppComponent} from '../../../app.component';
import {AssignRoleService} from '../../../service/assign-role.service';
import {map, startWith} from 'rxjs/operators';
import {Constant} from '../../../constants/constant';
import {CollegeService} from '../../../service/college.service';
import {College} from '../../../models/college';
import {UserRoleCollegeMappingDTO} from '../../../models/UserRoleCollegeMappingDTO';
import swal from 'sweetalert2';
import {UserRoleCollegeMapping} from '../../../models/UserRoleCollegeMapping';

declare let $: any;

@Component({
  selector: 'app-assign-role',
  templateUrl: './assign-role.component.html',
  styleUrls: ['./assign-role.component.css']
})
export class AssignRoleComponent implements OnInit {

  username = new FormControl('', [Validators.required, Validators.email]);
  userRole = new FormControl('', Validators.required);
  colleges = new FormControl();
  updateColleges: any = [];
  emails: String[] = [];
  roles: String[] = [];
  roleCA = 'CAMPUS AMBASSADOR';
  showCollegeSelect = false;
  collegeList: College[] = [];
  filteredUsername: Observable<String[]>;
  userRoleCollegeMappingList: UserRoleCollegeMappingDTO[] = [];
  userRoleCollegeMapping: UserRoleCollegeMapping;
  selectedCars = [3];
  cars = [
    {id: 1, name: 'Volvo'},
    {id: 2, name: 'Saab', disabled: true},
    {id: 3, name: 'Opel'},
    {id: 4, name: 'Audi'},
  ];

  constructor(private roleService: AssignRoleService, private collegeService: CollegeService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.createDataTable();
    }, 1000);


    this.filteredUsername = this.username.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.fetchAllEmails();
    this.fetchAllRoles();
    this.fetchActiveCollege();
    this.findAllUserRole();
  }

  createDataTable() {
    $('#viewUserRoleTable').DataTable({
      dom: '<\'row\'<\'col-sm-2\'l><\'col-sm-5\'B><\'col-sm-5\'f>>' +
        '<\'row\'<\'col-sm-12\'tr>>' +
        '<\'row\'<\'col-sm-5\'i><\'col-sm-7\'p>>',
      lengthMenu: [
        [10, 25, 50, -1],
        ['10', '25', '50', 'Show all']
      ],

      buttons: [
        {
          extend: 'excel',
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5]
          }
        }
      ]
    });


  }

  fetchActiveCollege = () => {
    this.collegeService.findCollegeDropDown().subscribe(
      data => {
        console.log(this.collegeList);
        this.collegeList = data;
        console.log(this.collegeList);
      }
    );
  };

  fetchAllEmails() {
    this.roleService.getAllEmails().subscribe(data => {
      this.emails = data;
    });
  }

  fetchAllRoles() {
    this.roleService.getAllRoles().subscribe(data => {
      this.roles = data;
    });
  }

  private _filter(value: String): String[] {
    const filterValue = value.toLowerCase();
    return this.emails.filter(option => option.toLowerCase().includes(filterValue));
  }

  changeSelection = () => {
    this.showCollegeSelect = this.userRole.value === Constant.userRoles.EEO;
  };

  submitForm = () => {
    if (this.username.value && this.userRole.value) {
      const userRoleCO = {
        username: this.username.value,
        role: this.userRole.value,
        colleges: this.colleges.value || []
      };
      this.roleService.assignRole(userRoleCO).subscribe(data => {
        if (data.successMessage !== null) {
          AppComponent.showToaster(data.successMessage, data.type);
          this.findAllUserRole();
        } else {
          AppComponent.showToaster(data.errorMessage, data.type);
        }

      });
    }
  };

  update() {
    if (this.updateColleges.length >  0 ) {
      const userRoleCO = {
        id: this.userRoleCollegeMapping.id,
        username: this.userRoleCollegeMapping.user.email,
        role: this.userRoleCollegeMapping.role.role,
        colleges: this.updateColleges || []
      };
      this.roleService.updateUserRoleCollegeMapping(userRoleCO).subscribe(data => {
        $('#myModal').modal('hide');
        if (data.successMessage !== null) {
          AppComponent.showToaster(data.successMessage, data.type);
          this.findAllUserRole();
        } else {
          AppComponent.showToaster(data.errorMessage, data.type);
        }

      });
    }

  }


  findAllUserRole = () => {
    this.roleService.findAllUserRole().subscribe(data => {
      this.userRoleCollegeMappingList = data;
    });
  };

  deleteUserRole = (id) => {

    swal({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete the user role ?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.roleService.deleteUserRole(id).subscribe(data => {
          if (data.successMessage !== null) {
            AppComponent.showToaster(data.successMessage, data.type);
          } else {
            AppComponent.showToaster(data.errorMessage, data.type);
          }
          this.findAllUserRole();
        });
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal(
          'Cancelled',
          'Operation canceled)',
          'error'
        );
      }
    });

  };


  editUserRoleMapping(id) {

    this.roleService.findUserRoleById(id).subscribe(data => {
      this.userRoleCollegeMapping = data;
      this.updateColleges = this.userRoleCollegeMapping.collegeList.map(data1 => data1.id);
      setTimeout(() => {
        $('#myModal').modal('show');
      }, 200);
    });
  }
}
