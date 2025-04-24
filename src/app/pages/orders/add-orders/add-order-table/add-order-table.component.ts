import { Component, EventEmitter, Output } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { AddOrderService } from '../add-order.service';

@Component({
  selector: 'app-add-order-table',
  standalone: false,
  templateUrl: './add-order-table.component.html',
  styleUrl: './add-order-table.component.scss'
})
export class AddOrderTableComponent {

  selectedTable: any = null;

  tables: any[] = [];

  @Output() selectedTableChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private network: NetworkService,
    public orderService: AddOrderService,
  ) {
    // Initialize the component, fetch data, etc.
    this.getTables({
      perpage: 500,
      page: 1,
    });
  }

  async getTables(params: any) {
    // Call the specific network function
    const res = await this.network.index('rtable', params);
    console.log('Tables:', res);
    let d = res.data;
    if (!d) {
      return;
    }
    let tbs = d.data;

    // Filter tables based on status
    this.tables = tbs.filter((table: any) => table.status !== 'Reserved' && table.status !== 'reserved');
  }
}
