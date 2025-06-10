import { Component, OnInit, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';

import { LayoutService } from '../services/layout.service';
import { ConfigService } from '../services/config.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PermissionService } from 'src/app/services/permission.service';
import { PmenuService } from 'src/app/services/pmenu.service';

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

  

  constructor(
    private layoutService: LayoutService,
    private configService: ConfigService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private pmenuService: PmenuService,
  ) {
    this.config = this.configService.templateConf;
  }

  async ngOnInit() {
    this.restaurantId = localStorage.getItem('restaurant_id');
    

    
    
  }

  ngAfterViewInit() {
    this.layoutSub = this.configService.templateConf$.subscribe(async (templateConf) => {
      if (templateConf) {
        this.config = templateConf;
      }
      this.menuItems = await this.pmenuService.getMenu();
      this.loadLayout();
      this.cdr.markForCheck();
    });

    
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
