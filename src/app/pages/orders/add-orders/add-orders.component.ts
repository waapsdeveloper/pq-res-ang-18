import { CouponsService } from './../../coupons/coupons.service';
import { Component, OnDestroy, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { AddOrderService } from './add-order.service';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { UtilityService } from 'src/app/services/utility.service';

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
  showCoupon;

  constructor(
    public nav: NavService,
    public orderService: AddOrderService,
    private network: NetworkService,
    private utilityService: UtilityService
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
  tempCustomerAddress: any = null;
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
    $event.preventDefault();

    // 1) Ask for confirmation up front
    const confirmed = await this.utilityService.presentConfirm(
      'Create Order',
      'Cancel',
      'Are you sure?',
      'Do you really want to create this order?'
    );
    if (!confirmed) {
      // User clicked “Cancel”
      return;
    }

    // Validate all required fields first
    if (!this.orderService.selected_products?.length) {
      this.utilityService.presentFailureToast('Please select at least one product');
      return;
    }

    if (!this.orderService.customer_name?.trim()) {
      this.utilityService.presentFailureToast('Please enter Customer Name');
      return;
    }

    if (!this.orderService.customer_phone || !/^\d{10,15}$/.test(this.orderService.customer_phone)) {
      this.utilityService.presentFailureToast('Please enter a valid Phone Number (10-15 digits)');
      return;
    }

    if (!this.orderService.orderType?.trim()) {
      this.utilityService.presentFailureToast('Please select an Order Type');
      return;
    }

    if (!this.orderService.paymentMethod?.trim()) {
      this.utilityService.presentFailureToast('Please select a Payment Method');
      return;
    }

    try {
      // Show confirmation popup only after all validations pass
      const flag = await this.utilityService.presentConfirm(
        'Create Order and Print Bill',
        'Just Create Order',
        'Order creation',
        'Do you Want to Create the Order?'
      );

      // Submit order and handle response
      const res = await this.orderService.submitOrder();
      console.log('Order submission response:', res);
      if (!res) {
        return;
      }

      // Order submitted successfully - handle print or reload
      if (flag) {
        // Print bill flow
        this.printSlip();
        this.utilityService.presentSuccessToast('Order created and bill printed successfully!');
      } else {
        // Just create order flow
        this.utilityService.presentSuccessToast('Order created successfully!');
      }

      // Reload page only after successful submission
      setTimeout(() => {
        window.location.reload();
      }, 700);
    } catch (error) {
      console.error('Error submitting order:', error);
      this.utilityService.presentFailureToast('Error creating order. Please try again.');
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

    console.log(this.filteredSuggestions, 'filtered suffe');
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
      console.log('Selected suggestion:', selected);
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
      console.log('Selected suggestion:', event);
      this.tempCustomerName = event.name;
      this.tempCustomerPhone = event?.phone ? event?.phone : this.tempCustomerPhone;
      this.tempCustomerAddress = event?.address ? event?.address : this.tempCustomerAddress;

      this.orderService.customer_name = this.tempCustomerName;
      this.orderService.customer_phone = this.tempCustomerPhone;
      this.orderService.customer_address = this.tempCustomerAddress;
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
      this.tempCustomerAddress = event?.address ? event?.address : this.tempCustomerAddress;
      this.orderService.customer_name = this.tempCustomerName;
      this.orderService.customer_phone = this.tempCustomerPhone;
      this.orderService.customer_address = this.tempCustomerAddress;
    } else {
      // Handle manual input
      this.tempCustomerPhone = event;
    }
    // this.onCustomerFieldChange();
  }
  onInputChangeAddress(event: any) {}
  onCustomerAddressSelected(event: any) {
    if (event && typeof event === 'object') {
      // Autofill name if selected from suggestions
      this.tempCustomerName = event?.name ? event?.name : this.tempCustomerName;
      this.tempCustomerPhone = event.phone;
      this.orderService.customer_name = this.tempCustomerName;
      this.orderService.customer_phone = this.tempCustomerPhone;
    } else {
      // Handle manual input
      this.tempCustomerPhone = event;
    }
  }

  checkAndAssignManualInputs() {
    // Assign manually typed values if both are strings
    if (typeof this.tempCustomerName === 'string' && typeof this.tempCustomerPhone === 'string') {
      this.orderService.customer_name = this.tempCustomerName;
      this.orderService.customer_phone = this.tempCustomerPhone;
    }
  }
}
