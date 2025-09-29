import { SharingData } from './../services/sharing-data';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/userService';
import { User } from '../models/User';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';

@Component({
  selector: 'user-app',
  imports: [RouterOutlet, Navbar],
  templateUrl: './user-app.html'})

export class UserApp implements OnInit {

  title!: string;

  users: User[] = [];

  editingUser: boolean = false;

  userToUpdate!: User;

  constructor(private readonly service: UserService, private SharingData: SharingData){

    this.userToUpdate = new User();

  }

  ngOnInit(): void {
    this.service.findAll().subscribe(users => {this.users = users
    }
  )
  // with this i subscribe to the observable
    this.addUser();
    this.onDeleteUser();
  }

  //updateUser() also.   I dont think this is a good practice
  addUser(): void{

    this.SharingData.newUserEventEmitter.subscribe(user => {

    this.editingUser = false

    // If the user was not found then its new add it to the list and increase its identifier by 1
    if(this.users.find(u => u.id === user.id) === undefined){
      this.users.push({...user, id: this.users.length + 1})
    }
    // but if the user was found just updated
    else{
      this.users = this.users.map(u => u.id === user.id ? { ...u, ...user } : u);
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
    })
  }

  onDeleteUser(): void{

    this.SharingData.EventEmitterDeleteUser.subscribe(userToDelete =>{
      this.users = this.users.filter(user => user !== userToDelete)
    })
  }
}
