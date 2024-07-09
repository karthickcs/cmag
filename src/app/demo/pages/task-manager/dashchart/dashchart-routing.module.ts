import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashchartComponent} from './dashchart.component';

const routes: Routes = [
  {
    path: '',
    component: DashchartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashchartRoutingModule { }
