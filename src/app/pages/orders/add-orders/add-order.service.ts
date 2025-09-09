import { UtilityService } from './../../../services/utility.service';
import { Injectable, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';
import { GlobalDataService } from 'src/app/services/global-data.service';
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
  deliveryCharges;
  tips = 0;
  tipsAmount = 0;
  customer_address: string = '';
  selected_products: any[] = [];
  printProducts: any[] = [];
  paymentMethod: string = '';
  couponCode;
  logoBase64;
  discountAmount = 0; // set by coupon, else 0
  final_total = 0; // calculated
  taxPercent: number = 0; // Global value for tax percentage
  taxAmount: number = 0; // calculated
  paymentMethods: { label: string; value: string }[] = [
    { label: "Cash", value: "cash" },
    { label: "Credit Card", value: "creditcard" },
    // { label: 'Apple Pay', value: 'applePay' },
    // { label: 'Google Pay', value: 'googlePay' },
    // { label: 'Credit/Debit Card', value: 'card' },
    // { label: 'PayPal', value: 'paypal' }
  ];
  s;
  totalCost = 0;
  isCouponApplied: boolean = false;
  subtotal = 0; // sum of products and options
  lastCouponData: any = null; // Store last fetched coupon data
  orderSummary: {
    subtotal: number;
    discount: number;
    tips: number;
    tax: number;
    total: number;
  } = {
      subtotal: 0,
      discount: 0,
      tips: 0,
      tax: 0,
      total: 0
    };
  updateOrderSummary() {
    this.orderSummary = {
      subtotal: this.subtotal,
      discount: this.discountAmount,
      tips: this.tipsAmount,
      tax: this.taxAmount,
      total: this.final_total
    };
  }


  constructor(
    private network: NetworkService,
    private utilityService: UtilityService,
    private currencyService: CurrencyService,
    private globalData: GlobalDataService
  ) {
    this.initialize();
    this.globalData.getTaxPercentage().subscribe((taxPercentage) => {
      this.taxPercent = taxPercentage;
      console.log('Tax Percentage updated:', this.taxPercent);
    });
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
      restaurant_id: localStorage.getItem('restaurant_id')
        ? localStorage.getItem('restaurant_id')
        : -1
    };

    const res = await this.network.getCategories(obj);

    if (res.data) {
      let d = res.data.data;

      // Filter only Active categories
      d = d.filter((category: any) => category.status === 'Active');

      // Fetch products for each category to calculate only Active products
      for (let category of d) {
        const productRes = await this.network.getProducts({
          filters: JSON.stringify({ category_id: category.id , status: 'Active' }),
          perpage: 500,
          restaurant_id: obj.restaurant_id
        });

        if (productRes && productRes.data) {
          // Count only active products
          category.product_count = productRes.data.data.filter(
            (p: any) => p.status === 'Active'
          ).length;
        } else {
          category.product_count = 0;
        }
      }

      // Calculate total products for "All"
      let totalProducts = d.reduce((acc, category) => acc + (category.product_count || 0), 0);

      // Add "All" option
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



  async updateProductsBySelectedCategory(category: any) {
    let obj = {
      filters: JSON.stringify({
        category_id: category.id === -1 ? null : category.id // Don't send category_id if -1
      }),
      perpage: 500,
      restaurant_id: localStorage.getItem('restaurant_id')
        ? localStorage.getItem('restaurant_id')
        : -1
    };

    try {
      const res = await this.network.getProducts(obj);

      if (!res || res.status === 400) {
        this.products = [];
        return false;
      }

      if (res.data) {
        // ✅ Filter only products with status 'Active'
        this.products = res.data.data.filter((p: any) => p.status === 'Active');
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
      let unitPrice = parseFloat(next.price) || 0;

      // Add all selected variation prices to unit price
      if (next.variation && Array.isArray(next.variation)) {
        next.variation.forEach((variation: any) => {
          if (variation.selectedOption && variation.selectedOption.price) {
            unitPrice += parseFloat(variation.selectedOption.price) || 0;
          }
        });
      }

      // Final product cost = quantity × (base price + variation prices)
      let productCost = (next.quantity || 0) * unitPrice;

      return prev + productCost;
    }, 0);

    this.subtotal = cost;

    // Coupon / discount logic
    if (
      this.couponCode &&
      this.couponCode.trim() !== '' &&
      this.lastCouponData &&
      this.lastCouponData.code === this.couponCode
    ) {
      this.recalculateDiscountWithCoupon(this.lastCouponData);
    } else if (this.couponCode && this.couponCode.trim() !== '') {
      await this.applyCoupon(true);
    } else {
      this.discountAmount = 0;
      this.recalculateTotals();
    }
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
    this.paymentMethod = 'cash';
  }

  resetField() {
    this.updateOrderSummary();
    this.customer_name = 'Walk-in Customer';
    this.customer_phone = '0000010010';
    this.order_notes = '';
    this.printProducts = this.selected_products;
    this.selected_products = [];
    this.selectedTableId = null;
    this.orderType = 'dine-in';
    this.paymentMethod = 'cash';
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
        category: item.category,
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
      is_from_pos: true,
      notes: this.order_notes,
      status: 'pending',
      final_total: this.final_total,
      discount_value: this.discountAmount,
      coupon_code: this.couponCode,
      payment_method: this.paymentMethod,
      order_type: this.orderType,
      table_id: this.selectedTableId,
      total_price: this.totalCost,
      tax_percentage: this.taxPercent,
      tax_amount: this.taxAmount,
      tips: this.tips,
      tips_amount: this.tipsAmount,
      delivery_charges: this.deliveryCharges
    };
    let coupon = {
      code: this.couponCode
    };
    const res = await this.network.addOrder(obj);
    console.log(res.data);
    localStorage.setItem('order_id', res?.data?.order_number);
    this.logoBase64 = res?.data?.restaurant?.logo_base64 || '';
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
        category: item.category,
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
      is_from_pos: true,
      final_total: this.final_total,
      discount_value: this.discountAmount,
      coupon_code: this.couponCode,
      payment_method: this.paymentMethod,
      order_type: this.orderType,
      table_id: this.selectedTableId,
      total_price: this.totalCost,
      tax_percentage: this.taxPercent,
      tax_amount: this.taxAmount,
      tips: this.tips,
      tips_amount: this.tipsAmount,
      delivery_charges: this.deliveryCharges
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
  async applyCoupon(forceApi: boolean = false) {
    // Only call API if coupon code changed or forceApi is true
    if (!this.couponCode || this.couponCode.trim() === '') {
      this.discountAmount = 0;
      this.lastCouponData = null;
      this.recalculateTotals();
      return false;
    }
    if (!forceApi && this.lastCouponData && this.lastCouponData.code === this.couponCode) {
      // Use cached coupon data
      this.recalculateDiscountWithCoupon(this.lastCouponData);
      return true;
    }
    // Fetch from API
    let obj = { code: this.couponCode };
    const res = await this.network.getAvailableCoupon(obj);
    const data = res?.coupon;
    if (!data) {
      this.utilityService.presentFailureToast('No coupon data available');
      this.discountAmount = 0;
      this.lastCouponData = null;
      this.recalculateTotals();
      return false;
    }
    data.code = this.couponCode; // Track which code this data is for
    this.lastCouponData = data;
    this.recalculateDiscountWithCoupon(data);
    return true;
  }

  recalculateDiscountWithCoupon(data: any) {
    let discountValue = data?.discount_value || 0;
    let calculatedDiscount = 0;
    if (data?.discount_type === 'percentage') {
      calculatedDiscount = (this.subtotal * discountValue) / 100;
    } else if (data?.discount_type === 'fixed') {
      calculatedDiscount = discountValue;
    } else {
      this.utilityService.presentFailureToast('Invalid discount type');
      this.discountAmount = 0;
      this.recalculateTotals();
      return;
    }
    if (calculatedDiscount > this.subtotal * 0.5) {
      this.utilityService.presentFailureToast('Invalid coupon: Discount cannot exceed 50% of the subtotal.');
      this.discountAmount = 0;
      this.recalculateTotals();
      return;
    }
    this.discountAmount = calculatedDiscount;
    this.recalculateTotals();
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
    this.taxAmount = 0;
    this.isCouponApplied = false;
    this.tips = 0;
    this.tipsAmount = 0;
  }

  recalculateTotals() {
    // Subtotal is already set
    const discount = this.discountAmount || 0;
    const discountedSubtotal = Math.max(this.subtotal - discount, 0);
    this.taxAmount = (discountedSubtotal * this.taxPercent) / 100;
    let total = discountedSubtotal + this.taxAmount;

    // Calculate tips as a fixed amount if orderType is dine-in
    this.tipsAmount = 0;
    if (this.tips) {
      // Treat tips as a fixed amount
      this.tipsAmount = Number(this.tips) || 0;
      total += this.tipsAmount;
    }

    // Add delivery charges if orderType is delivery
    if (this.orderType === 'delivery' && this.deliveryCharges) {
      total += Number(this.deliveryCharges) || 0;
    }

    this.final_total = total;
  }
}
