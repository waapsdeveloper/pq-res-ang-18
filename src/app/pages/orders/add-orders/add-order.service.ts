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
  orderType = '';
  selected_products: any[] = [];

  totalCost = 0;

  constructor(private network: NetworkService) {
    this.initialize();
  }

  async searchProducts(search) {
    let obj = {
      perpage: 500,
      page: 1,
      search: search,
      restaurant_id: localStorage.getItem('restuarant_id')
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
      restaurant_id: localStorage.getItem('restuarant_id')
    };
    const res = await this.network.getCategories(obj);
    // console.log(res)

    if (res.data) {
      let d = res.data.data;
      console.log(d);
      this.categories = d;
    }
  }

  async updateProductsBySelectedCategory(category) {
    let obj = {
      filters: JSON.stringify({
        category_id: category.id,
      }),
      perpage: 500,
      restaurant_id: localStorage.getItem('restuarant_id')
      
    };
    const res = await this.network.getProducts(obj);

    if (res.data) {
      let d = res.data.data;
      console.log(d);
      this.products = d;
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
          p['variation'] = []; // Set default value or handle appropriately
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
    let obj = {
      customer_name: this.customer_name,
      customer_phone: this.customer_phone,
      products: prodObj,
      notes: this.order_notes,
      status: 'pending',
      type: this.orderType,
      total_price: this.totalCost
    };

    const res = await this.network.addOrder(obj);
    console.log(res);

    this.selected_products = [];

    return true;
  }
}
