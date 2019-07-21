import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Member} from '../models/member';
import {MemberAttendance} from '../models/member-attendance';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  findAllMembersOfCA(): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.apiUrl}/ca/member/findAll`);
  }
  findAttendanceAllMembersOfCA(): Observable<MemberAttendance[]> {
    return this.http.get<MemberAttendance[]>(`${this.apiUrl}/ca/member/findAll`);
  }


}
