import { Injectable } from '@angular/core';
import { NgSimpleStateBaseRxjsStore, NgSimpleStateStoreConfig } from 'ng-simple-state';
import { HROUTES } from '../shared/horizontal-menu/navigation-routes.config';
import { PermissionService } from './permission.service';

@Injectable({
  providedIn: 'root'
})
export class PmenuService extends NgSimpleStateBaseRxjsStore<any> {
  pmenuItems: any[] = [];
  permissionsObject: any = null;

  constructor(private permissionService: PermissionService) {
    super();
    this.permissionService.getPermissionState().subscribe((permissions) => {
      console.log('Permissions from service (observable):', permissions);
      if (permissions) {
        this.permissionsObject = permissions;
        this.setDynamicMenu().then(() => {
          console.log('Dynamic menu set from observable.');
        });
      } else {
        this.permissionService.getPermissions().then((permissions) => {
          this.permissionsObject = permissions;
          this.setDynamicMenu().then(() => {
            console.log('Dynamic menu set from fallback.');
          });
        });
      }
    });
  }

  protected storeConfig(): NgSimpleStateStoreConfig {
    return {
      storeName: 'GlobalMenuState'
    };
  }

  protected initialState(): any {
    return {};
  }

  setMenuState(obj: any): void {
    this.setState((state) => ({ 
      ...state,
      ...obj
    }));
  }

  getMenuState(): any {
    return this.selectState((state) => state);
  }



  async getMenu(): Promise<any[]> {
    if (this.pmenuItems.length === 0) {
      await this.setDynamicMenu();
    }
    return this.pmenuItems;
  }

  async setDynamicMenu(): Promise<any[]> {
    const permissions = await this.permissionService.getPermissions();

    if (!permissions || permissions.length === 0) {
      console.warn('No permissions found, returning empty menu.');
      this.pmenuItems = [];
      return this.pmenuItems;
    }

    console.log('Setting dynamic menu with permissions:', permissions);
    console.log('Available menu items:', HROUTES);

    this.pmenuItems = this.removeItemsWhichAreNotInPermission(permissions, HROUTES);
    this.setMenuState(this.pmenuItems);
    return this.pmenuItems;
  }

  removeItemsWhichAreNotInPermission(permissions: any[], menuitems: any[]): any[] {
  let finals: any[] = [];

  if (!permissions) {
    return menuitems;
  }

  for (let item of menuitems) {
    if (!item.permissionSlug) {
      console.warn('Missing permissionSlug for item:', item);
      continue;
    }

    const hasPermission = this.permissionService.hasPermission(item.permissionSlug);

    // Always process submenu regardless of parent's permission
    const filteredSubmenu = this.removesubItemsWhichAreNotInPermission(permissions, item.submenu || []);

    // 🛠️ Clone item before modifying it
    const clonedItem = { ...item, submenu: filteredSubmenu };

    if (hasPermission || filteredSubmenu.length > 0) {
      
      finals.push(clonedItem);
      
    }
  }

  return finals;
}


  removesubItemsWhichAreNotInPermission(permissions: any[], menuitems: any[]): any[] {
    let finals: any[] = [];

    if (!permissions) {
      return menuitems;
    }

    for (let item of menuitems) {
      console.log('Checking subitem:', item);
      if (!item.permissionSlug) {
        console.warn('Missing permissionSlug for submenu item:', item);
        continue;
      }

      const exist = this.permissionService.hasPermission(item.permissionSlug);
      console.log('Permission check for subitem:', item.permissionSlug, 'Exists:', exist);

      if (exist) {
        finals.push(item);
      }
    }

    return finals;
  }
}
