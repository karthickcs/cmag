import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewbytranRoutingModule } from './viewbytran-routing.module';


import { ViewbytranComponent } from './viewbytran.component';
import { SharedModule } from '../../../../theme/shared/shared.module';
import { AlertModule } from '../../../../theme/shared/components';
import {NgbAccordionModule, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ViewbytranComponent ],
  imports: [
    CommonModule,AlertModule,
    ViewbytranRoutingModule,
    SharedModule,
    NgbCollapseModule,
    NgbAccordionModule
  ]
})
export class ViewbytranModule { }
