import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _user;

  constructor() { }

  getUser() {
    if (!this._user) {
      const res = localStorage.getItem('user');
      if (res) {
        this._user = JSON.parse(res);
      }
    }
    return this._user;
  }

  async setUser(user): Promise<any> {
    // const aww = await this.userSq.setUserInDatabase(user);
    localStorage.setItem('user', JSON.stringify(user));
    this._user = user;

    return user;
  }

}
