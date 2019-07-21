import { Component, OnInit } from '@angular/core';
import {Activity} from '../../../models/activity';
import {ActivityService} from '../../../service/admin/activity.service';
import {AppComponent} from '../../../app.component';
declare let $: any;

@Component({
  selector: 'app-view-activity',
  templateUrl: './view-c-a-activity.component.html',
  styleUrls: ['./view-c-a-activity.component.css']
})
export class ViewCAActivityComponent implements OnInit {

  activityList: Activity[];

  constructor( public activityService: ActivityService) { }

  ngOnInit() {
    $('#viewActivityTable').DataTable({
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

  findAllCAActivities() {
    this.activityService.findAllCAActivity().subscribe(
      (data) => {
        this.activityList = data;
      }
      ,
      err => {
        AppComponent.showToaster(err['error'].message ? err['error'].message : err['error'].text, 'error');
      }
    );
  }


}
