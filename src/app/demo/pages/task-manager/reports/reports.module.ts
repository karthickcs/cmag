import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';


import { ReportsComponent } from './reports.component';
import { SharedModule } from '../../../../theme/shared/shared.module';

@NgModule({
  declarations: [ReportsComponent ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule
  ]
})
export class ReportsModule { }
