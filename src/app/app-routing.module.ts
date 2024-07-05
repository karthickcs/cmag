import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent} from './theme/layout/auth/auth.component';
import { 
  AuthGuardService as AuthGuard 
} from './auth/auth-guard.service';
import { AuthSigninComponent } from './demo/pages/authentication/auth-signin/auth-signin.component';


const routes: Routes = [
  { path: 'signin', component: AuthSigninComponent } ,
  { 
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard] ,
    children: [
      {
        path: '',
        loadChildren: () => import('./demo/pages/task-manager/task-manager.module').then(module => module.TaskManagerModule)
      },
      // {
      //   path: 'dashboard',
      //   loadChildren: () => import('./demo/pages/dashboard/dashboard.module').then(module => module.DashboardModule)
      // },
       {
        path: 'dashboard',
        loadChildren: () => import('./demo/pages/task-manager/dashchart/dashchart.module').then(module => module.DashchartModule)
      },
      {
        path: 'task-manager',
        loadChildren: () => import('./demo/pages/task-manager/task-manager.module').then(module => module.TaskManagerModule)
      },
      {
        path: 'create-task',
        loadChildren: () => import('./demo/pages/task-manager/createtask/createtask.module').then(module => module.CreatetaskModule)
      },
      {
        path: 'another-view',
        loadChildren: () => import('./demo/pages/task-manager/viewbytran/viewbytran.module').then(module => module.ViewbytranModule)
      },
      {
        path: 'accordian',
        loadChildren: () => import('./demo/pages/task-manager/viewacc/viewacc.module').then(module => module.ViewaccModule)
      },
      {
        path: 'manage-task',
        loadChildren: () => import('./demo/pages/task-manager/managetask/managetask.module').then(module => module.ManagetaskModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('./demo/pages/task-manager/reports/reports.module').then(module => module.ReportsModule)
      },
      {
        path: 'windows',
        loadChildren: () => import('./demo/pages/task-manager/viewwind/viewwind.module').then(module => module.ViewwindModule)
      },
      {
        path: 'windowsna',
        loadChildren: () => import('./demo/pages/task-manager/viewwindna/viewwindna.module').then(module => module.ViewwindnaModule)
      },
      {
        path: 'windowstran',
        loadChildren: () => import('./demo/pages/task-manager/viewwindtransac/viewwindtransac.module').then(module => module.ViewwindtransacModule)
      },
      {
        path: 'difference',
        loadChildren: () => import('./demo/pages/task-manager/viewdifference/viewdifference.module').then(module => module.ViewdifferenceModule)
      }

    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then(module => module.AuthenticationModule)
      },
      {
        path: 'maintenance',
        loadChildren: () => import('./demo/pages/maintenance/maintenance.module').then(module => module.MaintenanceModule)
      }
    ]
  },
    { path: '**', redirectTo: '/signin', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
