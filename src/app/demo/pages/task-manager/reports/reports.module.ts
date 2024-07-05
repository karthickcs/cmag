import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';


import { ReportsComponent } from './reports.component';
import { SharedModule } from '../../../../theme/shared/shared.module';
import { AlertModule } from '../../../../theme/shared/components';
import {NgbAccordionModule, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
@NgModule({
  declarations: [ReportsComponent ],
  imports: [
    CommonModule,AlertModule,MatTooltipModule,MatButtonModule,
    ReportsRoutingModule,
    SharedModule,
    NgbCollapseModule,
    NgbAccordionModule
  ]
})
export class ReportsModule { }
