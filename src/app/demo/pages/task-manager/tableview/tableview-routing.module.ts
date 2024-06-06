import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TableviewComponent} from './tableview.component';

const routes: Routes = [
  {
    path: '',
    component: TableviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableviewRoutingModule { }
