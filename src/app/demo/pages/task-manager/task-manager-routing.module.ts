import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TaskManagerComponent} from './task-manager.component';

const routes: Routes = [
  {
    path: '',
    component: TaskManagerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskManagerRoutingModule { }
