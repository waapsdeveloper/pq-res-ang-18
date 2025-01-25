import { GlobalRestaurantService } from './global-restaurant.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  getUserById(itemId: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    public api: ApiService,
    public router: Router,
    public utility: UtilityService,
    public restService: GlobalRestaurantService
  ) {}

  //Dashboard APi
  getDefaultRestaurantId() {
    return this.httpGetResponse('restaurant/active', null, false, true);
  }
  getSalesChartData(params: any) {
    let str = this.serialize(params);
    return this.httpGetResponse('dashboard/sales-chart-data' + '?' + str, null, false, true);
  }
  getCustomerStat() {
    return this.httpGetResponse('dashboard/customers', null, false, true);
  }

  getRecentOrder() {
    return this.httpGetResponse('dashboard/recent-orders', null, false, true);
  }

  getMSellingProduct() {
    return this.httpGetResponse('dashboard/most-selling-products', null, false, true);
  }
  getTopSellingProduct() {
    return this.httpGetResponse('dashboard/top-selling-products', null, false, true);
  }
  getLatestTable() {
    return this.httpGetResponse('dashboard/latest-tables', null, false, true);
  }

  getTotalSales() {
    return this.httpGetResponse('dashboard/sales-summary', null, false, true);
  }
  // Authentication Related APIs

  loginViaEmail(data) {
    return this.httpPostResponse('auth/login-via-email', data, null, false, true);
  }

  // Standard CRUD calls

  index(slug, params) {
    const query = this.serialize(params);
    return this.httpGetResponse(slug + (query ? `?${query}` : ''), null, true, true);
  }

  destroy(slug, id) {
    return this.httpDeleteResponse(slug, id, false, true);
  }

  // Restaurants

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

  updateRestaurant(data, id) {
    return this.httpPutResponse(`restaurant`, data, id, false, true);
  }

  setActiveRestaurant(data: any, id) {
    return this.httpPutResponse(`restaurant/update-active`, data, id, false, true);
  }

  // removeRestaurant(id) {
  //   return this.httpDeleteResponse('restaurant', id, false, true);
  // }

  // Users

  getUserByToken() {
    return this.httpGetResponse('auth-user', null, false);
  }

  // getUsers(params) {
  //   const query = this.serialize(params);
  //   return this.httpGetResponse('user' + (query ? `?${query}` : ''), null, false, true);
  // }

  getUsersById(id) {
    return this.httpGetResponse(`user/${id}`, null, false, true);
  }

  addUser(data) {
    return this.httpPostResponse('user', data, null, false, true);
  }
  updateUser(data, id) {
    return this.httpPutResponse('user', data, id, false, true);
  }

  // removeUser(id) {
  //   return this.httpDeleteResponse('user', id, false, true);
  // }

  getRoles(params) {
    const query = this.serialize(params);
    return this.httpGetResponse('role' + (query ? `?${query}` : ''), null, false, true);
  }

  // Categories

  getCategories(params) {
    const query = this.serialize(params);
    return this.httpGetResponse('category' + (query ? `?${query}` : ''), null, false, true);
  }

  getCategoriesById(id) {
    return this.httpGetResponse(`category/${id}`, null, false, true);
  }

  addCategory(data) {
    return this.httpPostResponse('category', data, null, false, true);
  }

  removeCategory(id) {
    return this.httpDeleteResponse('category', id, false, true);
  }
  updateCategory(data, id) {
    return this.httpPutResponse('category', data, id, false, true);
  }

  // Products

  getProducts(params) {
    const query = this.serialize(params);
    return this.httpGetResponse('product' + (query ? `?${query}` : ''), null, false, true);
  }

  getProductsById(id) {
    return this.httpGetResponse(`product/${id}`, null, false, true);
  }

  addProduct(data) {
    return this.httpPostResponse('product', data, null, false, true);
  }
  updateProduct(data, id) {
    return this.httpPutResponse('product', data, id, false, true);
  }

  removeProduct(id) {
    return this.httpDeleteResponse('product', id, false, true);
  }
  //invoices
  addInvoice(data) {
    return this.httpPostResponse('invoice', data, null, false, true);
  }
  getInvoices(params) {
    const query = this.serialize(params);
    return this.httpGetResponse('invoice' + (query ? `?${query}` : ''), null, false, true);
  }
  removeInvoice(id) {
    return this.httpDeleteResponse('invoice', id, false, true);
  }

  getInvoicesById(id) {
    return this.httpGetResponse(`invoice/${id}`, null, false, true);
  }
  // Variations
  getVariations(params) {
    const query = this.serialize(params);
    return this.httpGetResponse('variation' + (query ? `?${query}` : ''), null, false, true);
  }
  addVariations(data) {
    return this.httpPostResponse('variation', data, null, false, true);
  }
  getVariationsById(id) {
    return this.httpGetResponse(`variation/${id}`, null, false, true);
  }
  removeVariationsById(id) {
    return this.httpDeleteResponse('variation', id, false, true);
  }
  updateVariation(data, id) {
    return this.httpPutResponse('variation', data, id, false, true);
  }

  // Tables

  getTables(params) {
    const query = this.serialize(params);
    return this.httpGetResponse('rtable' + (query ? `?${query}` : ''), null, false, true);
  }
  getTablesById(id) {
    return this.httpGetResponse(`rtable/${id}`, null, false, true);
  }

  addTable(data) {
    return this.httpPostResponse('rtable', data, null, false, true);
  }
  updateTable(data, id) {
    return this.httpPutResponse('rtable', data, id, false, true);
  }
  removeTable(id) {
    return this.httpDeleteResponse('rtable', id, false, true);
  }

  // Orders

  getOrders(params) {
    const query = this.serialize(params);
    return this.httpGetResponse('order' + (query ? `?${query}` : ''), null, false, true);
  }

  getOrdersById(id) {
    return this.httpGetResponse(`order/${id}`, null, false, true);
  }
  orderStatus(id, data) {
    return this.httpPutResponse(`order/update-status`, data, id, false, true);
  }

  addOrder(data) {
    return this.httpPostResponse('order', data, null, false, true);
  }
  removeOrder(id) {
    return this.httpDeleteResponse('order', id, false, true);
  }

  //Notification Apis
  getNotifications() {
    return this.httpGetResponse('notifications/all', null, false, true);
  }

  getUnreadNotifications() {
    return this.httpGetResponse('notifications/unread', null, false, true);
  }
  readNotification(id) {
    return this.httpPostResponse(`notifications/mark-as-read/${id}`, null, false, true);
  }
  serialize = (obj: any) => {
    console.log(localStorage.getItem('restaurant_id'));
    obj['restaurant_id'] = localStorage.getItem('restaurant_id') ? localStorage.getItem('restaurant_id') : -1;

    const str: any[] = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        let f: string = encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]);
        str.push(f);
      }
    }
    return str.join('&');
  };

  // Function for POST method
  httpPostResponse(key: any, data: any, id = null, showloader = true, showError = true, contenttype = 'application/json') {
    console.log(localStorage.getItem('restaurant_id'));
    data['restaurant_id'] = localStorage.getItem('restaurant_id') ? localStorage.getItem('restaurant_id') : -1;

    return this.httpResponse('post', key, data, id, showloader, showError, contenttype);
  }

  // Function for GET method
  httpGetResponse(key: any, id = null, showloader = true, showError = true, contenttype = 'application/json') {
    return this.httpResponse('get', key, {}, id, showloader, showError, contenttype);
  }

  // Function for PUT method
  httpPutResponse(key: any, data: any, id = null, showloader = true, showError = true, contenttype = 'application/json') {
    return this.httpResponse('put', key, data, id, showloader, showError, contenttype);
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
  httpDeleteResponse(key: any, id = null, showloader = true, showError = true, contenttype = 'application/json') {
    return this.httpResponse('delete', key, {}, id, showloader, showError, contenttype);
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
        type === 'get'
          ? this.api.get(url, {})
          : type === 'delete'
            ? this.api.delete(url, {})
            : type === 'put'
              ? this.api.put(url, data)
              : this.api.post(url, data);

      seq.subscribe({
        next: (res: any) => {
          if (showloader === true) {
            // return
            this.utility.hideLoader();
          }

          console.log('EW', res);
          resolve(res.result);
        },
        error: (err: any) => {
          this.utility.hideLoader();

          if (showError == true) {
            this.utility.presentFailureToast(err.error.message);
          }
          if (err.status == 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user_role');
            this.router.navigate(['']);
          }
          reject(err.error);
        }
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
