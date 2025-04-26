import { UtilityService } from './../../../services/utility.service';
import { Injectable } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';

@Injectable({
  providedIn: 'root'
})
export class AddOrderService {
  showOrderHeader = true;

  categories: any[] = [];
  products: any[] = [];
  customer_name: string = '';
  customer_phone: string = '';
  order_notes: string = '';
  total_price: number = 0;
  selectedCategory = null;
  selectedTableId = null;
  orderType = '';
  customer_address: string = '';
  selected_products: any[] = [];
  paymentMethod: string = '';
  couponCode;
  discountAmount = 0;
  final_total = 0;
  paymentMethods: { label: string; value: string }[] = [
    { label: 'Cash on Delivery', value: 'cashondelivery' },
    { label: 'Apple Pay', value: 'applePay' },
    { label: 'Google Pay', value: 'googlePay' },
    { label: 'Credit/Debit Card', value: 'card' },
    { label: 'PayPal', value: 'paypal' }
  ];
  totalCost = 0;

  constructor(
    private network: NetworkService,
    private utilityService: UtilityService
  ) {
    this.initialize();
  }

  async searchProducts(search) {
    let obj = {
      perpage: 500,
      page: 1,
      search: search,

      restaurant_id: localStorage.getItem('restaurant_id') ? localStorage.getItem('restaurant_id') : -1
    };
    const res = await this.network.getProducts(obj);
    // console.log(res)

    if (res.data) {
      let d = res.data.data;
      console.log(d);
      this.products = d;
    }
  }

  async initialize() {
    let obj = {
      perpage: 500,
      page: 1,

      restaurant_id: localStorage.getItem('restaurant_id') ? localStorage.getItem('restaurant_id') : -1
    };
    const res = await this.network.getCategories(obj);
    // console.log(res)

    if (res.data) {
      let d = res.data.data;
      console.log(d);
      let totalProducts = d.reduce((acc, category) => {
        return acc + (category.product_count || 0); // Use 0 if product_count is undefined
      }, 0);
      // add a first item as all categories
      d.unshift({
        id: -1,
        name: 'All',
        product_count: totalProducts,
        active: true
      });
      this.selectedCategory = d[0];
      this.categories = d;
    }
  }

  async updateProductsBySelectedCategory(category) {
    let obj = {
      filters: JSON.stringify({
        category_id: category.id === -1 ? null : category.id // Don't send category_id if -1
      }),
      perpage: 500,
      restaurant_id: localStorage.getItem('restaurant_id') ? localStorage.getItem('restaurant_id') : -1
    };

    try {
      const res = await this.network.getProducts(obj);

      if (!res || res.status === 400) {
        this.products = [];
        return false;
      }

      if (res.data) {
        this.products = res.data.data;
      }

      return true;
    } catch (error) {
      console.error('Error fetching products:', error);
      this.products = [];
      return false;
    }
  }

  async updateProductInSelectedProducts(product: any) {
    if (product.selected) {
      // Check if the product already exists in selected_products
      const exists = this.selected_products.some((p) => p.id === product.id);
      if (!exists) {
        // Add the product if it doesn't exist
        let p = Object.assign({}, product);
        p['quantity'] = 1;
        p['cost'] = p['quantity'] * 1;

        // check and process variations and set to p object
        if (p.variation && Array.isArray(p.variation) && p.variation.length > 0) {
          let temp = p.variation[0];
          let json;

          json = temp['meta_value'] ? JSON.parse(temp['meta_value']) : [];

          console.log('JSON', json);
          p['variation'] = json;
        } else {
          p['variation'] = []; // Set default valuef or handle appropriately
        }

        console.log(p);
        this.selected_products.push(p);
      }
    } else {
      // If product.selected is false, remove the product from selected_products
      this.selected_products = this.selected_products.filter((p) => p.id !== product.id);
    }

    this.totalOfProductCost();
  }

  async removeProductInSelectedProducts(index) {
    this.selected_products.splice(index, 1);
    this.totalOfProductCost();
  }
  async totalOfProductCost() {
    let cost = this.selected_products.reduce((prev, next) => {
      // Calculate base product cost
      let productCost = next.quantity * next.price;

      // Check if variations exist and calculate the cost of selected variations
      if (next.variation) {
        next.variation.forEach((variation: any) => {
          if (variation.options) {
            variation.options.forEach((option: any) => {
              if (option.selected) {
                // Add variation option price to the product cost
                productCost += option.price;
              }
            });
          }
        });
      }

      return prev + productCost; // Add product cost to the total
    }, 0);

    this.totalCost = cost; // Update the total cost
  }
  selectSuggestion(suggestion: any) {
    console.log(suggestion);
    this.customer_name = suggestion.name;
    this.customer_phone = suggestion.phone;
  }
  makeWalkingCustomer() {
    this.customer_name = 'Walk-in Customer';
    this.customer_phone = '0000000000';
    this.orderType = 'dine-in';
    this.paymentMethod = 'card';
  }

  resetField() {
    this.customer_name = '';
    this.customer_phone = '';
    this.order_notes = '';
    this.selected_products = [];
    this.selectedTableId = null;
    this.orderType = '';
    this.paymentMethod = '';
    this.couponCode = '';
    this.discountAmount = 0;
    this.final_total = 0;
    this.totalCost = 0;
    this.customer_address = '';
  }

