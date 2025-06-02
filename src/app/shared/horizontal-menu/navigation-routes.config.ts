import { RouteInfo } from '../vertical-menu/vertical-menu.metadata';

export const HROUTES: RouteInfo[] = [
  {
    path: '/pages/dashboard',
    title: 'Dashboard',
    icon: 'ft-home',
    class: 'dropdown nav-item',
    isExternalLink: false,
    submenu: []
  },
  {
    title: 'Users',
    icon: 'ft-users',
    class: 'dropdown nav-item',
    isExternalLink: false,
    path: '',
    submenu: [
      {
        path: '/pages/users/list',
        title: 'Users',
        icon: 'ft-user',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: []
      },
      {
        path: '/pages/roles/list',
        title: 'Roles',
        icon: 'ft-shield', // Changed to a more suitable icon for roles
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: []
      }
    ]
  },
  {
    title: 'Food',
    icon: 'ft-box',
    class: 'dropdown nav-item',
    isExternalLink: false,
    path: '',
    submenu: [
      {
        path: '/pages/products/list',
        title: 'Menu',
        icon: 'ft-grid',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: []
      },
      {
        path: '/pages/categories/list',
        title: 'Categories',
        icon: 'ft-layers',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: []
      },
      {
        path: '/pages/variations/list',
        title: 'Variations',
        icon: 'ft-repeat',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: []
      }
    ]
  },
  {
    title: 'Booking',
    icon: 'ft-calendar',
    class: 'dropdown nav-item',
    isExternalLink: false,
    path: '',
    submenu: [
      {
        path: '/pages/tables/list',
        title: 'All Tables',
        icon: 'ft-list',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: []
      },
      {
        path: '/pages/table-booking/list',
        title: 'Table Bookings',
        icon: 'ft-calendar',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: []
      }
    ]
  },
  {
    title: 'Expenses',
    icon: 'ti ti-calendar-dollar',
    class: 'dropdown nav-item',
    isExternalLink: false,
    path: '',
    submenu: [
      {
        path: '/pages/expense/list',
        title: 'All Expenses',
        icon: 'ti ti-device-mobile-dollar',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: []
      },
      {
        path: '/pages/expense-categories/list',
        title: 'Expense Categories',
        icon: 'ti ti-device-mobile-dollar',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: []
      }
    ]
  },
  {
    title: 'Orders',
    icon: 'ft-shopping-cart',
    class: 'dropdown nav-item',
    isExternalLink: false,
    path: '/pages/orders/list',
    submenu: [
      // {
      //   path: '/pages/orders/list',
      //   title: 'All Orders',
      //   icon: 'ft-list',
      //   class: 'dropdown-item',
      //   isExternalLink: false,
      //   submenu: []
      // }
      // {
      //   path: '/pages/invoices/list',
      //   title: 'Invoices',
      //   icon: 'ft-file-text',
      //   class: 'dropdown-item',
      //   isExternalLink: false,
      //   submenu: []
      // }
    ]
  },
  {
    path: '/pages/restaurants/list',
    title: 'Branches',
    icon: 'ft-map-pin',
    class: 'dropdown nav-item',
    isExternalLink: false,
    submenu: []
  },
  {
    title: 'Settings',
    icon: 'ft-settings',
    class: 'dropdown nav-item',
    isExternalLink: false,
    path: '',
    submenu: [
      {
        path: '/pages/messages/list',
        title: 'Messages',
        icon: 'ft-message-circle',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: []
      },
      {
        path: '/pages/coupons/list',
        title: 'Coupons',
        icon: 'ft-tag',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: []
      }
      // {
      //   path: '',
      //   title: 'Branch Config',
      //   icon: 'ft-settings',
      //   class: 'dropdown-item',
      //   isExternalLink: false,
      //   submenu: []
      // }
    ]
  }
];
