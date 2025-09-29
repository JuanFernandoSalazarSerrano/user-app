import { SharingData } from './../../services/sharing-data';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/User';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/userService';

@Component({
  selector: 'user-component',
  imports: [RouterModule],
  templateUrl: './UserComponent.html'
})
export class UserComponent {

  user: User;

  users: User[] = []

  editingUser: boolean = false;

  constructor(private router: Router, private service: UserService, private readonly SharingData: SharingData){

    this.user = {
      id: 0,
      name: 'NYA',
      lastname: '',
      email: '',
      username: '',
      password: ''
    };

    if(this.router.currentNavigation()?.extras.state){
      this.users = this.router.currentNavigation()?.extras.state!['users']
    }

    else {
      this.service.findAll().subscribe(users => this.users = users)
      }
  }

  onDeleteUser(userToDelete: User): void{

    /// i could just use an if but i wanted to remember promises

    /// TODO add sweetalert or somehting better

    const deleteUser = confirm('Do you want to delete the user?')

    const confirmRemove = new Promise((resolve, reject) =>

    {
      if (deleteUser){
        resolve('Deleted user')
      }

      else {
        reject(new Error('The user aborted deletion'))
      }
    }
  )
  confirmRemove.then(() => {
    this.SharingData.EventEmitterDeleteUser.emit(userToDelete)})
  }

  onUpdateUser(userToUpdate: User, editingUser: boolean): void{
      // this.SharingData.newUserEventEmitter.emit(userToUpdate)
      this.editingUser = true;
      this.router.navigate(['/users/update', userToUpdate.id], {state: {userToUpdate, editingUser}})
  }

}
