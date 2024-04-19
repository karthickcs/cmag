import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreatetaskComponent} from './createtask.component';

const routes: Routes = [
  {
    path: '',
    component: CreatetaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatetaskRoutingModule { }
