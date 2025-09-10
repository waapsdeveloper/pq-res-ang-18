import { Component, Input } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-list-product-status',
  templateUrl: './list-product-status.component.html',
  styleUrl: './list-product-status.component.scss'
})
export class ListProductStatusComponent {
  @Input() item: any;
  statuses = ['active', 'inactive'];

  constructor(
    private utility: UtilityService,
    private network: NetworkService
  ) {}

  openStatusDropdown(item: any) {
    const options = this.statuses.map((status) => ({
      value: status,
      label: this.titleCase(status)
    }));

    this.utility.showCustomDropdown(
      'Update Product Status',
      'status-dropdown',
      options,
      item.status,
      'Update Status',
      (newStatus: string) => {
        this.updateStatus(newStatus, item);
      }
    );
  }

  async updateStatus(status: string, item: any) {
    const updatedProduct = { ...item, status }; // Clone and update status
    try {
      const res = await this.network.updateProduct(updatedProduct, item.id);
      if (res) {
        this.item.status = this.titleCase(status);
        this.utility.presentSuccessToast(`Product Status Updated to ${this.titleCase(status)}`);
      } else {
        this.utility.presentFailureToast('Failed to update product status.');
      }
    } catch (error) {
      this.utility.presentFailureToast('Error updating product status.');
    }
  }

  titleCase(str: string): string {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
