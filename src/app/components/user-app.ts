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

  editingUser: boolean = false;

  userToUpdate!: User;

  constructor(private readonly service: UserService){

    this.userToUpdate = new User();

  }
  ngOnInit(): void {
    this.service.findAll().subscribe(users => {this.users = users
    })
  }

  addUser(user: User): void{

    console.log(user)

    this.editingUser = false

    this.users = this.users.map(u => u.id === user.id ? { ...u, ...user } : u);

    if(this.users.find(u => u.id === user.id) === undefined){
    this.users.push({...user, id: this.users.length + 1})
    }

    // reset

    this.userToUpdate = {
      id: 0,
      name: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
    };

    console.log(this.users)



  }

  onDeleteUser(userToDelete: User): void{
    this.users = this.users.filter(user => user !== userToDelete)
  }


  onEditUser(): void{

    this.editingUser = !this.editingUser

  }

  onUpdateUser(user: User): void{

    this.userToUpdate = {...user}

  }
}
