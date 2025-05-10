import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-branch-config',
  templateUrl: './branch-config.component.html',
  styleUrls: ['./branch-config.component.scss']
})
export class BranchConfigComponent implements OnInit {
  constructor(private router: Router) {}

  // branch-config.component.ts
  ngOnInit(): void {
    const restaurantId = localStorage.getItem('restaurant_id');
    if (restaurantId) {
      // Navigate directly without conflicting redirects
      this.router.navigate([`edit/${restaurantId}`], { replaceUrl: true });
    } else {
      // Handle missing ID, e.g., show error or redirect
      console.error('No restaurant_id found in local storage.');
    }
  }
}
