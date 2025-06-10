import { Component, OnInit, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { HROUTES } from './navigation-routes.config';
import { LayoutService } from '../services/layout.service';
import { ConfigService } from '../services/config.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-horizontal-menu',
  templateUrl: './horizontal-menu.component.html',
  styleUrls: ['./horizontal-menu.component.scss']
})
export class HorizontalMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  public menuItems: any[];
  public config: any = {};
  level: number = 0;
  transparentBGClass = '';
  menuPosition = 'Side';

  layoutSub: Subscription;
  restaurantId: string;

  permissionsObject: any = null;

  constructor(
    private layoutService: LayoutService,
    private configService: ConfigService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private permissionService: PermissionService
  ) {
    this.config = this.configService.templateConf;
  }

  ngOnInit() {
    this.restaurantId = localStorage.getItem('restaurant_id');
    this.menuItems = HROUTES;
  }

  ngAfterViewInit() {
    this.layoutSub = this.configService.templateConf$.subscribe((templateConf) => {
      if (templateConf) {
        this.config = templateConf;
      }
      this.loadLayout();
      this.cdr.markForCheck();
    });

    this.permissionService.getPermissionState().subscribe((permissions) => {
      console.log('Permissions from service:', permissions);
      if (permissions) {
        this.permissionsObject = permissions;
      } else {
        this.permissionService.getPermissions().then((permissions) => {
          this.permissionsObject = permissions;
        });
      }
    });
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
        item.submenu = this.removesubItemsWhichAreNotInPermission(permissions, item.submenu);
      } else {
        let exist = this.permissionService.hasPermission(item.permissionSlug);
        if(exist){
          finals.push(item)
        }
      }

    }



    return []

  }

  removesubItemsWhichAreNotInPermission(permissions: any[], menuitems: any[]): any[] {

    if (!permissions) {
      return menuitems;
    }

    let c = [...menuitems];
    for (let i = 0; i < c.length; i++) {
      const item = c[i];

      if (!permissions.includes(item.path)) {
        c.splice(i, 1);
        i--;
      }
    }

    return c;

  }

  loadLayout() {
    if (this.config.layout.menuPosition && this.config.layout.menuPosition.toString().trim() != '') {
      this.menuPosition = this.config.layout.menuPosition;
    }

    if (this.config.layout.variant === 'Transparent') {
      this.transparentBGClass = this.config.layout.sidebar.backgroundColor;
    } else {
      this.transparentBGClass = '';
    }
  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }
}
