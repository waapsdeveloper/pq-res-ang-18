import { Injectable } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';

@Injectable({
  providedIn: 'root'
})
export class AddOrderService {

  categories: any[] = [];
  products: any[] = [];

  selectedCategory = null;
  selected_products: any[] = [];

  totalCost = 0;




  constructor(private network: NetworkService,) {
    this.initialize()
  }

  async initialize() {
    let obj = {
      perpage: 500,
      page: 1
    }
    const res = await this.network.getCategories(obj)
    // console.log(res)

    if (res.data) {
      let d = res.data.data;
      console.log(d)
      this.categories = d;
    }

  }

  async updateProductsBySelectedCategory(category) {

    let obj = {
      category_id: category.id,
      perpage: 500
    }
    const res = await this.network.getProducts(obj);

    if (res.data) {
      let d = res.data.data;
      console.log(d)
      this.products = d;
    }

  }

  async updateProductInSelectedProducts(product: any) {
    if (product.selected) {
      // Check if the product already exists in selected_products
      const exists = this.selected_products.some(p => p.id === product.id);
      if (!exists) {
        // Add the product if it doesn't exist
        let p = Object.assign({}, product);
        p['quantity'] = 1;
        p['cost'] = p['quantity'] * 1;
        this.selected_products.push(p);
      }
    } else {
      // If product.selected is false, remove the product from selected_products
      this.selected_products = this.selected_products.filter(p => p.id !== product.id);
    }

    this.totalOfProductCost();
  }

  async removeProductInSelectedProducts(index) {
    this.selected_products.splice(index, 1);
    this.totalOfProductCost();
  }

  async totalOfProductCost() {
    let cost = this.selected_products.reduce((prev, next) => {
      return prev + (next.quantity * next.price)
    }, 0);

    this.totalCost = cost;

  }

  async submitOrder() {


    let prodObj = this.selected_products.map( item => {
      return {
        "product_id": item.id,
        "quantity": item.quantity
      }
    });

    if(prodObj.length == 0){
      return false;
    }

    console.log("order submitted");
    let obj = {
      "customer_name": "Walk-In Customer",
      "customer_phone": "XXXXXXXX",
      "products": prodObj
    }

    const res = await this.network.addOrder(obj);
    console.log(res);

    this.selected_products = [];

    return true;



  }




}
