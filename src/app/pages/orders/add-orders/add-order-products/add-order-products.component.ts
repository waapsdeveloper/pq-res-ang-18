import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { AddOrderService } from '../add-order.service';

@Component({
  selector: 'app-add-order-products',
  templateUrl: './add-order-products.component.html',
  styleUrl: './add-order-products.component.scss'
})
export class AddOrderProductsComponent {



  constructor(public orderService: AddOrderService) {
    this.initialize()
  }

  async initialize() {
    this.orderService.searchProducts('');
  }


  setSelectedToggle(product) {
    product.selected = !product.selected;
    this.orderService.updateProductInSelectedProducts(product);



  }


  isProductSelected(productId: any): boolean {
    // Check if a product with the given ID exists in the selected_products array
    return this.orderService.selected_products.some(product => product.id === productId);
  console.log(productId);

  }
  editNote(product: any, event: Event): void {
    event.stopPropagation(); // Prevent card click event
    product.isEditingNote = true;
  }

  // Save the note for a product
  saveNote(product: any, event: Event): void {
    event.stopPropagation(); // Prevent card click event
    product.isEditingNote = false;

    // Additional logic for saving the note can be added if needed
  }

  // Cancel note editing
  cancelNoteEdit(product: any, event: Event): void {
    event.stopPropagation(); // Prevent card click event
    product.isEditingNote = false;
  }

  // Prevent event propagation
  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  selectedChange($event){

    let v = $event.target.value;
    console.log(v);

    for (var i = 0; i < this.orderService.categories.length; i++) {
      this.orderService.categories[i]['active'] = this.orderService.categories[i]['id'] == v;
    }

    let item = this.orderService.categories.find(item => item.id == v);
    this.orderService.updateProductsBySelectedCategory(item);
  }


  searchProducts($event) {
    let v = $event.target.value;
    this.orderService.searchProducts(v);
  }
}

