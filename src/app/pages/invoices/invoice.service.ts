import { Injectable } from '@angular/core';
import { BaseCrudService } from 'src/app/services/abstract/crud-service';
import { NetworkService } from 'src/app/services/network.service';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService extends BaseCrudService<any> {
  constructor(private network: NetworkService) {
    super();
  }

  protected async fetchData(params: any): Promise<any> {
    // Call the specific network function
    return this.network.index('invoice', params);
  }

  protected async deleteItemById(id: any): Promise<any> {
    return this.network.destroy('invoice', id);
  }

}
