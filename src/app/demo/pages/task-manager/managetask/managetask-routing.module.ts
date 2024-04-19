import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ManagetaskComponent} from './managetask.component';

const routes: Routes = [
  {
    path: '',
    component: ManagetaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagetaskRoutingModule { }
