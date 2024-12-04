import { Component } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-add-order-products',
  templateUrl: './add-order-products.component.html',
  styleUrl: './add-order-products.component.scss'
})
export class AddOrderProductsComponent {

  products: any[] = [];

  constructor(private network: NetworkService){
    this.initialize()
  }

  async initialize(){
    let obj = {
      category: 1,
      perpage: 500
    }
    const res = await this.network.getProducts(obj);

    if(res.data){
      let d = res.data.data;
      console.log(d)
      this.products = d;
    }

  }
}
