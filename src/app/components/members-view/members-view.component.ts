import { Component, OnInit } from '@angular/core';
import {MemberService} from '../../service/member.service';
import {UserService} from '../../service/user.service';
import {Member} from '../../models/member';
import {College} from '../../models/college';

declare let $: any;

@Component({
  selector: 'app-members-view',
  templateUrl: './members-view.component.html',
  styleUrls: ['./members-view.component.css']
})
export class MembersViewComponent implements OnInit {

  memberList: Member[];
  member: Member;

  constructor(private memberService: MemberService) { }

  ngOnInit() {
    this.memberService.findAllMembers(UserService.getCurrentRole()).subscribe((data) => {
      this.memberList = data;
      console.log(`members: ${JSON.stringify(data)}`);
    });

    setTimeout(() => {
      $('#viewMemberTable').DataTable({
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

  viewMemberDetails(member: Member) {
    this.member = member;
    $('#memberDetailsModal').modal('show');
  }

}
