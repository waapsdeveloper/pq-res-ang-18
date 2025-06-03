import { ChangeDetectorRef, Component, Injector, Input } from '@angular/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { EventsService } from 'src/app/services/events.service';
import { NetworkService } from 'src/app/services/network.service';
import { UsersService } from 'src/app/services/users.service';
import { UtilityService } from 'src/app/services/utility.service';
import { OrderService } from '../../orders.service';
import Action from 'pusher-js/types/src/core/connection/protocol/action';
import { ActivatedRoute } from '@angular/router';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-list-order-payment-status',
  templateUrl: './list-order-payment-status.component.html',
  styleUrl: './list-order-payment-status.component.scss'
})
export class ListOrderPaymentStatusComponent {
  @Input() item: any;
  paymentStatus;
  constructor(
    injector: Injector,
    private nav: NavService,
    private utility: UtilityService,
    private users: UsersService,
    private network: NetworkService,
    private cdr: ChangeDetectorRef,
    public events: EventsService,
    private route: ActivatedRoute,
    private permissionService: PermissionService
  ) {
    this.paymentStatus = this.permissionService.hasPermission('order' + '.payment_status');
  }

  async updatePaymentStatus() {
    if (!this.paymentStatus) {
      alert('You do not have permission to update the payment status.');
      return;
    }
    // Check if item exists and is already paid
    if (this.item && this.item.is_paid === true) {
      await this.utility.showWarningMessage('Cannot update payment status as it is already paid.');
      return;
    }

    // Show confirmation dialog
    const flag = await this.utility.presentConfirm(
      'Update Payment Status',
      'Cancel',
      'Update Payment Status',
      'Are you sure you want to update payment status?'
    );

    if (!flag) {
      return;
    }

    // Update payment status
    await this.network.updateOrderPaymentStatus(this.item.id, { is_paid: true });

    // Update local item state
    this.item.is_paid = true;

    // Trigger change detection
    this.cdr.detectChanges();

    // Show success message
  }
}
