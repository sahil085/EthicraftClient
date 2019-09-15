import {Component, OnInit} from '@angular/core';
import {Member} from '../../models/member';
import {MemberService} from '../../service/member.service';
import {AppComponent} from '../../app.component';

declare let $: any;

@Component({
  selector: 'app-pending-members',
  templateUrl: './pending-members.component.html',
  styleUrls: ['./pending-members.component.css']
})
export class PendingMembersComponent implements OnInit {


  membersList: Member[] = [];

  constructor(public memberService: MemberService, private appComponent: AppComponent) {
  }

  ngOnInit() {
    this.appComponent.loading = true;
    this.findAllPendingMembers();
    setTimeout(() => {
      $('#viewPendingMemberTable').DataTable({
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
    }, 1000);
  }

  findAllPendingMembers() {
    this.memberService.findAllPendingMembers().subscribe(
      (data) => {
        this.membersList = data;
        this.appComponent.loading = false;
      }
      ,
      err => {
        AppComponent.showToaster(err['error'].message ? err['error'].message : err['error'].text, 'error');
      }
    );
  }

  approveOrDeclineMember(member: Member, approveStatus: boolean) {
    this.memberService.approveOrDecline(member.id, approveStatus).subscribe((data) => {
        if (data.successMessage) {
          AppComponent.showToaster(data.successMessage, data.type);
          member.memberApproved = approveStatus;
        } else {
          AppComponent.showToaster(data.errorMessage, data.type);
        }
      },
      err => {
        AppComponent.showToaster(err['error'].message ? err['error'].message : err['error'].text, 'error');
      }
    );
  }

}
