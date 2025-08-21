import { Injectable } from '@angular/core';
import { BaseCrudService } from 'src/app/services/abstract/crud-service';
import { NetworkService } from 'src/app/services/network.service';

@Injectable({
  providedIn: 'root'
})
export class BranchConfigService extends BaseCrudService<any> {
  constructor(private network: NetworkService) {
    super();
  }

  protected async fetchData(params: any): Promise<any> {
    // Call the specific network function
    return this.network.index('branch-config', params);
  }

  protected async deleteItemById(id: any): Promise<any> {
    return this.network.destroy('branch-config', id);
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

}
