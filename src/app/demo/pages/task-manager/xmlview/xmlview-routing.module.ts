import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {XmlviewComponent} from './xmlview.component';

const routes: Routes = [
  {
    path: '',
    component: XmlviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class XmlviewRoutingModule { }
