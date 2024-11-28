import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  constructor(
    public api: ApiService,
    public router: Router,
    public utility: UtilityService,
  ) { }

  // Authentication Related APIs
  loginViaEmail(data) {
    return this.httpPostResponse('auth/login-via-email', data, null, false, true);
  }

  getRestaurants(params) {
    const query = this.serialize(params);
    return this.httpGetResponse('restaurant' + (query ? `?${query}` : ''), null, false, true);
  }

  getRestaurantById(id) {
    return this.httpGetResponse(`restaurant/${id}`, null, false, true);
  }

  addRestaurant(data) {
    return this.httpPostResponse('restaurant', data, null, false, true);
  }

  getRoles(params) {
    const query = this.serialize(params);
    return this.httpGetResponse('role' + (query ? `?${query}` : ''), null, false, true);
  }





  serialize = (obj: any) => {
    const str: any[] = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        let f: string =
          encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]);
        str.push(f);
      }
    }
    return str.join('&');
  };

  // Function for POST method
  httpPostResponse(
    key: any,
    data: any,
    id = null,
    showloader = true,
    showError = true,
    contenttype = 'application/json'
  ) {
    return this.httpResponse(
      'post',
      key,
      data,
      id,
      showloader,
      showError,
      contenttype
    );
  }

  // Function for GET method
  httpGetResponse(
    key: any,
    id = null,
    showloader = true,
    showError = true,
    contenttype = 'application/json'
  ) {
    return this.httpResponse(
      'get',
      key,
      {},
      id,
      showloader,
      showError,
      contenttype
    );
  }

  // Function for PUT method
  httpPutResponse(key: any, data: any, id = null) {
    return new Promise<any>((resolve, reject) => {
      this.api.put(key, data).subscribe((res: any) => {
        resolve(res);
      });
    });
  }

  // Function for PATCH method
  httpPatchResponse(key: any, data: any, id = null) {
    return new Promise<any>((resolve, reject) => {
      this.api.patch(key, data).subscribe((res: any) => {
        resolve(res);
      });
    });
  }

  // Function for DELETE method
  httpDeleteResponse(key: any, showloader = true) {
    return new Promise<any>((resolve, reject) => {
      if (showloader === true) {
        this.utility.showLoader();
      }
      this.api.delete(key).subscribe((res: any) => {

        this.utility.hideLoader();
        resolve(res);
      });
    });
  }

  httpResponse(
    type = 'get',
    key: any,
    data: any,
    id = null,
    showloader = true,
    showError = true,
    contenttype = 'application/json'
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      if (showloader === true) {
        this.utility.showLoader();
      }
      const url = key + (id ? '/' + id : '');
      const seq =
        type === 'get' ? this.api.get(url, {}) : this.api.post(url, data);

      seq.subscribe({
        next: (res: any) => {
          if (showloader === true) {
            // return
            this.utility.hideLoader();
          }

          console.log("EW", res)
          resolve(res.result);
        },
        error: (err: any) => {

          this.utility.hideLoader();

          if(showError == true){
            this.utility.presentFailureToast(err.error.message);
          }
          if (err.status == 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user_role');
            this.router.navigate(['']);
          }
          reject(err.error);
        },
      });
    }).catch((err) => {
      if (err.status == 'Error') {
        this.utility.presentFailureToast(err.message);
        if (err.message == 'User Not Logged In!') {
          this.router.navigate(['']);
        }
      }
    });
  }
}
