import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-favourite-table',
  templateUrl: './favourite-table.component.html',
  styleUrl: './favourite-table.component.scss',
  standalone: false
})
export class FavouriteTableComponent implements OnInit {
  tables: any[] = [];
  constructor(private network: NetworkService) {}
  async ngOnInit() {
    const data = await this.network.getLatestTable();

    const d = data.tables;
    console.log(d);
    this.tables = d.map((table) => ({
      id: table.id,
      name: table.name,
      floor: table.floor,
      no_of_seats: table.no_of_seats,
      description: table.description,
      status: table.status,
      restaurant_name: table.restaurant_detail.name,
      restaurant_address: table.restaurant_detail.address,
      restaurant_phone: table.restaurant_detail.phone,
      restaurant_email: table.restaurant_detail.email,
      restaurant_website: table.restaurant_detail.website,
      restaurant_rating: table.restaurant_detail.rating
    }));

    console.log(this.tables);
  }
  getProgressBarBackground(status: string) {
    if (status === 'active') {
      return 'lightgreen'; // Light green for active
    } else if (status === 'inactive') {
      return 'lightgray'; // Light gray for inactive
    } else if (status === 'busy') {
      return 'lightcoral'; // Light red for busy
    }
    return 'lightgray'; // Default case
  }
  getProgressBarColor(status: string) {
    if (status === 'active') {
      return 'green'; // Green for active
    } else if (status === 'inactive') {
      return 'gray'; // Gray for inactive
    } else if (status === 'busy') {
      return 'red'; // Red for busy
    }
    return 'gray'; // Default case
  }

  getProgressBarWidth(status: string) {
    // You can define different widths based on the status or any other factor
    if (status === 'active') {
      return '65%'; // Example width for active
    } else if (status === 'inactive') {
      return '40%'; // Example width for inactive
    } else if (status === 'busy') {
      return '80%'; // Example width for busy
    }
    return '50%'; // Default case
  }
  getProgressPercentage(status: string) {
    // Return percentage based on status
    if (status === 'active') {
      return 65;
    } else if (status === 'inactive') {
      return 40;
    } else if (status === 'busy') {
      return 80;
    }
    return 50; // Default case
  }
}
