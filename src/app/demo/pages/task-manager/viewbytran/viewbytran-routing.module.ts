import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ViewbytranComponent} from './viewbytran.component';

const routes: Routes = [
  {
    path: '',
    component: ViewbytranComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewbytranRoutingModule { }
