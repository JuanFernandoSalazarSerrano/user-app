import { Component, Input} from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { User } from '../../models/User';

@Component({
  selector: 'navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html'
})
export class Navbar {

  @Input() users: User[] = []

}
