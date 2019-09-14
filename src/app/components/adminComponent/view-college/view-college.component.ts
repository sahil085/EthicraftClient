import { Component, OnInit } from '@angular/core';
import {CollegeService} from '../../../service/college.service';
import {College} from '../../../models/college';
declare let $: any;

@Component({
  selector: 'app-view-college',
  templateUrl: './view-college.component.html',
  styleUrls: ['./view-college.component.css']
})
export class ViewCollegeComponent implements OnInit {

  collegeList: College[] = [];

  constructor(private collegeService: CollegeService) { }

  ngOnInit() {
    this.collegeService.findAllColleges().subscribe(data => {
      this.collegeList = data;
    });
    $('#viewCollegeTable').DataTable({
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

}
