import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ViewdifferenceComponent} from './viewdifference.component';

const routes: Routes = [
  {
    path: '',
    component: ViewdifferenceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewdifferenceRoutingModule { }
