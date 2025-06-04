import {
  Component,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
  Inject,
  Renderer2,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
  HostListener,
  Input
} from '@angular/core';

import { Subscription } from 'rxjs';
import { UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { ConfigService } from 'src/app/shared/services/config.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { GlobalRestaurantService } from 'src/app/services/global-restaurant.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  currentLang = 'en';
  selectedLanguageText = 'English';
  selectedLanguageFlag = './assets/img/flags/us.png';
  toggleClass = 'ft-maximize';
  placement = 'bottom-right';
  logoUrl = 'assets/img/logo.png';
  menuPosition = 'Side';
  isSmallScreen = false;
  protected innerWidth: any;
  searchOpenClass = '';
  transparentBGClass = '';
  hideSidebar: boolean = true;
  public isCollapsed = true;
  layoutSub: Subscription;
  configSub: Subscription;
  @Input('addurl') addurl = '/pages/orders/add';

  @Input() user: any;

  @ViewChild('search') searchElement: ElementRef;
  @ViewChildren('searchResults') searchResults: QueryList<any>;

  @Output()
  toggleHideSidebar = new EventEmitter<Object>();

  @Output()
  seachTextEmpty = new EventEmitter<boolean>();

  listItems = [];
  control = new UntypedFormControl();
  restaurantName: string = '';
  public config: any = {};

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private configService: ConfigService,
    private cdr: ChangeDetectorRef,
    public notifcationService: NotificationsService,
    private globalRestaurantService: GlobalRestaurantService
  ) {
    this.config = this.configService.templateConf;
    this.innerWidth = window.innerWidth;

    this.layoutSub = layoutService.toggleSidebar$.subscribe((isShow) => {
      this.hideSidebar = !isShow;
    });


    this.globalRestaurantService.getRestaurantName().subscribe((name) => {
      this.restaurantName = name;
      console.log('Restaurant Name:', this.restaurantName);

      this.restaurantName = name;
      console.log('Restaurant Name from Service:', this.restaurantName);
    });
  }

  async ngOnInit() {
    
    
    this.listItems = [];

    if (this.innerWidth < 1200) {
      this.isSmallScreen = true;
    } else {
      this.isSmallScreen = false;
    }
  }

  ngAfterViewInit() {
    this.configSub = this.configService.templateConf$.subscribe((templateConf) => {
      if (templateConf) {
        this.config = templateConf;
      }
      this.loadLayout();
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
    if (this.configSub) {
      this.configSub.unsubscribe();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = event.target.innerWidth;
    if (this.innerWidth < 1200) {
      this.isSmallScreen = true;
    } else {
      this.isSmallScreen = false;
    }
  }

  loadLayout() {
    if (this.config.layout.menuPosition && this.config.layout.menuPosition.toString().trim() != '') {
      this.menuPosition = this.config.layout.menuPosition;
    }

    if (this.config.layout.variant === 'Light') {
      this.logoUrl = 'assets/img/logo-dark.png';
    } else {
      this.logoUrl = 'assets/img/logo.png';
    }

    if (this.config.layout.variant === 'Transparent') {
      this.transparentBGClass = this.config.layout.sidebar.backgroundColor;
    } else {
      this.transparentBGClass = '';
    }
  }

  onSearchKey(event: any) {
    if (this.searchResults && this.searchResults.length > 0) {
      this.searchResults.first.host.nativeElement.classList.add('first-active-item');
    }

    if (event.target.value === '') {
      this.seachTextEmpty.emit(true);
    } else {
      this.seachTextEmpty.emit(false);
    }
  }

  removeActiveClass() {
    if (this.searchResults && this.searchResults.length > 0) {
      this.searchResults.first.host.nativeElement.classList.remove('first-active-item');
    }
  }

  onEscEvent() {
    this.control.setValue('');
    this.searchOpenClass = '';
    this.seachTextEmpty.emit(true);
  }

  onEnter() {
    if (this.searchResults && this.searchResults.length > 0) {
      let url = this.searchResults.first.url;
      if (url && url != '') {
        this.control.setValue('');
        this.searchOpenClass = '';
        this.router.navigate([url]);
        this.seachTextEmpty.emit(true);
      }
    }
  }

  redirectTo(value) {
    this.router.navigate([value]);
    this.seachTextEmpty.emit(true);
  }

  ChangeLanguage(language: string) {
    if (language === 'en') {
      this.selectedLanguageText = 'English';
      this.selectedLanguageFlag = './assets/img/flags/us.png';
    } else if (language === 'es') {
      this.selectedLanguageText = 'Spanish';
      this.selectedLanguageFlag = './assets/img/flags/es.png';
    } else if (language === 'pt') {
      this.selectedLanguageText = 'Portuguese';
      this.selectedLanguageFlag = './assets/img/flags/pt.png';
    } else if (language === 'de') {
      this.selectedLanguageText = 'German';
      this.selectedLanguageFlag = './assets/img/flags/de.png';
    }
  }

  ToggleClass() {
    if (this.toggleClass === 'ft-maximize') {
      this.toggleClass = 'ft-minimize';
    } else {
      this.toggleClass = 'ft-maximize';
    }
  }

  toggleSearchOpenClass(display) {
    this.control.setValue('');
    if (display) {
      this.searchOpenClass = 'open';
      setTimeout(() => {
        this.searchElement.nativeElement.focus();
      }, 0);
    } else {
      this.searchOpenClass = '';
    }
    this.seachTextEmpty.emit(true);
  }

  toggleNotificationSidebar() {
    this.layoutService.toggleNotificationSidebar(true);
  }

  toggleSidebar() {
    this.layoutService.toggleSidebarSmallScreen(this.hideSidebar);
  }

  setLogo() {
    return 'assets/svg/logo.png';
  }

  navigateToOrder(i) {
    let item = this.notifcationService.notifications[i]?.data?.order_id;
    console.log(item);

    if (item) {
      this.router.navigate(['/pages/orders/view', item]);
      this.cdr.markForCheck();
    }
  }

  gotoOrders() {
    this.router.navigate(['/pages/orders/list']);
  }

  getTimeAgo(timestamp: string): string {
    const notificationDate = new Date(timestamp);
    const now = new Date();
    const diffInMilliseconds = now.getTime() - notificationDate.getTime();

    if (diffInMilliseconds < 60000) {
      return 'just now';
    } else if (diffInMilliseconds < 3600000) {
      const minutes = Math.floor(diffInMilliseconds / 60000);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInMilliseconds < 86400000) {
      const hours = Math.floor(diffInMilliseconds / 3600000);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return '1 day ago'; // Or more specific date/time format
    }
  }
}
