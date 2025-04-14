import { Component, Input } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-list-invoices-item-status',
  templateUrl: './list-invoices-item-status.component.html',
  styleUrl: './list-invoices-item-status.component.scss'
})
export class ListInvoiceItemStatusComponent {
  @Input() item:any;
  statuses = ['pending', 'confirmed', 'completed', 'cancelled'];
  selectedStatus = '';

  constructor(private network: NetworkService, private utility: UtilityService) {}

  async updateStatus(status,item) {
    let obj = {
      status: status
    };
    console.log(obj , item);
    this.item.status = status;
    await this.network.invoiceStatus(item.id, obj);

    this.utility.presentSuccessToast(`Invoice Status Updated to ${obj.status}`);
  }
}
