import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {AuthService} from './service/auth.service';
import {Router} from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'iskconErpClient';
  role: string;
  constructor(public auth: AuthService, private cd: ChangeDetectorRef, public router: Router) {
    this.role = localStorage.getItem('role');
    this.cd.markForCheck();
    setTimeout(() => {
      this.cd.detectChanges();
    }, 1000);
  }

  public static showToaster = (message, type) => {
    Swal({
      title: message,
      type: type,
      timer: 1500
    });
  }
}
