import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddOrderService } from './add-order.service';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-add-orders',
  templateUrl: './add-orders.component.html',
  styleUrl: './add-orders.component.scss'
})
export class AddOrdersComponent implements OnInit, OnDestroy {
  constructor(
    public nav: NavService,
    public orderService: AddOrderService,
    private network: NetworkService
  ) {}
  restaurant;
  ngOnInit(): void {
    this.orderService.showOrderHeader = false;
    this.getRestaurants();
  }

  ngOnDestroy(): void {
    this.orderService.showOrderHeader = true;
  }

  async onSubmit($event: Event) {
    $event.preventDefault(); // Prevent default form behavior
    const res = await this.orderService.submitOrder();
    if (res) {
      console.log('Order submitted successfully.');
      this.printSlip();
    } else {
      console.error('Order submission failed.');
    }
  }
  onTypeChange(event: any): void {
    console.log('Selected Type:', this.selectedType);
    // Perform additional logic here (like sending it to the backend)
  }
  selectedType: string = 'dine-in';
  selectedStatus: string = 'pending'; // Default status

  onStatusChange(event: any): void {
    console.log('Selected Status:', this.selectedStatus);
    // Perform additional logic like sending status to the backend
  }

  searchProducts($event) {
    let v = $event.target.value;
    this.orderService.searchProducts(v);
  }
  printSlip() {
    const printContents = document.getElementById('print-section')?.innerHTML;
    const originalContents = document.body.innerHTML;

    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // Reload the page to restore the original view
    } else {
      console.error('Print section not found.');

    }
  }
  async getRestaurants(): Promise<void> {
    let obj = {
      search: '',
      perpage: 500,

      restaurant_id: localStorage.getItem('restuarant_id') ? localStorage.getItem('restuarant_id') : -1
    };

    const res = await this.network.getRestaurants(obj);

    if (res && res['data']) {
      let d = res['data'];
      let dm = d['data'];

 this.restaurant = localStorage.getItem('restuarant_id') ?  localStorage.getItem('restuarant_id') : -1;
    }
  }


}
