import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';


import { ReportsComponent } from './reports.component';
import { SharedModule } from '../../../../theme/shared/shared.module';
import { AlertModule } from '../../../../theme/shared/components';
import {NgbAccordionModule, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ReportsComponent ],
  imports: [
    CommonModule,AlertModule,
    ReportsRoutingModule,
    SharedModule,
    NgbCollapseModule,
    NgbAccordionModule
  ]
})
export class ReportsModule { }
