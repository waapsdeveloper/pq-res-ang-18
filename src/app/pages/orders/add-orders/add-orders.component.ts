import { CouponsService } from './../../coupons/coupons.service';
import { Component, OnDestroy, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { AddOrderService } from './add-order.service';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-add-orders',
  templateUrl: './add-orders.component.html',
  styleUrl: './add-orders.component.scss',
  animations: [
    trigger('slideToggle', [
      state('closed', style({ height: '0', overflow: 'hidden', opacity: 0 })),
      state('open', style({ height: '*', opacity: 1 })),
      transition('closed <=> open', animate('300ms ease'))
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class AddOrdersComponent implements OnInit, OnDestroy {
  screenWidth: number;
  screenHeight: number;

  constructor(
    public nav: NavService,
    public orderService: AddOrderService,
    private network: NetworkService
  ) {
    this.updateScreenSize(); // Initialize screen size on component load
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateScreenSize();
  }

  private updateScreenSize(): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    console.log(`Screen Width: ${this.screenWidth}, Screen Height: ${this.screenHeight}`);
  }

  restaurant;
  tempCustomerName: any = null;
  tempCustomerPhone: any = null;
  walkInCustomer = {
    id: 7,
    name: 'Walk-in Customer',
    email: 'david.wilson@example.com',
    dial_code: null,
    phone: '1234567890' // Updated phone number
  };
  filteredSuggestions = [this.walkInCustomer];

  showForm = false;
  tabs: any[] = [
    { name: 'order', title: 'Overview', icon: 'ft-layers', active: true },
    { name: 'customer', title: 'Customer', icon: 'ft-user', active: false },
    { name: 'payment', title: 'Notes', icon: 'ft-credit-card', active: false }
  ];

  activeTabName = 'order';

  toggleForm() {
    this.showForm = !this.showForm;
  }

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
      restaurant_id: localStorage.getItem('restaurant_id') ? localStorage.getItem('restaurant_id') : -1
    };

    const res = await this.network.getRestaurants(obj);

    if (res && res['data']) {
      let d = res['data'];
      let dm = d['data'];
    }
    this.restaurant = localStorage.getItem('restaurant') ? localStorage.getItem('restaurant') : -1;
    this.restaurant = JSON.parse(this.restaurant);
    console.log('Restaurant:', this.restaurant);
  }

  makeWalkingCustomer() {
    this.orderService.makeWalkingCustomer();
  }

  onInputChange(data) {
    console.log('Input changed', data);
    this.fetchSuggestions(data);
  }

  async fetchSuggestions(query: any) {
    let v = query.trim();
    console.log(v);

    if (!v) {
      this.filteredSuggestions = [this.walkInCustomer]; // Clear suggestions if input is empty
    } else {
      let obj = {
        search: v
      };

      const res = await this.network.index('user', obj);
      let array = res?.data?.data || [];
      this.filteredSuggestions = [this.walkInCustomer, ...array]; // Extend API response with Walk-in Customer
    }

    console.log(this.filteredSuggestions);
  }

  onInputChangePhone(data) {
    console.log('Input changed', data);
    if (!data) return;
    this.fetchSuggestionsPhone(data);
  }

  async fetchSuggestionsPhone(query: any) {
    let temp = {
      phone: query
    };

    let obj = {
      filters: JSON.stringify(temp)
    };

    const res = await this.network.index('user', obj);
    let array = res?.data?.data || [];
    this.filteredSuggestions = [this.walkInCustomer, ...array]; // Extend API response with Walk-in Customer

    console.log(this.filteredSuggestions);
  }

  setActiveTab(name: string) {
    for (var i = 0; i < this.tabs.length; i++) {
      this.tabs[i]['active'] = this.tabs[i]['name'] == name;
    }
    console.log('Selected tab:', this.tabs);
    this.activeTabName = name;
  }

  updateProductsBySelectedTab(item) {
    // this.orderService.updateProductsBySelectedTab(item);
  }

  onCustomerFieldChange() {
    // Assign values to orderService when both fields are filled
    if (this.tempCustomerName && this.tempCustomerPhone) {
      this.orderService.customer_name = typeof this.tempCustomerName === 'string' ? this.tempCustomerName : this.tempCustomerName.name;
      this.orderService.customer_phone = typeof this.tempCustomerPhone === 'string' ? this.tempCustomerPhone : this.tempCustomerPhone.phone;
    }
  }

  onSuggestionSelected(selected: any) {
    if (selected && typeof selected === 'object') {
      // Populate both fields from API response
      this.tempCustomerName = selected.name;
      this.tempCustomerPhone = selected.phone;
    } else {
      // Handle manual input
      this.checkAndAssignManualInputs();
    }
    this.onCustomerFieldChange();
  }

  onCustomerNameSelected(event: any) {
    if (event && typeof event === 'object') {
      // Autofill phone if selected from suggestions
      this.tempCustomerName = event.name;
      this.tempCustomerPhone = event?.phone ? event?.phone : this.tempCustomerPhone;
    } else {
      // Handle manual input
      this.tempCustomerName = event;
    }
    this.onCustomerFieldChange();
  }

  onCustomerPhoneSelected(event: any) {
    if (event && typeof event === 'object') {
      // Autofill name if selected from suggestions
      this.tempCustomerName = event?.name ? event?.name : this.tempCustomerName;
      this.tempCustomerPhone = event.phone;
    } else {
      // Handle manual input
      this.tempCustomerPhone = event;
    }
    // this.onCustomerFieldChange();
  }

  checkAndAssignManualInputs() {
    // Assign manually typed values if both are strings
    if (typeof this.tempCustomerName === 'string' && typeof this.tempCustomerPhone === 'string') {
      this.orderService.customer_name = this.tempCustomerName;
      this.orderService.customer_phone = this.tempCustomerPhone;
    }
  }
}
