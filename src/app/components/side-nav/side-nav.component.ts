import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';

declare let $: any;
import {Constant} from '../../constants/constant';
import {PageURL} from '../../constants/pageUrls';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, AfterViewChecked {

  currentRole: string;
  username: string;
  imgURL: string;
  PageURL = PageURL;

  constructor() {
    this.username = JSON.parse(localStorage.getItem('user')).username;
    this.imgURL = JSON.parse(localStorage.getItem('user')).imgURL || Constant.DUMMY_MALE_PROFILE_IMG;
  }

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
