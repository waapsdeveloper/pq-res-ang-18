import { NavService } from 'src/app/services/basic/nav.service';
import { UsersService } from 'src/app/services/users.service';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { GlobalRestaurantService } from 'src/app/services/global-restaurant.service';
import { NetworkService } from 'src/app/services/network.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-btop-header',
  templateUrl: './btop-header.component.html',
  styleUrl: './btop-header.component.scss'
})
export class BtopHeaderComponent {
  @Input('title') title = '';
  @Input('addurl') addurl = '/pages/orders/add';
  @Output('onSearch') onSearch = new EventEmitter<any>();

  showNewOrder = false;
  restaurant$: any;
  date = new Date();
  menuItems = [
    { label: 'Dashboard', link: '/pages/dashboard', icon: 'ti ti-layout-dashboard' },
    { label: 'Branches', link: '/pages/restaurants', icon: 'ti ti-soup' },
    { label: 'Users', link: '/pages/users', icon: 'ti ti-users' },
    { label: 'Categories', link: '/pages/categories', icon: 'ti ti-drag-drop-2' },
    { label: 'All Menu', link: '/pages/products', icon: 'ti ti-artboard' },
    { label: 'Variations', link: '/pages/variations', icon: 'ti ti-versions' },
    { label: 'Tables', link: '/pages/tables', icon: 'ti ti-table' },
    { label: 'Table Booking', link: '/pages/table-booking', icon: 'ti ti-table' },
    { label: 'Orders', link: '/pages/orders', icon: 'ti ti-truck-delivery' },
    { label: 'Invoices', link: '/pages/invoices', icon: 'ti ti-file-dollar' },
    { label: 'Messages', link: '/pages/messages', icon: 'ti ti-message-dots' },

    //   { label: 'Reports', link: '/pages/reports', icon: 'ti ti-clipboard-text' },
    //   { label: 'Customers', link: '/pages/customers', icon: 'ti ti-user-plus' },
  ];

  constructor(
    private nav: NavService,
    private users: UsersService,
    public grService: GlobalRestaurantService,
    public notifcationService: NotificationsService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private events: EventsService
  ) {
    this.initialize();
    this.notifcationService.registerPusherEvent();
    this.notifcationService.getNotificationsFromApi();

    this.grService.getRestaurant().subscribe((data) => {
      this.restaurant$ = data;
     });

     this.events.subscribe('new-order-notification', (data) => {
        console.log("events", data);

        this.showNewOrder = true;
     })
  }

  async initialize() {
    // filter menu
    const u = this.users.getUser();

    if (u.role_id != 1) {
      this.menuItems = this.menuItems.filter((x) => x.label != 'Restaurants');
    }

    if (u.role_id != 1 && u.role_id != 2) {
      this.menuItems = this.menuItems.filter((x) => x.label != 'Users');
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.nav.push('/');
  }

  setLogo() {
    // if(this.restaurant$){

    //   if(this.restaurant$['image']){

    //     console.log( this.restaurant$['image'])
    //     return this.restaurant$['image']
    //   }

    // }

    return 'assets/svg/logo.png';
  }

   navigateToOrder(i) {
    let item = this.notifcationService.notifications[i]?.data?.order_id;
    console.log(item);

    if (item) {
      this.router.navigate(['/pages/orders/view', item]);
      this.changeDetectorRef.markForCheck();
    }
  }

  getTimeAgo(timestamp: string): string {
    const notificationDate = new Date(timestamp);
    const now = new Date();
    const diffInMilliseconds = now.getTime() - notificationDate.getTime();

    if (diffInMilliseconds < 60000) {
      return 'just now';
    } else if (diffInMilliseconds < 3600000) {
      const minutes = Math.floor(diffInMilliseconds / 60000);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInMilliseconds < 86400000) {
      const hours = Math.floor(diffInMilliseconds / 3600000);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return '1 day ago'; // Or more specific date/time format
    }
  }
}
