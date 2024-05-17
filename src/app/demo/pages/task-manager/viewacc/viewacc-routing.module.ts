import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ViewaccComponent} from './viewacc.component';

const routes: Routes = [
  {
    path: '',
    component: ViewaccComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewaccRoutingModule { }
