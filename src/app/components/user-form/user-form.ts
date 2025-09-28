import { Component, EventEmitter, Input, Output } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { User } from '../../models/User';

@Component({
  selector: 'user-form',
  imports: [FormsModule],
  templateUrl: './user-form.html',
})
export class UserForm {

  @Input() user!: User;

  @Input() editingUser!: boolean;

  @Output() newUserEventEmitter: EventEmitter<User> = new EventEmitter();

  constructor(){

  }

  onSubmit(): void {
    this.newUserEventEmitter.emit(this.user)
  }
}
