import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ViewwindnaComponent} from './viewwindna.component';

const routes: Routes = [
  {
    path: '',
    component: ViewwindnaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewwindnaRoutingModule { }
