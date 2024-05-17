import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewaccRoutingModule } from './viewacc-routing.module';


import { ViewaccComponent } from './viewacc.component';
import { SharedModule } from '../../../../theme/shared/shared.module';
import { AlertModule } from '../../../../theme/shared/components';
import {NgbAccordionModule, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ViewaccComponent ],
  imports: [
    CommonModule,AlertModule,
    ViewaccRoutingModule,
    SharedModule,
    NgbCollapseModule,
    NgbAccordionModule
  ]
})
export class ViewaccModule { }
