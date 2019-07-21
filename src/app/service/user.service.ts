import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public fetchAllActiveUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/user/fetchAllActiveUser`);
  }



}
