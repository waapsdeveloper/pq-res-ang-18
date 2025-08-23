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
    permissionSlug: 'user.list',
    submenu: [
      {
        path: '/pages/users/list',
        title: 'Users',
        icon: 'ft-user',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: [],
        permissionSlug: 'user.list'
      },
      {
        path: '/pages/roles/list',
        title: 'Roles',
        icon: 'ft-shield', // Changed to a more suitable icon for roles
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: [],
        permissionSlug: 'role.list'
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
        permissionSlug: 'category.list'
      },
      {
        path: '/pages/variations/list',
        title: 'Variations',
        icon: 'ft-repeat',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: [],
        permissionSlug: 'variation.list' // Uncomment if variations are implemented
      }
    ]
  },
  {
    title: 'Booking',
    icon: 'ft-calendar',
    class: 'dropdown nav-item',
    isExternalLink: false,
    path: '',
    permissionSlug: 'table.list',
    submenu: [
      {
        path: '/pages/tables/list',
        title: 'All Tables',
        icon: 'ft-list',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: [],
        permissionSlug: 'table.list'
      },
      {
        path: '/pages/table-booking/list',
        title: 'Table Bookings',
        icon: 'ft-calendar',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: [],
        permissionSlug: 'table_booking.list'
      }
    ]
  },
  {
    title: 'Expenses',
    icon: 'ti ti-calendar-dollar',
    class: 'dropdown nav-item',
    isExternalLink: false,
    path: '',
    permissionSlug: 'expense.list',
    submenu: [
      {
        path: '/pages/expense/list',
        title: 'All Expenses',
        icon: 'ti ti-device-mobile-dollar',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: [],
        permissionSlug: 'expense.list'
      },
      {
        path: '/pages/expense-categories/list',
        title: 'Expense Categories',
        icon: 'ti ti-device-mobile-dollar',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: [],
        permissionSlug: 'expense_category.list'
      }
    ]
  },
  {
    title: 'Orders',
    icon: 'ft-shopping-cart',
    class: 'dropdown nav-item',
    isExternalLink: false,
    path: '',
    permissionSlug: 'order.list',
    submenu: [
      {
        path: '/pages/orders/list',
        title: 'All Orders',
        icon: 'ft-list',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: [],
        permissionSlug: 'order.list'
      },
      {
        path: '/pages/orders/deleted', // placeholder for now
        title: 'Deleted Orders',
        icon: 'ft-trash-2', // trash icon makes sense
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: [],
        permissionSlug: 'order.deleted_order' // you can adjust this slug later
      }
    ]
  }
  ,
 {
  title: 'Reports',
  icon: 'ft-bar-chart',
  class: 'dropdown nav-item',
  permissionSlug: 'report.daily_sale_report',
  isExternalLink: false,
  path: '',
  submenu: [
    {
      title: 'Daily Sales Reports',
      icon: 'ft-shopping-cart',
      class: '',
      isExternalLink: false,
      permissionSlug: 'report.daily_sale_report',
      path: '/pages/reports/orders/daily',
      submenu: [
        // {
        //   title: 'Daily',
        //   icon: 'ft-calendar',
        //   class: 'dropdown-item',
        //   isExternalLink: false,
        //   permissionSlug: 'order.list',
        //   path: '/pages/reports/orders/daily',
        //   submenu: []
        // },
        // {
        //   title: 'Monthly',
        //   icon: 'ft-clock',
        //   class: 'dropdown-item',
        //   isExternalLink: false,
        //   permissionSlug: 'order.list',
        //   path: '/pages/reports/orders/monthly',
        //   submenu: []
        // }
      ]
    }
  ]
}

  ,
  {
    path: '/pages/restaurants/list',
    title: 'Branches',
    icon: 'ft-map-pin',
    class: 'dropdown nav-item',
    isExternalLink: false,
    submenu: [],
    permissionSlug: 'branch.list'
  },
  {
    title: 'Settings',
    icon: 'ft-settings',
    class: 'dropdown nav-item',
    isExternalLink: false,
    path: '',
    permissionSlug: 'setting.list',
    submenu: [
      {
        path: '/pages/messages/list',
        title: 'Messages',
        icon: 'ft-message-circle',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: [],
        permissionSlug: 'message.list'
      },
      {
        path: '/pages/coupons/list',
        title: 'Coupons',
        icon: 'ft-tag',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: [],
        permissionSlug: 'coupon.list'
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
