import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/User';

@Component({
  selector: 'user-component',
  imports: [],
  templateUrl: './UserComponent.html'
})
export class UserComponent {

  @Input() user!: User;

  @Output() EventEmitterDelete: EventEmitter<User> = new EventEmitter();

  onDeleteUser(): void{

    /// i could just use an if but i wanted to remember promises

    /// to do add sweetalert or somehting better

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
}
