import { SharingData } from './../../services/sharing-data';
import { Component, OnInit, signal } from '@angular/core';
import { User } from '../../models/User';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/userService';

@Component({
  selector: 'user-component',
  imports: [RouterModule],
  templateUrl: './UserComponent.html'
})
export class UserComponent implements OnInit {

  user: User;

  users = signal<User[]>([]);

  editingUser: boolean = false;

  constructor(private router: Router, private service: UserService, private readonly SharingData: SharingData,
    private readonly route: ActivatedRoute
  ){

    this.user = {
      id: 0,
      name: 'NYA',
      lastname: '',
      email: '',
      username: '',
      password: ''
    };


  }
  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      const page = +(params.get('page') || 0);


          this.service.findAllPageable(page).subscribe(pageable => {
            this.users.set(pageable.content)
            })

  }
)
  }

  onDeleteUser(userToDelete: User): void{

    console.log(userToDelete)

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
    console.log(userToDelete,'c')
    this.SharingData.EventEmitterDeleteUser.emit(userToDelete)
  })
  }

  onUpdateUser(userToUpdate: User, editingUser: boolean): void{
      // this.SharingData.newUserEventEmitter.emit(userToUpdate)
      this.editingUser = true;
      this.router.navigate(['/users/update', userToUpdate.id], {state: {userToUpdate, editingUser}})
  }

}
