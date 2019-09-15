import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';

declare let $: any;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, AfterViewChecked {

  constructor() {
  }

  currentRole: string;

  ngOnInit() {
    this.currentRole = UserService.getCurrentRole();
  }


  ngAfterViewChecked(): void {
    $(window).bind('load', function () {
      if ($('body').hasClass('fixed-sidebar')) {
        $('.sidebar-collapse').slimScroll({
          height: '100%',
          railOpacity: 0.9
        });
      }
    });
    $('#side-menu').metisMenu();

  }

}
