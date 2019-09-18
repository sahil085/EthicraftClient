import {Component, OnInit, ViewChild} from '@angular/core';
import {CollegeService} from '../../../service/college.service';
import {College} from '../../../models/college';
import {AppComponent} from '../../../app.component';
import {MatSort, MatTableDataSource} from '@angular/material';
import {PageURL} from '../../../constants/pageUrls';
import {Router} from '@angular/router';
import {ExcelService} from '../../../service/excel.service';

declare let $: any;

@Component({
  selector: 'app-view-college',
  templateUrl: './view-college.component.html',
  styleUrls: ['./view-college.component.css']
})
export class ViewCollegeComponent implements OnInit {

  collegeList: College[] = [];
  college: College;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['collegeName', 'collegeAbbreviation', 'address', 'city', 'actions'];
  PageURL = PageURL.EDIT_COLLEGE_URL.slice(0, -3);

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private collegeService: CollegeService,
    private appComponent: AppComponent,
    private router: Router,
    private excelService: ExcelService
  ) {}

  ngOnInit() {

    this.appComponent.loading = true;
    this.collegeService.findAllColleges().subscribe(data => {
      this.collegeList = data;
      this.appComponent.loading = false;
      this.dataSource = new MatTableDataSource(this.collegeList);
      this.dataSource.sort = this.sort;
    });
  }

  editDetails(id: string) {
    this.router.navigateByUrl(this.PageURL + id);
  }

  viewDetails(college: College) {
    this.college = college;
  $('#collegeReferDetailsModal').modal('show');
  }

  exportXlsx() {
    this.excelService.exportAsExcelFile(this.collegeList, 'CollegeList');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
