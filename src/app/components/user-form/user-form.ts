import { SharingData } from './../../services/sharing-data';
import { Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { User } from '../../models/User';
import { ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'user-form',
  imports: [FormsModule],
  templateUrl: './user-form.html',
})
export class UserForm implements OnInit {

  user: User;

  editingUser: boolean;

  constructor(private readonly SharingData: SharingData, private readonly route: ActivatedRoute, private router: Router) {

    this.user = new User();

    this.editingUser = false;

  }
  ngOnInit(): void {

    this.SharingData.selectedUserEventEmitter.subscribe((user) => {
      this.user = user
    })

    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');

      if (id > 0){
        this.SharingData.findUserByIdEventEmitter.emit(id);
      }

    })
  }

  onSubmit(): void {
    this.SharingData.newUserEventEmitter.emit(this.user)
  }
}
