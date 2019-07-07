import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {

  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public registerCollege(collegeCO) {
    console.log(collegeCO);
    return this.http.post(`${this.apiUrl}/college/register`, collegeCO);
  }

  public findCollegeDropDown(): Observable<Map<number, String>>{
    return this.http.get<Map<number, String>>(`${this.apiUrl}/college/collegeDropDown`);
  }
}
