import { NgModule } from '@angular/core';
import { Component, HostListener } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { AddOrderService } from '../add-order.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { GlobalDataService } from 'src/app/services/global-data.service';

@Component({
  selector: 'app-add-order-products',
  templateUrl: './add-order-products.component.html',
  styleUrl: './add-order-products.component.scss'
})
export class AddOrderProductsComponent {
  columnClass: string = 'col-4'; // Default column class
  buttonLabel = 'Add Product';
  currency = 'USD';
  currencySymbol = '$';
  constructor(
    public orderService: AddOrderService,
    public currencyService: CurrencyService,
    private globalData: GlobalDataService
  ) {
    this.initialize();
    this.updateColumnClass(window.innerWidth); // Initialize column class based on current screen size
    this.globalData.getCurrency().subscribe((currency) => {
      this.currency = currency;
      console.log('Currency updated:', this.currency);
    });

    this.globalData.getCurrencySymbol().subscribe((symbol) => {
      this.currencySymbol = symbol;
      console.log('Currency Symbol updated:', this.currencySymbol);
    });
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

  addOrIncrementProduct(product: any) {
    const existing = this.orderService.selected_products.find((p) => p.id === product.id);
    if (existing) {
      existing.quantity += 1;
      this.orderService.totalOfProductCost();
    } else {
      product.selected = true;
      this.orderService.updateProductInSelectedProducts(product);
    }
  }

  decrementOrRemoveProduct(product: any) {
    const existing = this.orderService.selected_products.find((p) => p.id === product.id);
    if (existing) {
      if (existing.quantity > 1) {
        existing.quantity -= 1;
        this.orderService.totalOfProductCost();
      } else {
        // Remove from selected_products
        product.selected = false;
        this.orderService.updateProductInSelectedProducts(product);
      }
    }
  }

  getProductQuantity(productId: any): number {
    const found = this.orderService.selected_products.find((p) => p.id === productId);
    return found ? found.quantity : 0;
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
