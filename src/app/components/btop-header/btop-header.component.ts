import { Component } from '@angular/core';

@Component({
  selector: 'app-btop-header',
  templateUrl: './btop-header.component.html',
  styleUrl: './btop-header.component.scss'
})
export class BtopHeaderComponent {

  menuItems = [
    { label: 'Dashboard', link: '/pages/dashboard', icon: 'bi bi-speedometer2' },
    { label: 'Restaurants', link: '/pages/restaurants', icon: 'bi bi-shop' },
    { label: 'Users', link: '/pages/users', icon: 'bi bi-people' },
    { label: 'Categories', link: '/pages/categories', icon: 'bi bi-people' },
    { label: 'All Menu', link: '/pages/products', icon: 'bi bi-people' },
    { label: 'Tables', link: '/pages/users', icon: 'bi bi-people' },
    { label: 'Orders', link: '/pages/users', icon: 'bi bi-people' },
    { label: 'Invoices', link: '/pages/users', icon: 'bi bi-people' },
    { label: 'Reports', link: '/pages/users', icon: 'bi bi-people' },
    { label: 'Customers', link: '/pages/users', icon: 'bi bi-people' },
  ];

}
