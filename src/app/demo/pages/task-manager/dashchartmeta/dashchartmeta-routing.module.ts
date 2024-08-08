import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashchartmetaComponent} from './dashchartmeta.component';

const routes: Routes = [
  {
    path: '',
    component: DashchartmetaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashchartmetaRoutingModule { }
