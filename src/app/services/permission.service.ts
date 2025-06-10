import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';
import { UsersService } from './users.service';
import { NgSimpleStateBaseRxjsStore, NgSimpleStateStoreConfig } from 'ng-simple-state';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PermissionService extends NgSimpleStateBaseRxjsStore<any> {

  genericPermissions: any[] = [
    { entity: 'user', operations: ['add', 'edit', 'delete', 'list', 'filter'] },
    { entity: 'product', operations: ['add', 'edit', 'delete', 'list', 'filter'] },
    { entity: 'category', operations: ['add', 'edit', 'delete', 'list', 'filter'] },
    { entity: 'variation', operations: ['add', 'edit', 'delete', 'list', 'filter'] },
    { entity: 'table', operations: ['add', 'edit', 'delete', 'list', 'filter'] },
    { entity: 'table_booking', operations: ['add', 'edit', 'delete', 'list', 'filter'] },
    { entity: 'expense_category', operations: ['add', 'edit', 'delete', 'list', 'filter'] },
    { entity: 'expense', operations: ['add', 'edit', 'delete', 'list', 'filter', 'status', 'payment_status_update'] },
    { entity: 'coupon', operations: ['add', 'edit', 'delete', 'list', 'filter'] },
    { entity: 'message', operations: ['add', 'edit', 'delete', 'list', 'filter'] },
    { entity: 'order', operations: ['add', 'edit', 'delete', 'list', 'filter', 'payment_status', 'order_status', 'menu'] },
    { entity: 'branch', operations: ['add', 'edit', 'delete', 'list', 'filter', 'set_default', 'config_button'] }
  ];

  permissionInstance: any;
  user;

  constructor(
    private network: NetworkService,
    private users: UsersService
  ) {
    super();
  }

  protected storeConfig(): NgSimpleStateStoreConfig {
    return {
      storeName: 'GlobalPermissionState'
    };
  }
  protected initialState(): any {
    return {};
  }

  setPermissionState(obj: any): void {
    this.setState((state) => ({
      ...state,
      ...obj
    }));
  }

  getPermissionState(): Observable<any> {
    return this.selectState((state) => state);
  }

  async getPermissions(): Promise<any> {
    this.user = this.users.getUser();
    if (!this.user) {
      return null;
    }

    if (this.permissionInstance) {
      return this.permissionInstance;
    }

    try {
      const res = await this.network.getUserPermissions();

      if (res && res.permissions) {
        this.permissionInstance = res.permissions;        
        return this.permissionInstance;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  hasPermission(key: string): boolean {
    const permissions = (this.permissionInstance as any[]) || []; // implement this as needed
    return permissions.some((permission: any) => permission.slug === key);
  }
}
