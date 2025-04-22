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
  statuses = ['reserved', 'active'];
  selectedStatus = '';

  constructor(
    private network: NetworkService,
    private utility: UtilityService
  ) {}

  async updateStatus(status, item) {
    let obj = {
      status: status
    };
    console.log(obj, item);

    await this.network.tableBookingStatus(item.id, obj);

    this.utility.presentSuccessToast(`Order Status Updated to ${obj.status}`);
  }
}
