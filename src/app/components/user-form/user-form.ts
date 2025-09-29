import { SharingData } from './../../services/sharing-data';
import { Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { User } from '../../models/User';
import { Router} from '@angular/router';


@Component({
  selector: 'user-form',
  imports: [FormsModule],
  templateUrl: './user-form.html',
})
export class UserForm {

  user: User;

  editingUser: boolean;

  constructor(private readonly SharingData: SharingData, private readonly router: Router) {

    if(this.router.currentNavigation()?.extras.state){
      this.user = this.router.currentNavigation()?.extras.state!['userToUpdate']
      this.editingUser = true
    }

    else {
        this.user = new User();
        this.editingUser = false;
      }

      console.log(this.user)
  }

  onSubmit(): void {
    this.SharingData.newUserEventEmitter.emit(this.user)
          this.router.navigate(['/users'])
  }
}
