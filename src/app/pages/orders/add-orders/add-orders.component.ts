import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddOrderService } from './add-order.service';
import { NavService } from 'src/app/services/basic/nav.service';

@Component({
  selector: 'app-add-orders',
  templateUrl: './add-orders.component.html',
  styleUrl: './add-orders.component.scss'
})
export class AddOrdersComponent implements OnInit, OnDestroy {
  constructor(
    public nav: NavService,
    public orderService: AddOrderService
  ) {}

  ngOnInit(): void {
    this.orderService.showOrderHeader = false;
  }

  ngOnDestroy(): void {
    this.orderService.showOrderHeader = true;
  }

  async onSubmit($event) {
    const res = await this.orderService.submitOrder();
    if (res) {
      this.nav.pop();
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
}
