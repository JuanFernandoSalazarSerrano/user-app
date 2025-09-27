import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/userService';
import { User } from '../models/User';
import { UserComponent } from './user/UserComponent';
import { UserForm } from './user-form/user-form';

@Component({
  selector: 'user-app',
  imports: [UserComponent, UserForm],
  templateUrl: './user-app.html'})

export class UserApp implements OnInit {

  title!: string;

  users: User[] = [];

  constructor(private readonly service: UserService){

  }
  ngOnInit(): void {
    this.service.findAll().subscribe(users => {this.users = users
      console.log('el subscribe corre obviamente')
    })
  }

  addUser(user: User): void{
    this.users.push({...user, id:this.users.length})
  }

  onDeleteUser(user1: User): void{
    this.users = this.users.filter(user => user !== user1)
  }

}
