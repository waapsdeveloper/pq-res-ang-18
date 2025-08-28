import { Injectable } from '@angular/core';
import { BaseCrudService } from 'src/app/services/abstract/crud-service';
import { NetworkService } from 'src/app/services/network.service';

@Injectable({
  providedIn: 'root'
})
export class RtableService extends BaseCrudService<any> {
  constructor(private network: NetworkService) {
    super();
  }

  protected async fetchData(params: any): Promise<any> {
    // Call the specific network function
    return this.network.index('rtable', params);
  }

  protected async deleteItemById(id: any): Promise<any> {
    return this.network.destroy('rtable', id);
  }
  protected async onPageSizeChange(pageSize: number): Promise<any> {
    console.log('Page size changed to:', pageSize);
    // Update the perpage value and fetch data accordingly
    this.perpage = pageSize;
    this.getList(); // Call the method to fetch the updated list
  }
}
