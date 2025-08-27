import { ChangeDetectorRef, Component, Injector, Input } from '@angular/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { EventsService } from 'src/app/services/events.service';
import { NetworkService } from 'src/app/services/network.service';
import { PermissionService } from 'src/app/services/permission.service';
import { UsersService } from 'src/app/services/users.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-list-expense-status',
  templateUrl: './list-expense-status.component.html',
  styleUrl: './list-expense-status.component.scss'
})
export class ListExpenseStatusComponent {
  @Input() item: any;
  canChangeStatus: any;
  constructor(
    injector: Injector,
    private nav: NavService,
    private utility: UtilityService,
    private users: UsersService,
    private network: NetworkService,
    private cdr: ChangeDetectorRef,
    public events: EventsService,
    public permissionService: PermissionService
  ) {
    this.canChangeStatus = this.permissionService.hasPermission('expense' + '.payment_status_update');
  }

  async onStatusClick(item) {
    if (!this.canChangeStatus) {
      await this.utility.showWarningMessage('You do not have permission to change the status of this expense.');
      return;
    }
    // Check if item exists and is already paid
    if (this.item && this.item.status === 'paid') {
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
    await this.network.updateExpenseStatus(this.item.id, { status: 'paid' });

    // Update local item state
    this.item.status = 'paid';

    // Trigger change detection
    this.cdr.detectChanges();

    // Show success message
    this.utility.presentSuccessToast('Payment status updated successfully.');
  }
}
