import { NgModule } from '@angular/core';
import { Component, HostListener } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { AddOrderService } from '../add-order.service';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-add-order-products',
  templateUrl: './add-order-products.component.html',
  styleUrl: './add-order-products.component.scss'
})
export class AddOrderProductsComponent {
  columnClass: string = 'col-4'; // Default column class
  buttonLabel = 'Add Product';

  constructor(
    public orderService: AddOrderService,
    public currencyService: CurrencyService
  ) {
    this.initialize();
    this.updateColumnClass(window.innerWidth); // Initialize column class based on current screen size
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateColumnClass(event.target.innerWidth);
  }

  private updateColumnClass(width: number) {
    if (width > 1600) {
      this.columnClass = 'col-2';
      this.buttonLabel = 'Select';
    } else if (width > 1200) {
      this.columnClass = 'col-2';
      this.buttonLabel = 'Select';
    } else if (width > 940) {
      this.columnClass = 'col-3';
      this.buttonLabel = 'Add Product';
    } else if (width > 768) {
      this.columnClass = 'col-4';
      this.buttonLabel = 'Add Product';
    } else if (width > 400) {
      this.columnClass = 'col-6';
      this.buttonLabel = 'Add Product';
    } else if (width > 360) {
      this.columnClass = 'col-12';
      this.buttonLabel = 'Add Product';
    } else {
      this.columnClass = 'col-12';
      this.buttonLabel = 'Add Product';
    }
  }

  async initialize() {
    this.orderService.searchProducts('');

    setTimeout(() => {
      console.log(this.orderService.selected_products);
    }, 2000);
  }

  setSelectedToggle(product) {
    product.selected = !product.selected;
    this.orderService.updateProductInSelectedProducts(product);
  }

  isProductSelected(productId: any): boolean {
    // Check if a product with the given ID exists in the selected_products array
    return this.orderService.selected_products.some((product) => product.id === productId);
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

  selectedChange($event) {
    let v = $event.target.value;
    console.log(v);

    for (var i = 0; i < this.orderService.categories.length; i++) {
      this.orderService.categories[i]['active'] = this.orderService.categories[i]['id'] == v;
    }

    let item = this.orderService.categories.find((item) => item.id == v);
    this.orderService.updateProductsBySelectedCategory(item);
  }

  searchProducts($event) {
    let v = $event.target.value;
    this.orderService.searchProducts(v);
  }
}
