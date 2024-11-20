import { Component } from '@angular/core';

@Component({
  selector: 'app-btop-header',
  templateUrl: './btop-header.component.html',
  styleUrl: './btop-header.component.scss'
})
export class BtopHeaderComponent {

  menuItems = [
    { label: 'Dashboard', link: '/pages/dashboard', icon: 'bi bi-speedometer2' },
    { label: 'Users', link: '/pages/users', icon: 'bi bi-people' },
    { label: 'Restaurants', link: '/restaurants', icon: 'bi bi-shop' },
  ];

}
