import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FileviewComponent} from './fileview.component';

const routes: Routes = [
  {
    path: '',
    component: FileviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileviewRoutingModule { }
