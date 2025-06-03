import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  permissionInstance: any;

  constructor(private network: NetworkService) { }

  async getPermissions(): Promise<any> {
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


}