  async submitOrder() {
    let prodObj = this.selected_products.map((item) => {
      //   item.price = this.totalCost;
      if (item.variation) {
        item.variation.forEach((variation: any) => {
          if (variation.options) {
            variation.options.forEach((option: any) => {
              if (option.selected) {
                // Add variation option price to the product cost
                item.price = Number(item.price) + Number(option.price);
              }
            });
          }
        });
      }

      return {
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
        notes: item.notes,
        variation: item.variation
      };

      this.total_price += item.price;
    });

    if (prodObj.length == 0) {
      return false;
    }

    console.log('order submitted');
    if (!this.customer_name || this.customer_name.trim() === '') {
      this.utilityService.presentFailureToast('Please enter Customer Name');
      return false;
    }

    if (!this.customer_phone || !/^\d{10,15}$/.test(this.customer_phone)) {
      this.utilityService.presentFailureToast('Please enter a valid Phone Number (10-15 digits)');
      return false;
    }

    if (!this.orderType || this.orderType.trim() === '') {
      this.utilityService.presentFailureToast('Please select an Order Type');
      return false;
    }

    if (!this.paymentMethod || this.paymentMethod.trim() === '') {
      this.utilityService.presentFailureToast('Please select a Payment Method');
      return false;
    }
    let obj = {
      customer_name: this.customer_name,
      customer_phone: this.customer_phone,
      delivery_address: this.customer_address,
      products: prodObj,
      notes: this.order_notes,
      status: 'pending',
      final_total: this.final_total,
      discount_value: this.discountAmount,
      coupon_code: this.couponCode,
      payment_method: this.paymentMethod,
      order_type: this.orderType,
      table_id: this.selectedTableId,
      total_price: this.totalCost
    };
    let coupon = {
      code: this.couponCode
    };
    const res = await this.network.addOrder(obj);
    console.log(res);
    localStorage.setItem('order_id', res?.data?.order_number);
    const response = await this.network.updateCouponUsage(coupon);
    console.log(response);
    // this.resetFields();
    // this.clearSelectedProducts();
    return !res ? false : true;
  }

  async updateOrder(orderId: number) {
    let prodObj = this.selected_products.map((item) => {
      //   item.price = this.totalCost;
      if (item.variation) {
        item.variation.forEach((variation: any) => {
          if (variation.options) {
            variation.options.forEach((option: any) => {
              if (option.selected) {
                // Add variation option price to the product cost
                item.price = Number(item.price) + Number(option.price);
              }
            });
          }
        });
      }

      return {
        product_id: item.product_id || item.id,
        quantity: item.quantity,
        price: item.product_price || item.price,
        notes: item.notes,
        variation: item.variation
      };

      this.total_price += item.price;
    });

    if (prodObj.length == 0) {
      return false;
    }

    console.log('order submitted');
    if (!this.customer_name || this.customer_name.trim() === '') {
      this.utilityService.presentFailureToast('Please enter Customer Name');
      return false;
    }

    if (!this.customer_phone || !/^\d{10,15}$/.test(this.customer_phone)) {
      this.utilityService.presentFailureToast('Please enter a valid Phone Number (10-15 digits)');
      return false;
    }

    if (!this.orderType || this.orderType.trim() === '') {
      this.utilityService.presentFailureToast('Please select an Order Type');
      return false;
    }

    if (!this.paymentMethod || this.paymentMethod.trim() === '') {
      this.utilityService.presentFailureToast('Please select a Payment Method');
      return false;
    }
    let obj = {
      customer_name: this.customer_name,
      customer_phone: this.customer_phone,
      delivery_address: this.customer_address,
      products: prodObj,
      notes: this.order_notes,
      status: 'pending',
      final_total: this.final_total,
      discount_value: this.discountAmount,
      coupon_code: this.couponCode,
      payment_method: this.paymentMethod,
      order_type: this.orderType,
      table_id: this.selectedTableId,
      total_price: this.totalCost
    };
    try {
      const res = await this.network.updateOrder(obj, orderId);
      console.log(res);
      // localStorage.setItem('order_id', res?.data?.order_number);
      // const response = await this.network.updateCouponUsage(coupon);
      // console.log(response);
      // this.resetFields();
      // this.clearSelectedProducts();
      return !res ? false : true;
    } catch (error) {
      console.error('Error updating order:', error);
      this.utilityService.presentFailureToast('Error updating order. Please try again.');
      return false;
    }
  }

  resetFields() {
    this.discountAmount = 0;
    this.final_total = 0;
  }
  async applyCoupon() {
    this.resetFields();
    let obj = {
      code: this.couponCode
    };

    const res = await this.network.getAvailableCoupon(obj);
    console.log(res?.coupon);

    const data = res?.coupon;
    console.log(data);

    if (!data) {
      console.warn('No coupon data available');
      return;
    }

    let discountValue = data?.discount_value || 0;
    let calculatedDiscount = 0; // To store the calculated discount before applying it

    if (data?.discount_type === 'percentage') {
      // Calculate discount as a percentage
      calculatedDiscount = (this.totalCost * discountValue) / 100;
    } else if (data?.discount_type === 'fixed') {
      // Directly assign the fixed discount amount
      calculatedDiscount = discountValue;
    } else {
      console.warn('Invalid discount type');
      return;
    }

    // Check if the discount exceeds 50% of the total cost
    if (calculatedDiscount > this.totalCost * 0.5) {
      console.error('Invalid coupon: Discount exceeds 50% of the total cost.');
      this.utilityService.presentFailureToast('Invalid coupon: Discount cannot exceed 50% of the total cost.'); // Display error message
      return;
    }

    // Apply the validated discount
    this.discountAmount = calculatedDiscount;
    this.final_total = Math.max(this.totalCost - this.discountAmount, 0);

    console.log('Final total after discount:', this.final_total);
  }

  clearSelectedProducts() {
    this.selected_products = [];
    this.selectedTableId = -1;
    this.orderType = '';
    this.totalCost = 0;
    this.customer_name = '';
    this.customer_phone = '';
    this.order_notes = '';
    this.couponCode = '';
    this.discountAmount = 0;
    this.final_total = 0;
  }
}
