import { Injectable } from '@angular/core';
import { HROUTES } from '../shared/horizontal-menu/navigation-routes.config';
import { PermissionService } from './permission.service';

@Injectable({
  providedIn: 'root'
})
export class PmenuService {

  pmenuItems: any[] = [];

  permissionsObject: any = null;


  constructor(private permissionService: PermissionService) { 

    this.permissionService.getPermissionState().subscribe((permissions) => {
      console.log('Permissions from service:', permissions);
      if (permissions) {
        this.permissionsObject = permissions;
        this.setDynamicMenu()
      } else {
        this.permissionService.getPermissions().then((permissions) => {
          this.permissionsObject = permissions;
          this.setDynamicMenu()
        });
      }
    });

  }

  async getMenu(): Promise<any[]> {
    if (this.pmenuItems.length > 0) {
      return this.pmenuItems;
    }

    await this.setDynamicMenu();    
    return this.pmenuItems;
    
  }

  async setDynamicMenu(): Promise<any[]> {
      const permissions = await this.permissionService.getPermissions();
      if (!permissions || permissions.length === 0) {
          console.warn('No permissions found, returning empty menu.');
          this.pmenuItems = [];
          return this.pmenuItems;
      }
      this.pmenuItems = this.removeItemsWhichAreNotInPermission(permissions, HROUTES);
      return this.pmenuItems;
  }

  
  removeItemsWhichAreNotInPermission(permissions: any[], menuitems: any[]): any[] {

    let finals = [];

    if (!permissions) {
      return menuitems;
    }

    let c = [...menuitems];
    for (let i = 0; i < c.length; i++) {
      const item = c[i];

      if (item.submenu && item.submenu.length > 0) {

        let existw = this.permissionService.hasPermission(item.permissionSlug);
        if(existw){

          item.submenu = this.removesubItemsWhichAreNotInPermission(permissions, item.submenu);

          if (!finals.some(existingItem => existingItem.path === item.path)) {
              finals.push(item);
          }
          
        }






        


      } else {
        let exist = this.permissionService.hasPermission(item.permissionSlug);
        console.log('Permission check for item:', item.permissionSlug, 'Exists:', exist);
        if(exist){
          
          if (!finals.some(existingItem => existingItem.path === item.path)) {
              finals.push(item);
          }
        }
      }

    }



    return finals;

  }

  removesubItemsWhichAreNotInPermission(permissions: any[], menuitems: any[]): any[] {

    let finals = [];

    if (!permissions) {
      return menuitems;
    }

    let c = [...menuitems];
    for (let i = 0; i < c.length; i++) {
      const item = c[i];

      let exist = this.permissionService.hasPermission(item.permissionSlug);
      console.log('Permission check for subitem:', item.permissionSlug, 'Exists:', exist);
      if(exist){
        if (!finals.some(existingItem => existingItem.path === item.path)) {
          finals.push(item);
        }
      }

    }

    return finals;

  }


}
