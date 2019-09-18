import {Component, OnInit, ViewChild} from '@angular/core';
import {Member} from '../../models/member';
import {MemberService} from '../../service/member.service';
import {AppComponent} from '../../app.component';
import {MatSort, MatTableDataSource} from '@angular/material';

declare let $: any;

@Component({
  selector: 'app-pending-members',
  templateUrl: './pending-members.component.html',
  styleUrls: ['./pending-members.component.css']
})
export class PendingMembersComponent implements OnInit {

  membersList: Member[] = [];
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['firstName', 'email', 'mobileNumber', 'college.collegeName', 'actions'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public memberService: MemberService,
    private appComponent: AppComponent
  ) {}

  ngOnInit() {
    this.findAllPendingMembers();
  }

  findAllPendingMembers() {
    this.appComponent.loading = true;
    this.memberService.findAllPendingMembers().subscribe(
      (data) => {
        this.membersList = data;
        this.dataSource = new MatTableDataSource(this.membersList);
        this.dataSource.sort = this.sort;
        this.appComponent.loading = false;
      }
      ,
      err => {
        AppComponent.showToaster(err['error'].message ? err['error'].message : err['error'].text, 'error');
      }
    );
  }

  approveOrDeclineMember(member: Member, approveStatus: boolean) {
    this.appComponent.loading = true;
    this.memberService.approveOrDecline(member.id, approveStatus).subscribe((data) => {
        this.appComponent.loading = false;
        if (data.successMessage) {
          AppComponent.showToaster(data.successMessage, data.type);
        } else {
          AppComponent.showToaster(data.errorMessage, data.type);
        }
        setTimeout(() => {
          this.findAllPendingMembers();
        }, 1000);
      },
      err => {
        AppComponent.showToaster(err['error'].message ? err['error'].message : err['error'].text, 'error');
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
