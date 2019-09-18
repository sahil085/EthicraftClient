import {Component, OnInit, ViewChild} from '@angular/core';
import {MemberService} from '../../service/member.service';
import {UserService} from '../../service/user.service';
import {Member} from '../../models/member';
import {College} from '../../models/college';
import {MatSort, MatTableDataSource} from '@angular/material';
import {ExcelService} from '../../service/excel.service';

declare let $: any;

@Component({
  selector: 'app-members-view',
  templateUrl: './members-view.component.html',
  styleUrls: ['./members-view.component.css']
})
export class MembersViewComponent implements OnInit {

  memberList: Member[];
  member: Member;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['firstName', 'presentAddress.address', 'college.collegeName', 'memberApproved', 'actions'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private memberService: MemberService,
    private excelService: ExcelService
  ) { }

  ngOnInit() {
    this.memberService.findAllMembers(UserService.getCurrentRole()).subscribe((data) => {
      this.memberList = data;
      this.dataSource = new MatTableDataSource(this.memberList);
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  exportXlsx() {
    this.excelService.exportAsExcelFile(this.memberList, 'MemberList');
  }

  viewMemberDetails(member: Member) {
    this.member = member;
    $('#memberDetailsModal').modal('show');
  }

}
