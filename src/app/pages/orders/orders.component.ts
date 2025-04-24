import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AddOrderService } from './add-orders/add-order.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  isAddOrderRoute: boolean = false;
  showBtopHeader = true;
  private routerSubscription: Subscription;

  constructor(private router: Router, public orderService: AddOrderService) {
    // Subscribe to router events to handle navigation changes
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isAddOrderRoute = event.url.includes('orders/add');
      this.showBtopHeader = !this.isAddOrderRoute;
      
      // Reset service state when leaving add order route
      if (!this.isAddOrderRoute) {
        this.orderService.resetFields();
      }
    });
  }

  ngOnInit(): void {
    // Set initial route state
    this.isAddOrderRoute = this.router.url.includes('orders/add');
    this.showBtopHeader = !this.isAddOrderRoute;
  }

  ngOnDestroy(): void {
    // Clean up subscription to prevent memory leaks
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
