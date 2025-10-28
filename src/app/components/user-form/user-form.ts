import { UserService } from './../../services/userService';
import { SharingData } from './../../services/sharing-data';
import { Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/User';
import { ActivatedRoute, RouterLink } from '@angular/router';


@Component({
  selector: 'user-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './user-form.html',
})
export class UserForm implements OnInit {

  user: User;

  editingUser: boolean;

  errors: any = {email:''};

  constructor(private readonly SharingData: SharingData,
     private readonly route: ActivatedRoute,
     private readonly UserService: UserService ) {

    this.user = new User();

    this.editingUser = false;

  }
  ngOnInit(): void {

    this.SharingData.errorsFormEventEmitter.subscribe((errors) => {
      this.errors = errors
      console.log(this.errors)
    })

    this.SharingData.selectedUserEventEmitter.subscribe((user) => {
      this.user = user
    })

    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');

      if (id > 0){
        this.SharingData.findUserByIdEventEmitter.emit(id);

        this.UserService.findById(id).subscribe(user => this.user = user);
        this.editingUser = !this.editingUser
      }
    });
  }

  onSubmit(): void {

  if (this.editingUser) {
          console.log('asasadafassasasa90')

    // Update existing user
    this.SharingData.newUserEventEmitter.emit(this.user);
  } else {
          console.log('asasadafassasasa91')

    // Create new user (no id)
    const { id, ...userWithoutId } = this.user;
    this.SharingData.newUserEventEmitter.emit(userWithoutId as User);
  }

    //If you are creating a new user, you should not set a fixed ID.
    // The backend should assign the ID.
  }
}
