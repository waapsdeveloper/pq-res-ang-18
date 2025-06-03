import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

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
    { entity: 'branch', operations: ['add', 'edit', 'delete', 'list', 'filter', 'set_default', 'config_button'] },
  ];

  permissionInstance: any;

  constructor(private network: NetworkService) { }

  async getPermissions(): Promise<any> {

    if(this.permissionInstance) {
      console.log('Returning cached permissions:', this.permissionInstance);
      return this.permissionInstance; // Return cached permissions if available
    }

    try {
      this.network.getUserPermissions().then((res: any) => {
        console.log('Fetched Permissions:', res);
        this.permissionInstance = res['permissions']; // Store the permissions instance
        return this.permissionInstance;
      }).catch((error: any) => {
        console.error('Error fetching permissions:', error);
        return null;  
      });
      
    
    
    
    
    } catch (error) {
      console.error('Error fetching permissions:', error);
      return null;
    }
  }

   hasPermission(key: string): boolean {
    console.log('Checking add permission for entity:', key);
    const permissions = this.permissionInstance as any[] || []; // implement this as needed
    console.log('Current permissions:', permissions);
    return permissions.some((permission: any) => permission.slug === key);
  }

}
