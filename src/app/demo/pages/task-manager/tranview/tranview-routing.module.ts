import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TranviewComponent} from './tranview.component';

const routes: Routes = [
  {
    path: '',
    component: TranviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TranviewRoutingModule { }
