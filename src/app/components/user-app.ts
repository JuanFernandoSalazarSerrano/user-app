import { User } from './../models/User';
import { SharingData } from './../services/sharing-data';
import { Component, OnInit, signal } from '@angular/core';
import { UserService } from '../services/userService';
import { ActivatedRoute, Router, RouterOutlet, RouterLinkWithHref, RouterModule} from '@angular/router';
import { Navbar } from './navbar/navbar';
import { PaginatorButton } from './paginator-button/paginator-button';

@Component({
  selector: 'user-app',
  imports: [RouterOutlet, Navbar, PaginatorButton, RouterLinkWithHref, RouterModule],
  templateUrl: './user-app.html'
})

export class UserApp implements OnInit {

  totalNumberOfPages!: number;

  title = signal<string>('Users')

  users = signal<User[]>([]);

  editingUser: boolean = false;

  constructor(
    private readonly service: UserService,
    private readonly SharingData: SharingData,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ){

  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(_ => {

      if (this.users === null || this.users === undefined || this.users.length === 0)

        {

          this.service.findAllPageable(0).subscribe(pageable => {
            this.title.set('Users')
            this.users.set(pageable.content)
            this.totalNumberOfPages = pageable.totalPages})
        }
    })

    // with this i subscribe to the observable
    this.addUser();
    this.onDeleteUser();
    this.findUserById();

  }

  findUserById(){
    this.SharingData.findUserByIdEventEmitter.subscribe(id => {

      const user = this.users().find(user => user.id === id)

      this.SharingData.selectedUserEventEmitter.emit(user);

    })
  }

  addUser(): void {

    this.SharingData.newUserEventEmitter.subscribe(user => {

      this.editingUser = false;

      // If the user was not found, it's new. Add it to the list.
      this.service.create(user).subscribe({

        next: (userCreated) => {
          if (this.users().find(u => u.id === userCreated.id) === undefined) {
            this.users().push(userCreated);
            this.router.navigate(['/users'], { state: { users: this.users() } })

          } else {
            // If the user was found, update it instead
            this.service.update(user).subscribe(userUpdated => {
          console.log('asasadafas23')

              this.users().map(u =>
                u.id === userUpdated.id ? { ...u, ...userUpdated } : u
              );
              this.router.navigate(['/users'], { state: { users: this.users() } })


            });
          }
        },
        error: (err) => {
          this.SharingData.errorsFormEventEmitter.emit(err.error);
        },
      });
                this.router.navigate(['/users'], { state: { users: this.users() } });

    });
  }

  onDeleteUser(): void {
    this.SharingData.EventEmitterDeleteUser.subscribe(userToDelete => {
      this.service.delete(userToDelete).subscribe(() => {
        this.users.set(this.users().filter(user => user !== userToDelete));
        this.router.navigate(['/users'], { state: { users: this.users() } });
      });
    });
  }
}

