import { NavService } from 'src/app/services/basic/nav.service';
import { UsersService } from 'src/app/services/users.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GlobalRestaurantService } from 'src/app/services/global-restaurant.service';


@Component({
  selector: 'app-btop-header',
  templateUrl: './btop-header.component.html',
  styleUrl: './btop-header.component.scss'
})
export class BtopHeaderComponent {
  @Input('title') title = ''
  @Input('addurl') addurl = '/pages/orders/add'
  @Output('onSearch') onSearch = new EventEmitter<any>();

  restaurant$: any;

  menuItems = [
    { label: 'Dashboard', link: '/pages/dashboard', icon: 'ti ti-layout-dashboard' },
    { label: 'Restaurants', link: '/pages/restaurants', icon: 'ti ti-soup' },
    { label: 'Users', link: '/pages/users', icon: 'ti ti-users' },
    { label: 'Categories', link: '/pages/categories', icon: 'ti ti-drag-drop-2' },
    { label: 'All Menu', link: '/pages/products', icon: 'ti ti-artboard' },
    { label: 'Tables', link: '/pages/tables', icon: 'ti ti-table' },
    { label: 'Table Booking', link: '/pages/table-booking', icon: 'ti ti-table' },
    { label: 'Orders', link: '/pages/orders', icon: 'ti ti-truck-delivery' },
    { label: 'Invoices', link: '/pages/invoices', icon: 'ti ti-file-dollar' },
 //   { label: 'Reports', link: '/pages/reports', icon: 'ti ti-clipboard-text' },
  //   { label: 'Customers', link: '/pages/customers', icon: 'ti ti-user-plus' },
   ];

  constructor(private nav: NavService, private users: UsersService, public grService: GlobalRestaurantService){
    this.initialize();

    this.grService.getRestaurant().subscribe( data => {
      this.restaurant$ = data;
    })


  }


  initialize(){
    // filter menu
    const u = this.users.getUser()


    console.log("u", u)

    if(u.role_id != 1){
      this.menuItems = this.menuItems.filter( x => x.label != 'Restaurants');
    }

    if(u.role_id != 1 && u.role_id != 2){
      this.menuItems = this.menuItems.filter( x => x.label != 'Users');
    }
  }


  logout(){
    localStorage.removeItem('token');
    this.nav.push('/')
  }

  setLogo(){

    if(this.restaurant$){

      if(this.restaurant$['image']){

        console.log( this.restaurant$['image'])
        return this.restaurant$['image']
      }

    }

  //  return 'assets/svg/log.svg'
  }


}
