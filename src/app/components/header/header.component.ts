import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {HomeComponent} from '../adminComponent/home/home.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(  private auth: AuthService, private hom: HomeComponent) { }

  ngOnInit() {

  }

  logout() {
    this.hom.isLoggedIn = false;
    this.auth.logout();
  }
}
