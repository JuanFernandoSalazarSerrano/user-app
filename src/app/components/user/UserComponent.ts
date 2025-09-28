import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/User';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'user-component',
  imports: [RouterModule],
  templateUrl: './UserComponent.html'
})
export class UserComponent {

  @Input() user!: User;

  editingUser: boolean = false;

  @Output() EventEmitterDelete: EventEmitter<User> = new EventEmitter();

  @Output() EventEmitterEdit: EventEmitter<boolean> = new EventEmitter();

  @Output() EventEmitterUpdate: EventEmitter<User> = new EventEmitter();


  onDeleteUser(): void{

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

    })

    confirmRemove.then(() => this.EventEmitterDelete.emit(this.user))
  }

  onAddUser(): void{

    // this.editingUser = this.editingUser ? false : true

    this.editingUser = !this.editingUser // lol
    this.EventEmitterEdit.emit(this.editingUser)


    this.EventEmitterUpdate.emit(this.user)

  }
}
