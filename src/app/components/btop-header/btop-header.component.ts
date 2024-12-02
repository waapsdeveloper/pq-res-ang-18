import { Component } from '@angular/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-btop-header',
  templateUrl: './btop-header.component.html',
  styleUrl: './btop-header.component.scss'
})
export class BtopHeaderComponent {

  menuItems = [
    { label: 'Dashboard', link: '/pages/dashboard', icon: 'ti ti-layout-dashboard' },
    { label: 'Restaurants', link: '/pages/restaurants', icon: 'ti ti-soup' },
    { label: 'Users', link: '/pages/users', icon: 'ti ti-users' },
    { label: 'Categories', link: '/pages/categories', icon: 'ti ti-drag-drop-2' },
    { label: 'All Menu', link: '/pages/products', icon: 'ti ti-artboard' },
    { label: 'Tables', link: '/pages/tables', icon: 'ti ti-table' },
    { label: 'Orders', link: '/pages/users', icon: 'ti ti-truck-delivery' },
    { label: 'Invoices', link: '/pages/users', icon: 'ti ti-file-dollar' },
    { label: 'Reports', link: '/pages/users', icon: 'ti ti-clipboard-text' },
    { label: 'Customers', link: '/pages/users', icon: 'ti ti-user-plus' },
  ];

  constructor(private nav: NavService, private users: UsersService){
    this.initialize();
  }


  initialize(){
    // filter menu
    const u = this.users.getUser()
   

    console.log("u", u)

    if(u.role_id != 1){
      this.menuItems = this.menuItems.filter( x => x.label != 'Restaurants');
    }
    
    if(u.role_id != 2){
      this.menuItems = this.menuItems.filter( x => x.label != 'Users');
    }
  }


  logout(){
    localStorage.removeItem('token');
    this.nav.push('/')
  }

}
