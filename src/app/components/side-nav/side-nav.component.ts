import { Component, OnInit } from '@angular/core';
import {Constant} from '../../constants/constant';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  username: string;
  imgURL: string;

  constructor() {
    this.username = JSON.parse(localStorage.getItem('user')).username;
    this.imgURL = JSON.parse(localStorage.getItem('user')).imgURL || Constant.DUMMY_MALE_PROFILE_IMG;
  }

  ngOnInit() {
  }

}
