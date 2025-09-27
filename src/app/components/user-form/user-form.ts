import { Component, EventEmitter, Output } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { User } from '../../models/User';

@Component({
  selector: 'user-form',
  imports: [FormsModule],
  templateUrl: './user-form.html',
})
export class UserForm {

  user: User;

  @Output() newUserEventEmitter: EventEmitter<User> = new EventEmitter();

  constructor(){
    this.user = new User()
  }

  onSubmit(): void {
    this.newUserEventEmitter.emit(this.user)
    console.log(this.user)
  }

}
