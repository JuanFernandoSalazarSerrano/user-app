import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly url: string = 'http://localhost:8080/api/v1/users'

  constructor(private readonly http: HttpClient){}

  findAll(): Observable<User[]>{
    return this.http.get<User[]>(this.url)
  }

  findAllPageable(page: number): Observable<User[]>{
    return this.http.get<User[]>(`${this.url}/page/${page}`)
  }

  findById(id: number): Observable<User>{
    return this.http.get<User>(`${this.url}/${id}`)
  }

  create(user: User): Observable<User>{
    return this.http.post<User>(this.url, user);
  }

  update(user: User): Observable<User>{
    return this.http.put<User>(`${this.url}/${user.id}`, user);
  }

  delete(user: User): Observable<User>{
    return this.http.delete<User>(`${this.url}/${user.id}`);
  }
}
