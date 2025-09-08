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
  ) { }

  getUserPermissions() {
    return this.httpGetResponse('auth-user/permissions', null, false, true);
  }

  //Dashboard APi

  getSalesChartData(params: any) {
    let str = this.serialize(params);
    return this.httpGetResponse('dashboard/sales-chart-data' + '?' + str, null, true, true);
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
  getTopSellingProduct(params) {
    const query = this.serialize(params); // Serialize the params into a query string
    return this.httpGetResponse('dashboard/top-selling-products' + (query ? `?${query}` : ''), null, false, true);
  }
  getLatestTable() {
    return this.httpGetResponse('dashboard/latest-tables', null, false, true);
  }

  getTopDashboardCard(params: any = {}) {
    const query = this.serialize(params);
    return this.httpGetResponse('dashboard-top-cards' + (query ? `?${query}` : ''), null, false, true);
  }

  getTotalSales() {
    return this.httpGetResponse('dashboard/sales-summary', null, false, true);
  }
  // Authentication Related APIs

  loginViaEmail(data) {
    return this.httpPostResponse('auth/login-via-email', data, null, false, true);
  }

  forgotPassword(data) {
    return this.httpPostResponse('auth/forgot-password', data, null, true, false);
  }

  resetPassword(data) {
    return this.httpPostResponse('auth/reset-password', data, null, false, true);
  }

  // Standard CRUD calls

  index(slug, params) {
    const query = this.serialize(params);
    return this.httpGetResponse(slug + (query ? `?${query}` : ''), null, false, true);
  }
  indexDeleted(slug: string, params?: any) {
    const query = this.serialize(params);
    return this.httpGetResponse(`${slug}/deleted-orders${query ? `?${query}` : ''}`, null, false, true);
  }
  // ✅ Restore a single record
  restore(slug: string, id: number) {
    return this.httpPostResponse(`${slug}/${id}/restore`, {}, null, true, true);
  }
  // ✅ Restore multiple records
  restoreMultiple(slug: string, ids: number[]) {
    return this.httpPostResponse(`${slug}/restore-multiple`, { ids }, null, true, true);
  }

  forceDestroy(slug: string, id: number) {
    return this.httpDeleteResponse(`${slug}/force-delete/${id}`, null, true, true);
  }

  // ✅ Force delete multiple records
  forceDestroyMultiple(slug: string, ids: number[]) {
    // ⚠️ If your httpDeleteResponse doesn't support body, change API to POST in backend
    return this.httpDeleteResponse(`${slug}/force-delete-multiple`, { ids }, true, true);
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
    return this.httpPostResponse('restaurant', data, null, true, true);
  }

  updateRestaurant(data, id) {
    return this.httpPutResponse(`restaurant`, data, id, true, true);
  }

  setActiveRestaurant(data: any, id) {
    return this.httpPutResponse(`restaurant/update-active`, data, id, false, true);
  }

  // Restaurant Meta methods
  storeRestaurantMeta(data: any, restaurantId: any) {
    return this.httpPostResponse(`restaurant/${restaurantId}/meta`, data, null, false, true);
  }

  getRestaurantMeta(restaurantId: any, metaKey?: string) {
    const params = metaKey ? { meta_key: metaKey } : {};
    const query = this.serialize(params);
    return this.httpGetResponse(`restaurant/${restaurantId}/meta${query ? `?${query}` : ''}`, null, false, true);
  }

  deleteRestaurantMeta(restaurantId: any, metaKey: string) {
    // For DELETE with body, we need to use a different approach
    return this.httpResponse('delete', `restaurant/${restaurantId}/meta`, { meta_key: metaKey }, null, false, true);
  }
  getDefaultRestaurantId() {
    return this.httpGetResponse('restaurant/active', null, false, true);
  }

  getRestaurantConfigById(id: any) {
    return this.httpGetResponse('branch-config/get-config-by-branch-id', id, false, false);
  }

  /***Reporting Systems Endpoints **/

  getOrderReportDaily(filters: any = null) {
    const params = filters ? { filters: JSON.stringify(filters) } : {};
    const query = this.serialize(params);
    return this.httpGetResponse(
      `reports/orders/daily${query ? `?${query}` : ''}`,
      null,
      true,
      true
    );
  }

  getOrderReportMonthly(filters: any = null) {
    const params = filters ? { filters: JSON.stringify(filters) } : {};
    const query = this.serialize(params);
    return this.httpGetResponse(
      `reports/orders/monthly${query ? `?${query}` : ''}`,
      null,
      true,
      true
    );
  }
  getProductReportDaily(filters: any = null) {
    const params = filters ? { filters: JSON.stringify(filters) } : {};
    const query = this.serialize(params);
    return this.httpGetResponse(
      `reports/orders/product-daily${query ? `?${query}` : ''}`,
      null,
      true,
      true
    );
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
    return this.httpPostResponse('user', data, null, true, true);
  }
  updateUser(data, id) {
    return this.httpPutResponse('user', data, id, true, true);
  }

  // Branch Config

  // removeUser(id) {
  //   return this.httpDeleteResponse('user', id, false, true);
  // }

  getRoles(params = {}) {
    const query = this.serialize(params);
    return this.httpGetResponse('role' + (query ? `?${query}` : ''), null, false, true);
  }

  getRoleById(id: any) {
    return this.httpGetResponse(`role/${id}`, null, false, true);
  }

  addRole(data: any) {
    return this.httpPostResponse('role', data, null, false, true);
  }

  updateRole(data: any, id: any) {
    return this.httpPutResponse('role', data, id, false, true);
  }

  removeRole(id: any) {
    return this.httpDeleteResponse('role', id, false, true);
  }

  bulkDeleteRoles(params = {}) {
    const query = this.serialize(params);
    return this.httpGetResponse('role/bulk-delete' + (query ? `?${query}` : ''), null, false, true);
  }

  getBranchConfigs(params) {
    const query = this.serialize(params);
    return this.httpGetResponse('branch-config' + (query ? `?${query}` : ''), null, false, true);
  }

  getBranchConfigById(id) {
    return this.httpGetResponse(`branch-config/get-config-by-branch-id/${id}`, null, false, true);
  }

  getBranchConfig(id) {
    return this.httpGetResponse(`branch-config/${id}`, null, false, true);
  }

  addBranchConfig(data) {
    return this.httpPostResponse('branch-config', data, null, false, true);
  }

  updateBranchConfig(data, id) {
    return this.httpPutResponse('branch-config', data, id, false, true);
  }

  removeBranchConfig(id) {
    return this.httpDeleteResponse('branch-config', id, false, true);
  }

  // Categories

  getCategories(params) {
    const query = this.serialize(params);
    return this.httpGetResponse('category' + (query ? `?${query}` : ''), null, false, true);
  }

  getCategoriesById(id) {
    return this.httpGetResponse(`category/${id}`, null, true, true);
  }

  addCategory(data) {
    return this.httpPostResponse('category', data, null, true, true);
  }

  removeCategory(id) {
    return this.httpDeleteResponse('category', id, false, true);
  }
  updateCategory(data, id) {
    return this.httpPutResponse('category', data, id, true, true);
  }

  uploadCategoryImage(imageFile: File, categoryId?: string) {
    const formData = new FormData();
    formData.append('image', imageFile);

    // If categoryId is provided, use it in the URL, otherwise use a placeholder for new categories
    const url = categoryId ? `category/${categoryId}/upload-image` : 'category/0/upload-image';

    return this.httpPostResponse(url, formData, null, true, true, 'multipart/form-data');
  }

  uploadProductImage(imageFile: File, productId?: string) {
    const formData = new FormData();
    formData.append('image', imageFile);

    // If productId is provided, use it in the URL, otherwise use a placeholder for new products
    const url = productId ? `product/${productId}/upload-image` : 'product/0/upload-image';

    return this.httpPostResponse(url, formData, null, true, true, 'multipart/form-data');
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
    return this.httpPostResponse('product', data, null, true, true);
  }
  updateProduct(data, id) {
    return this.httpPutResponse('product', data, id, true, true);
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
  getTableBookingById(id) {
    return this.httpGetResponse(`table-booking/${id}`, null, false, true);
  }
  tableStatus(id: any, data) {
    return this.httpPutResponse(`table-booking/update-status`, data, id, false, true);
  }

  // Coupons
  addCoupon(data) {
    return this.httpPostResponse('coupon', data, null, false, true);
  }
  updateCoupon(data, id) {
    return this.httpPutResponse('coupon', data, id, false, true);
  }
  getCouponById(id) {
    return this.httpGetResponse(`coupon/${id}`, null, false, true);
  }
  getAvailableCoupon(params) {
    const query = this.serialize(params);
    return this.httpGetResponse('coupon/available-valid-coupon' + (query ? `?${query}` : ''), null, true, true);
  }

  updateCouponUsage(data) {
    return this.httpPostResponse('coupon/update-coupon-usage', data, null, false, true);
  }
  // Orders

  getOrders(params) {
    const query = this.serialize(params);
    return this.httpGetResponse('order' + (query ? `?${query}` : ''), null, false, true);
  }

  getOrderTotals() {
    return this.httpGetResponse('order/totals', null, false, true);
  }
  getOrdersById(id) {
    return this.httpGetResponse(`order/${id}`, null, false, true);
  }

  updateOrder(data, id) {
    return this.httpPutResponse('order', data, id, false, true);
  }
  orderStatus(id, data) {
    return this.httpPutResponse(`order/update-status`, data, id, false, true);
  }
  updateOrderPaymentStatus(id, data) {
    return this.httpPutResponse(`order/update-payment-status`, data, id, false, true);
  }

  // 🔹 Deleted orders list
  getDeletedOrders(params) {
    const query = this.serialize(params);
    return this.httpGetResponse('order/deleted' + (query ? `?${query}` : ''), null, false, true);
  }

  // 🔹 Restore a single order
  restoreOrder(id: number) {
    return this.httpPostResponse(`order/${id}/restore`, {}, null, true, true);
  }

  // 🔹 Restore multiple orders
  restoreMultipleOrders(ids: number[]) {
    return this.httpPostResponse('order/restore-multiple', { ids }, null, true, true);
  }

  // 🔹 Force delete a single order (permanent)
  forceDeleteOrder(id: number) {
    return this.httpDeleteResponse(`order/force-delete/${id}`, null, true, true);
  }

  // 🔹 Force delete multiple orders (permanent)
  forceDeleteMultipleOrders(ids: number[]) {
    return this.httpDeleteResponse('order/force-delete-multiple', { ids }, true, true);
  }
   getOrderHistory(id) {
    return this.httpGetResponse(`order/${id}/events`, null, false, true);
  }


  tableBookingStatus(id, data) {
    return this.httpPutResponse(`table-booking/update-status`, data, id, false, true);
  }

  invoiceStatus(id, data) {
    return this.httpPutResponse(`invoice/update-status`, data, id, false, true);
  }

  addOrder(data) {
    return this.httpPostResponse('order', data, null, true, true);
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
  serialize = (obj: any, skipRestaurantId: boolean = false) => {
    console.log(localStorage.getItem('restaurant_id'));
    if (!skipRestaurantId) {
      obj['restaurant_id'] = localStorage.getItem('restaurant_id') ? localStorage.getItem('restaurant_id') : -1;
    }

    const str: any[] = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        let f: string = encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]);
        str.push(f);
      }
    }
    return str.join('&');
  };

  // MESSAGES API
  getMessages() {
    return this.httpGetResponse('message', null, false, true);
  }
  getMessageById(id) {
    return this.httpGetResponse(`message/${id}`, null, false, true);
  }
  replyMessage(data, id) {
    return this.httpPutResponse('message/reply', data, id, false, true);
  }

  // Currency
  getCurrencies(params = {}) {
    const query = this.serialize(params);
    return this.httpGetResponse('currency' + (query ? `?${query}` : ''), null, false, true);
  }

  // Expense Categories API

  getExpenseCategories(params = {}) {
    const query = this.serialize(params);
    return this.httpGetResponse('expense-category' + (query ? `?${query}` : ''), null, false, true);
  }

  getExpenseCategoryById(id: any) {
    return this.httpGetResponse(`expense-category/${id}`, null, false, true);
  }

  addExpenseCategory(data: any) {
    return this.httpPostResponse('expense-category', data, null, false, true);
  }

  updateExpenseCategory(id: any, data: any) {
    return this.httpPutResponse('expense-category', data, id, false, true);
  }

  removeExpenseCategory(id: any) {
    return this.httpDeleteResponse('expense-category', id, false, true);
  }

  // Expense API

  getExpenses(params = {}) {
    const query = this.serialize(params);
    return this.httpGetResponse('expense' + (query ? `?${query}` : ''), null, false, true);
  }

  getExpenseById(id: any) {
    return this.httpGetResponse(`expense/${id}`, null, false, true);
  }

  addExpense(data: any) {
    return this.httpPostResponse('expense', data, null, true, true);
  }

  updateExpense(id: any, data: any) {
    return this.httpPutResponse('expense', data, id, true, true);
  }

  removeExpense(id: any) {
    return this.httpDeleteResponse('expense', id, false, true);
  }

  updateExpenseStatus(id: any, data: any) {
    return this.httpPutResponse('expense/update-status', data, id, false, true);
  }

  updateExpenseType(id: any, data: any) {
    return this.httpPutResponse('expense/update-type', data, id, false, true);
  }

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

  updateGeneralSettings(data, id) {
    return this.httpPutResponse('restaurant/general-settings', data, id, true, true);
  }

  updateOrderSettings(data, id) {
    return this.httpPutResponse('restaurant/order-settings', data, id, true, true);
  }

  // Timing Settings
  addTimingSettings(data, restaurantId?: any) {
    // Add restaurant_id to the data payload instead of using localStorage
    if (restaurantId) {
      data['restaurant_id'] = restaurantId;
    }
    // Use httpResponse directly to avoid automatic localStorage restaurant_id addition
    return this.httpResponse('post', 'restaurant-timing/config', data, null, true, true);
  }
  updateTimingSettings(data, id) {
    return this.httpPutResponse('restaurant-timing/config', data, id, true, true);
  }
  getTimingData(restaurantId?: any) {
    const params = restaurantId ? { restaurant_id: restaurantId } : {};
    const query = this.serialize(params, true); // Skip adding restaurant_id from localStorage
    return this.httpGetResponse('restaurant-timing/data' + (query ? `?${query}` : ''), null, true, true);
  }
  // =================== Invoice Settings ===================

  getAllInvoiceSettings() {
    return this.httpGetResponse('invoice-settings', null, false, false);
  }

  getInvoiceSettingById(id: any) {
    return this.httpGetResponse(
      `invoice-settings/${id}`,
      null,
      false,
      false
    );
  }

  createInvoiceSetting(data: any) {
    return this.httpPostResponse(
      'invoice-settings',
      data,
      null,
      false,
      true
    );
  }

  updateInvoiceSetting(id: any, data: any) {
    return this.httpPutResponse(
      `invoice-settings/${id}`,
      data,
      null,
      false,
      true
    );
  }

  deleteInvoiceSetting(id: any) {
    return this.httpDeleteResponse(
      `invoice-settings/${id}`,
      null,
      false,
      true
    );
  }

  // Get certificate (GET /qz/certificate)
getQzCertificate() {
  return this.httpGetResponse('qz/certificate', null, false, false);
}

// Sign message (POST /qz/sign)
signQzMessage(data: any) {
  return this.httpPostResponse('qz/sign', data, null, false, false);
}


}
