import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ViewwindComponent} from './viewwind.component';

const routes: Routes = [
  {
    path: '',
    component: ViewwindComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewwindRoutingModule { }
