import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _user;

  constructor(private network: NetworkService, ) { }

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

  async getLoginUserFromApi() {

    return new Promise(async (resolve) => {
      let token = localStorage.getItem('token');
      if (!token) {
        resolve(false);
        return;
      }
      try {
        let res = await this.network.getUserByToken();
        this.setUser(res.user);
        resolve(res.user);
      } catch (err) {
        resolve(false);
      }
    });
  }

}
