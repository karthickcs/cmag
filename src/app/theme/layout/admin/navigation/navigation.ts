import {Injectable} from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'TaskManager',
        title: 'TaskManager',
        type: 'item',
        url: '/task-manager',
        icon: 'feather icon-home'
      },
      // {
      //   id: 'ManageTask',
      //   title: 'Manage Task Run',
      //   type: 'item',
      //   url: '/manage-task',
        
      //   icon: 'feather icon-layout'
      // }
      // ,
      // {
      //   id: 'AnotherView',
      //   title: 'AnotherView',
      //   type: 'item',
      //   url: '/another-view',
         
      //   icon: 'feather icon-layout'
      // },
      // {
      //   id: 'Accordian',
      //   title: 'Accordian',
      //   type: 'item',
      //   url: '/accordian',
         
      //   icon: 'feather icon-layout'
      // }
      // ,
      {
        id: 'newtab',
        title: 'newtab',
        type: 'item',
        url: '/newtab',
        
        icon: 'feather icon-layout'
      },
      {
        id: 'Reports',
        title: 'Reports',
        type: 'item',
        url: '/reports',
        
        icon: 'feather icon-layout'
      },
      {
        id: 'windows',
        title: 'windows',
        type: 'item',
        url: '/windows',
        
        icon: 'feather icon-layout'
      },
      {
        id: 'windowstran',
        title: 'windowstran',
        type: 'item',
        url: '/windowstran',
        
        icon: 'feather icon-layout'
      }
    ]
  },
   
   
  {
    id: 'pages',
    title: 'Pages',
    type: 'group',
    icon: 'feather icon-file-text',
    children: [
      {
        id: 'auth',
        title: 'Authentication',
        type: 'collapse',
        icon: 'feather icon-lock',
        children: [
          {
            id: 'signup',
            title: 'Sign up',
            type: 'item',
            url: '/auth/signup',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'signin',
            title: 'Sign in',
            type: 'item',
            url: '/auth/signin',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'reset-password',
            title: 'Reset Password',
            type: 'item',
            url: '/auth/reset-password',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'change-password',
            title: 'Change Password',
            type: 'item',
            url: '/auth/change-password',
            target: true,
            breadcrumbs: false
          }
        ]
      },
      {
        id: 'maintenance',
        title: 'Maintenance',
        type: 'collapse',
        icon: 'feather icon-sliders',
        children: [
          {
            id: 'error',
            title: 'Error',
            type: 'item',
            url: '/maintenance/error',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'coming-soon',
            title: 'Maintenance',
            type: 'item',
            url: '/maintenance/coming-soon',
            target: true,
            breadcrumbs: false
          }
        ]
      }
    ]
  },
  {
    id: 'other',
    title: 'Other',
    type: 'group',
    icon: 'feather icon-align-left',
    children: [
      
      {
        id: 'disabled-menu',
        title: 'Disabled Menu',
        type: 'item',
        url: 'javascript:',
        classes: 'nav-item disabled',
        icon: 'feather icon-sidebar',
        external: true
      },
      {
        id: 'LogOut',
        title: 'Log Out',
        type: 'item',
        url: '/auth/signin',
        classes: 'nav-item',
        icon: 'feather icon-power'
      }
    ]
  }
];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}
