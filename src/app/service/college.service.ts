import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {College} from '../models/college';

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

  public findCollegeDropDown(): Observable<College[]> {
    return this.http.get<College[]>(`${this.apiUrl}/college/collegeDropDown`);
  }
}
