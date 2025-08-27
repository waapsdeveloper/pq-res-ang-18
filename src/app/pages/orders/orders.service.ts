import { Injectable } from '@angular/core';
import { BaseCrudService } from 'src/app/services/abstract/crud-service';
import { NetworkService } from 'src/app/services/network.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseCrudService<any> {
  constructor(private network: NetworkService) {
    super();
  }



  // 🔹 Fetch normal orders
  protected async fetchData(params: any): Promise<any> {
    return this.network.index('order', params);
  }

  // 🔹 Delete (soft delete)
  protected async deleteItemById(id: any): Promise<any> {
    return this.network.destroy('order', id);
  }

  // 🔹 Deleted orders
  async fetchDeletedData(params: any): Promise<any> {
    return this.network.indexDeleted('order', params);
  }

  // 🔹 Restore single order
  async restoreItemById(id: number): Promise<any> {
    return this.network.restore('order', id);
  }

  // 🔹 Restore multiple orders
  async restoreMultiple(ids: number[]): Promise<any> {
    return this.network.restoreMultiple('order', ids);
  }

  // 🔹 Force delete single order
  async forceDeleteItemById(id: number): Promise<any> {
    return this.network.forceDestroy('order', id);
  }

  // 🔹 Force delete multiple orders
  async forceDeleteMultiple(ids: number[]): Promise<any> {
    return this.network.forceDestroyMultiple('order', ids);
  }

  // 🔹 Page size update (already there)
  protected async onPageSizeChange(pageSize: number): Promise<any> {
    console.log('Page size changed to:', pageSize);
    this.perpage = pageSize;
    this.getList();
  }
}
