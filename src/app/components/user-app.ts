import { User } from './../models/User';
import { SharingData } from './../services/sharing-data';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/userService';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';

@Component({
  selector: 'user-app',
  imports: [RouterOutlet, Navbar],
  templateUrl: './user-app.html'})

export class UserApp implements OnInit {

  title!: string;

  users: User[] = [];

  editingUser: boolean = false;

  constructor(
    private readonly service: UserService,
    private readonly SharingData: SharingData,
    private readonly router: Router){

  }

  ngOnInit(): void {
    this.service.findAll().subscribe(users => {this.users = users
      // im sorry, i just dont know any better
      this.router.navigate(['/users/create'], {skipLocationChange: true}).then(() =>{this.router.navigate(['/users'], {state: {users: this.users}})})
    })

  // with this i subscribe to the observable
    this.addUser();
    this.onDeleteUser();
        this.findUserById();
  }

  findUserById(){
    this.SharingData.findUserByIdEventEmitter.subscribe(id => {
      const user = this.users.find(user => user.id === id)

      this.SharingData.selectedUserEventEmitter.emit(user);

    })}

  addUser(): void{

    this.SharingData.newUserEventEmitter.subscribe(user => {

    this.editingUser = false

    // If the user was not found then, its new. Add it to the list and increase its identifier by 1

    this.service.create(user).subscribe(userCreated => {

      if(this.users.find(usersInTheArray => userCreated.id === usersInTheArray.id) === undefined){
        this.users.push(userCreated)

      this.router.navigate(['/users'], {state: {users: this.users}})
    }
        // but if the user was found, just update
    else{
      this.service.update(user).subscribe(userUpdated => {
        this.users = this.users.map(u => u.id === userUpdated.id ? { ...u, ...userUpdated } : u);
        this.router.navigate(['/users'], {state: {users: this.users}})
      })
    }
    })
  }
)
}
  onDeleteUser(): void{

    this.SharingData.EventEmitterDeleteUser.subscribe(userToDelete =>{
      this.users = this.users.filter(user => user !== userToDelete)
      this.router.navigate(['/users/create'], {skipLocationChange: true}).then(() =>{this.router.navigate(['/users'], {state: {users: this.users}})})
        this.service.delete(userToDelete).subscribe(userToDelete =>{
          }
        )
      }
    )
  }
}
