import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {AuthService} from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'iskconErpClient';
  role: string;
  constructor(public auth: AuthService, private cd: ChangeDetectorRef) {
    this.role = localStorage.getItem('role');
    this.cd.markForCheck();
    setInterval(() => {
      this.cd.detectChanges();
    }, 1000);
  }
}
