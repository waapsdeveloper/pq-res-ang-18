import { Injectable } from '@angular/core';
import { BaseCrudService } from 'src/app/services/abstract/crud-service';
import { NetworkService } from 'src/app/services/network.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseCrudService<any> {
  constructor(private network: NetworkService) {
    super();
  }

  protected async fetchData(params: any): Promise<any> {
    // Call the specific network function
    return this.network.index('product', params);
  }

  protected async deleteItemById(id: any): Promise<any> {
    return this.network.destroy('product', id);
  }
  protected async onPageSizeChange(pageSize: number): Promise<any> {
    console.log('Page size changed to:', pageSize);
    // Update the perpage value and fetch data accordingly
    this.perpage = pageSize;
    this.getList(); // Call the method to fetch the updated list
  }
  // 🔹 Deleted orders
  async fetchDeletedData(params: any): Promise<any> {
    return this.network.indexDeleted('product', params);
  }

  // 🔹 Restore single order
  async restoreItemById(id: number): Promise<any> {
    return this.network.restore('product', id);
  }

  // 🔹 Restore multiple orders
  async restoreMultiple(ids: number[]): Promise<any> {
    return this.network.restoreMultiple('product', ids);
  }

  // 🔹 Force delete single order
  async forceDeleteItemById(id: number): Promise<any> {
    return this.network.forceDestroy('product', id);
  }

  // 🔹 Force delete multiple orders
  async forceDeleteMultiple(ids: number[]): Promise<any> {
    return this.network.forceDestroyMultiple('product', ids);
  }

}
