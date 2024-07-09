import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashchartdesComponent} from './dashchartdes.component';

const routes: Routes = [
  {
    path: '',
    component: DashchartdesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashchartdesRoutingModule { }
