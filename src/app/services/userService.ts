import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly users: User[] = [

  {"id":1,"name":"Alice","lastname":"Gonzalez","email":"alice.g@example.com","username":"aliceg","password":"pass1234"},
  {"id":2,"name":"Carlos","lastname":"Martinez","email":"carlos.m@example.com","username":"carlosm","password":"password"},
  {"id":3,"name":"Marta","lastname":"Lopez","email":"marta.l@example.com","username":"martal","password":"123456"},
  {"id":4,"name":"Diego","lastname":"Perez","email":"diego.p@example.com","username":"diego","password":"qwerty"},
  {"id":5,"name":"Luisa","lastname":"Rodriguez","email":"luisa.r@example.com","username":"luisar","password":"letmein"}

];

  constructor(){}

  findAll(): Observable<User[]>{
    return of(this.users);
  }
}
