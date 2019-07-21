import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Role} from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class AssignRoleService {


  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getAllRoles(): Observable<Role[]>{
    return this.http.get<Role[]>(`${this.apiUrl}/member/roles`);
  }
}
