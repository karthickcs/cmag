import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ViewwindtransacComponent} from './viewwindtransac.component';

const routes: Routes = [
  {
    path: '',
    component: ViewwindtransacComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewwindtransacRoutingModule { }
