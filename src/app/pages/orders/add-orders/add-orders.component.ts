import { CouponsService } from './../../coupons/coupons.service';
import { Component, OnDestroy, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { AddOrderService } from './add-order.service';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { UtilityService } from 'src/app/services/utility.service';
import { Location } from '@angular/common';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CurrencyService } from 'src/app/services/currency.service';
import { GlobalDataService } from 'src/app/services/global-data.service';

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
  itemId;
  restInfo;
  restaurant;
  currency = 'USD';
  currencySymbol = '$';

  showEdit = false;
  private searchSubject = new Subject<string>();
  private phoneSearchSubject = new Subject<string>();
  private searchSubscription: Subscription;
  private phoneSearchSubscription: Subscription;

  showTips = false;

  constructor(
    public nav: NavService,
    public orderService: AddOrderService,
    private network: NetworkService,
    private utilityService: UtilityService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    public currencyService: CurrencyService,
    private globalData: GlobalDataService
  ) {
    this.globalData.getCurrency().subscribe((currency) => {
      this.currency = currency;
      console.log('Currency updated:', this.currency);
    });

    this.globalData.getCurrencySymbol().subscribe((symbol) => {
      this.currencySymbol = symbol;
      console.log('Currency Symbol updated:', this.currencySymbol);
    });
    this.globalData.getTips().subscribe((tips) => {
      this.orderService.tips = tips;
    });
    this.globalData.getDeliveryCharges().subscribe((symbol) => {
      this.orderService.deliveryCharges = symbol;
    });
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

  tempCustomerName: string | { name: string } = 'Walk-in Customer';
  tempCustomerPhone: string | { phone: string } = '0000000000';
  tempCustomerAddress: any = null;
  walkInCustomer = {
    id: 0, // Special ID for walk-in customer
    name: 'Walk-in Customer',
    email: 'walk-in@example.com',
    phone: '0000000000',
    role: 'Customer',
    status: 'Active',
    image: 'http://127.0.0.1:8000/storage/images/user/default-user.png',
    city: '',
    state: '',
    country: ''
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

  async ngOnInit() {
    // this.orderService.taxPercent = await this.currencyService.getTaxFromLocalStorage();
    this.orderService.showOrderHeader = false;
    // Set all defaults using the service method
    this.orderService.makeWalkingCustomer();
    this.tempCustomerName = this.orderService.customer_name;
    this.tempCustomerPhone = this.orderService.customer_phone;
    let restaurant = await this.getRestaurants();
    this.restInfo = restaurant;
    console.log(this.restInfo);
    // Setup debounced search
    this.searchSubscription = this.searchSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe(async (query) => {
      await this.fetchSuggestions(query);
    });

    this.phoneSearchSubscription = this.phoneSearchSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe(async (query) => {
      await this.fetchSuggestionsPhone(query);
    });
    const rew = await this.activatedRoute.snapshot.params;
    this.itemId = rew['id'];
    const res = await this.network.getOrdersById(this.itemId);
    console.log(res);
    if (res && res['order']) {
      this.showEdit = true;
      let dm = res['order'];
      this.orderService.selected_products = dm['products'].map((product: any) => {
        // Check and parse 'variation' if it's a JSON string
        if (typeof product.variation === 'string' && product.variation.trim().startsWith('[')) {
          product.variation = JSON.parse(product.variation);
        }

        // Check and parse 'meta_value' if it's a JSON string
        if (typeof product.meta_value === 'string' && product.meta_value.trim().startsWith('[')) {
          product.meta_value = JSON.parse(product.meta_value);
        }

        product['id'] = parseInt(product['product_id']);

        return product;
      });

      console.log('Selected Products:', this.orderService.selected_products);

      this.orderService.products.forEach((p: any) => {
        console.log('Product:', p);
        if (this.orderService.selected_products.some((sp: any) => Number(sp.id) === p.id)) {
          p.selected = true;
        }
      });

      let obj = {
        name: dm['customer'],
        phone: dm['customer_phone']
      };
      this.filteredSuggestions = [this.walkInCustomer, ...(Array.isArray(obj) ? obj : [obj])];
      this.tempCustomerName = this.filteredSuggestions.find((x) => x.name == dm['customer'])?.name;
      this.tempCustomerPhone = this.filteredSuggestions.find((x) => x.phone == dm['customer_phone'])?.phone;

      this.orderService.customer_name = this.getName(this.tempCustomerName);
      this.orderService.customer_phone = this.getPhone(this.tempCustomerPhone);
      this.orderService.customer_address = dm['delivery_address'];
      this.orderService.orderType = dm['order_type'];
      this.orderService.order_notes = dm['notes'];
      this.orderService.paymentMethod = dm['payment_method'];
      this.orderService.discountAmount = dm['discount_value'];
      this.orderService.final_total = dm['final_total'];
      this.orderService.totalCost = dm['total_price'];
      this.orderService.selectedTableId = dm['table_id'];
      let order_number = dm['order_number'];
      localStorage.setItem('order_id', order_number);
      this.orderService.couponCode = dm['coupon_code'];
      this.tempCustomerAddress = dm['delivery_address'];
      this.tempCustomerName = dm['customer'];
      this.tempCustomerPhone = dm['customer_phone'];
      this.orderService.taxAmount = dm['tax_amount'];
      this.orderService.tips = dm['tips'];
      this.orderService.tipsAmount = dm['tips_amount'];
      this.orderService.deliveryCharges = dm['delivery_charges'];

      // this.orderService.updateProductInSelectedProducts(this.orderService.selected_products);

      // Ensure all totals are recalculated after loading order for edit
      this.orderService.recalculateTotals();

      if (res) {
      }
    }
  }

  ngOnDestroy(): void {
    this.orderService.showOrderHeader = true;
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    if (this.phoneSearchSubscription) {
      this.phoneSearchSubscription.unsubscribe();
    }
    this.searchSubject.complete();
    this.phoneSearchSubject.complete();
    this.searchSubject.complete();
    localStorage.removeItem('order_id');
    this.phoneSearchSubject.complete();
    this.orderService.customer_name = null;
    this.orderService.customer_phone = null;
    this.orderService.customer_address = null;
    this.orderService.orderType = null;
    this.orderService.paymentMethod = null;
    this.orderService.order_notes = null;
    this.orderService.couponCode = null;
    this.orderService.discountAmount = 0;
    this.orderService.final_total = 0;
    this.orderService.totalCost = 0;
    this.orderService.selected_products = [];
    this.showEdit = false;
    this.orderService.isCouponApplied = false;
  }

  async onSubmit($event: Event) {
    $event.preventDefault();

    const isEditMode = this.showEdit; // Determine if it's edit mode

    // 1) First confirmation: create or update the order
    const confirmMessage = isEditMode ? 'Ready to Update Your Order?' : 'Ready to Place Your Order?';
    const confirmButton = isEditMode ? 'Update Order' : 'Place Order';
    const createConfirmed = await this.utilityService.presentConfirm(
      confirmMessage, // title
      'Not Yet, Thanks', // cancel button
      'Everything Looks Good?', // short question
      `Hit "${confirmButton}" to confirm and we'll get started!` // detailed prompt
    );

    if (!createConfirmed) {
      return; // user cancelled
    }

    // 2) Run validations
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
      // 3) Submit the order
      let res;
      // 3) Submit the order
      if (isEditMode) {
        res = await this.orderService.updateOrder(this.itemId);
        console.log('Order update response:', res);
      } else {
        res = await this.orderService.submitOrder();
      }
      if (!res) {
        return;
      }

      let ord_id = localStorage.getItem('order_id');
      // 4) Second confirmation: print the bill?
      const printConfirmed = await this.utilityService.presentConfirm(
        'Yes, Print',
        'No, Thanks',
        `${ord_id}!`,
        `Order ${isEditMode ? 'Updated' : 'Created'}! Would you like to print the bill now?`
      );

      if (printConfirmed) {
        this.printSlip();
        this.utilityService.presentSuccessToast(`Order ${isEditMode ? 'updated' : 'created'} and bill printed successfully!`);
      } else {
        this.utilityService.presentSuccessToast(`Order ${isEditMode ? 'updated' : 'created'} successfully!`);
      }

      // 5) Clear the form fields and local storage regardless of print confirmation
      localStorage.removeItem('order_id');
      this.tempCustomerAddress = '';
      this.tempCustomerName = 'Walk-in Customer';
      this.tempCustomerPhone ='0000000000';
      this.orderService.resetField();
    } catch (error) {
      console.error('Error submitting order:', error);
      this.utilityService.presentFailureToast('Error creating order. Please try again.');
    }
  }

  onTypeChange(event: any): void {
    console.log('Selected Type:', this.selectedType);
    this.orderService.recalculateTotals();
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
    const section = document.getElementById('print-section');
    if (!section) {
      console.error('Print section not found.');
      return;
    }

    // 1. Grab the _rendered_ HTML (with actual names, prices, looped rows)
    const html = section.innerHTML;

    // 2. Open a new window
    const printWindow = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    if (!printWindow) {
      console.error('Unable to open print window.');
      return;
    }

    // 3. Write a minimal HTML document around that rendered content
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Receipt</title>
          <style>
            /* bring in any print-only styles here */
            body { font-family: Arial, sans-serif; font-size: 12px; margin:0; padding: 8px; }
            .bill-slip { border: 1px dashed #000; padding: 8px; }
            .bill-header, .customer-info, .order-details, .bill-footer {
              margin-bottom: 10px;
            }
            table { width: 100%; border-collapse: collapse; }
            th, td { text-align: left; padding: 2px 4px; }
            th { border-bottom: 1px solid #000; }
          </style>
        </head>
        <body>
          <div class="bill-slip">
            ${html}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();

    // 4. Print & close
    printWindow.focus();
    printWindow.print();
    printWindow.close();
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

  onInputChange(data: string) {
    this.searchSubject.next(data);
  }

  async fetchSuggestions(query: string) {
    try {
      const v = query?.trim();

      if (!v) {
        this.filteredSuggestions = [this.walkInCustomer];
        return;
      }

      const obj = { search: v };
      const res = await this.network.index('user', obj);
      const array = res?.data?.data || [];
      this.filteredSuggestions = [this.walkInCustomer, ...array];
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      this.filteredSuggestions = [this.walkInCustomer];
    }
  }

  onInputChangePhone(data: string) {
    this.phoneSearchSubject.next(data);
  }

  async fetchSuggestionsPhone(query: string) {
    try {
      const temp = { phone: query };
      const obj = { filters: JSON.stringify(temp) };

      const res = await this.network.index('user', obj);
      const array = res?.data?.data || [];
      this.filteredSuggestions = [this.walkInCustomer, ...array];
    } catch (error) {
      console.error('Error fetching phone suggestions:', error);
      this.filteredSuggestions = [this.walkInCustomer];
    }
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
      this.orderService.customer_name = this.getName(this.tempCustomerName);
      this.orderService.customer_phone = this.getPhone(this.tempCustomerPhone);
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

      this.orderService.customer_name = this.getName(this.tempCustomerName);
      this.orderService.customer_phone = this.getPhone(this.tempCustomerPhone);
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
      this.orderService.customer_name = this.getName(this.tempCustomerName);
      this.orderService.customer_phone = this.getPhone(this.tempCustomerPhone);
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
      this.orderService.customer_name = this.getName(this.tempCustomerName);
      this.orderService.customer_phone = this.getPhone(this.tempCustomerPhone);
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

  goBack(): void {
    this.nav.pop();
  }

  applyCoupon() {
    const res = this.orderService.applyCoupon().then((success: boolean) => {
      if (success) {
        this.orderService.isCouponApplied = true; // Lock the input and button
      }
    });
    console.log('Coupon applied:', res);
  }

  applyTips() {
    const tipsValue = Number(this.orderService.tips);
    
    if (tipsValue < 0) {
      this.utilityService.presentFailureToast('Tips amount cannot be negative');
      return;
    }
    
    if (isNaN(tipsValue)) {
      this.utilityService.presentFailureToast('Please enter a valid tips amount');
      return;
    }
    
    this.orderService.tips = tipsValue;
    this.orderService.recalculateTotals();
    this.utilityService.presentSuccessToast('Tips applied successfully');
  }

  // Helper to get name as string
  private getName(val: string | { name: string }): string {
    return typeof val === 'string' ? val : val.name;
  }
  // Helper to get phone as string
  private getPhone(val: string | { phone: string }): string {
    return typeof val === 'string' ? val : val.phone;
  }
}
