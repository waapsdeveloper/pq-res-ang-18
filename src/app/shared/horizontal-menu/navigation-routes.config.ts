import { RouteInfo } from '../vertical-menu/vertical-menu.metadata';

export const HROUTES: RouteInfo[] = [
  {
    path: '/pages/dashboard',
    title: 'Dashboard',
    icon: 'ft-home',
    class: 'dropdown nav-item',
    isExternalLink: false,
    submenu: [],
    permissionSlug: 'dashboard.view'
  },
  {
    title: 'Users',
    icon: 'ft-users',
    class: 'dropdown nav-item',
    isExternalLink: false,
    path: '',
    permissionSlug: 'users.view',
    submenu: [
      {
        path: '/pages/users/list',
        title: 'Users',
        icon: 'ft-user',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: [],
        permissionSlug: 'users.view'
      },
      {
        path: '/pages/roles/list',
        title: 'Roles',
        icon: 'ft-shield', // Changed to a more suitable icon for roles
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: [],
        permissionSlug: 'roles.view'
      }
    ]
  },
  {
    title: 'Food',
    icon: 'ft-box',
    class: 'dropdown nav-item',
    isExternalLink: false,
    path: '',
    permissionSlug: 'product.list',
    submenu: [
      {
        path: '/pages/products/list',
        title: 'Menu',
        icon: 'ft-grid',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: [],
        permissionSlug: 'product.list'
      },
      {
        path: '/pages/categories/list',
        title: 'Categories',
        icon: 'ft-layers',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: [],
        permissionSlug: 'categories.view'
      },
      {
        path: '/pages/variations/list',
        title: 'Variations',
        icon: 'ft-repeat',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: [],
        permissionSlug: 'variations.view' // Uncomment if variations are implemented
      }
    ]
  },
  {
    title: 'Booking',
    icon: 'ft-calendar',
    class: 'dropdown nav-item',
    isExternalLink: false,
    path: '',
    permissionSlug: 'booking.view',
    submenu: [
      {
        path: '/pages/tables/list',
        title: 'All Tables',
        icon: 'ft-list',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: [],
        permissionSlug: 'tables.view'
      },
      {
        path: '/pages/table-booking/list',
        title: 'Table Bookings',
        icon: 'ft-calendar',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: [],
        permissionSlug: 'table-booking.view'
      }
    ]
  },
  {
    title: 'Expenses',
    icon: 'ti ti-calendar-dollar',
    class: 'dropdown nav-item',
    isExternalLink: false,
    path: '',
    permissionSlug: 'expenses.view',
    submenu: [
      {
        path: '/pages/expense/list',
        title: 'All Expenses',
        icon: 'ti ti-device-mobile-dollar',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: [],
        permissionSlug: 'expenses.view'
      },
      {
        path: '/pages/expense-categories/list',
        title: 'Expense Categories',
        icon: 'ti ti-device-mobile-dollar',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: [],
        permissionSlug: 'expense-categories.view'
      }
    ]
  },
  {
    title: 'Orders',
    icon: 'ft-shopping-cart',
    class: 'dropdown nav-item',
    isExternalLink: false,
    path: '/pages/orders/list',
    permissionSlug: 'order.list',
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
    submenu: [],
    permissionSlug: 'branch.view'
  },
  {
    title: 'Settings',
    icon: 'ft-settings',
    class: 'dropdown nav-item',
    isExternalLink: false,
    path: '',
    permissionSlug: 'settings.view',
    submenu: [
      {
        path: '/pages/messages/list',
        title: 'Messages',
        icon: 'ft-message-circle',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: [],
        permissionSlug: 'messages.view'
      },
      {
        path: '/pages/coupons/list',
        title: 'Coupons',
        icon: 'ft-tag',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: [],
        permissionSlug: 'coupons.view'
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
