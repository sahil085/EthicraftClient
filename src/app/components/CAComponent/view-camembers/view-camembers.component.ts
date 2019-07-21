import { Component, OnInit } from '@angular/core';
import {MemberService} from '../../../service/member.service';
import {Member} from '../../../models/member';
import {AppComponent} from '../../../app.component';
declare let $: any;

@Component({
  selector: 'app-view-camembers',
  templateUrl: './view-camembers.component.html',
  styleUrls: ['./view-camembers.component.css']
})
export class ViewCAMembersComponent implements OnInit {

  membersList: Member[];

  constructor(public memberService: MemberService) { }

  ngOnInit() {
    $('#viewMemberTable').DataTable({
      dom: '<\'row\'<\'col-sm-2\'l><\'col-sm-5\'B><\'col-sm-5\'f>>' +
        '<\'row\'<\'col-sm-12\'tr>>' +
        '<\'row\'<\'col-sm-5\'i><\'col-sm-7\'p>>',
      lengthMenu: [
        [ 10, 25, 50, -1 ],
        [ '10', '25', '50', 'Show all' ]
      ],

      buttons: [
        {
          extend: 'excel',
          exportOptions: {
            columns: [ 0, 1, 2, 3, 4, 5 ]
          }
        }
      ]
    });
  }

  findAllMembersOfCA() {
    this.memberService.findAllMembersOfCA().subscribe(
      (data) => {
        this.membersList = data;
      }
      ,
      err => {
        AppComponent.showToaster(err['error'].message ? err['error'].message : err['error'].text, 'error');
      }
    );
  }

}
