import { EventEmitter, Injectable, Output } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class SharingData {

    @Output()
    private readonly _newUserEventEmitter: EventEmitter<User> = new EventEmitter();

    @Output()
    private readonly _EventEmitterDeleteUser: EventEmitter<User> = new EventEmitter();


  public get newUserEventEmitter(): EventEmitter<User> {
    return this._newUserEventEmitter;
  }

  public get EventEmitterDeleteUser(): EventEmitter<User> {
    return this._EventEmitterDeleteUser;
  }

}
