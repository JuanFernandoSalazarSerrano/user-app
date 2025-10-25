import { EventEmitter, Injectable} from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class SharingData {

    private readonly _newUserEventEmitter: EventEmitter<User> = new EventEmitter();

    private readonly _EventEmitterDeleteUser: EventEmitter<User> = new EventEmitter();

    private readonly _findUserByIdEventEmitter: EventEmitter<number> = new EventEmitter();

    private readonly _selectedUserEventEmitter: EventEmitter<User> = new EventEmitter();

    private readonly _errorsFormEventEmitter: EventEmitter<any> = new EventEmitter();


  constructor(){}

  public get errorsFormEventEmitter(): EventEmitter<any> {
    return this._errorsFormEventEmitter;
  }

  public get selectedUserEventEmitter(): EventEmitter<User> {
    return this._selectedUserEventEmitter;
  }

  public get findUserByIdEventEmitter(): EventEmitter<number> {
    return this._findUserByIdEventEmitter;
  }

  public get newUserEventEmitter(): EventEmitter<User> {
    return this._newUserEventEmitter;
  }

  public get EventEmitterDeleteUser(): EventEmitter<User> {
    return this._EventEmitterDeleteUser;
  }

}
