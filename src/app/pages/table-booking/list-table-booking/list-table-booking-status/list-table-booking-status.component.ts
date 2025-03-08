import { Component, Input } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-list-table-booking-status',
  templateUrl: './list-table-booking-status.component.html',
  styleUrl: './list-table-booking-status.component.scss'
})
export class ListTableBookingStatusComponent {
  @Input() item: any;
  statuses = ['pending', 'confirmed',  'completed', 'cancelled'];
  selectedStatus = '';

  constructor(
    private network: NetworkService,
    private utility: UtilityService
  ) {}

  async updateStatus(item) {
    let obj = {
      status: this.selectedStatus
    };
    console.log(obj);

    await this.network.tableStatus(item.id, obj);

    this.utility.presentSuccessToast(`Order Status Updated to ${obj.status}`);
  }
}
