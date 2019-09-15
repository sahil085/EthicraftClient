import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {
  public loading = false;
  title = 'Ethiccraft';
  role: string;

  constructor(private cdr: ChangeDetectorRef) {
  }

  public static showToaster = (message, type) => {
    Swal({
      title: message,
      type: type,
      timer: 1500
    });
  };

  ngAfterViewInit(): void {
    setInterval(() => {
      this.cdr.detectChanges();
    }, 1000);
  }

}
