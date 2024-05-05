import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewdifferenceRoutingModule } from './viewdifference-routing.module';


import { ViewdifferenceComponent } from './viewdifference.component';
import { SharedModule } from '../../../../theme/shared/shared.module';
import { AlertModule } from '../../../../theme/shared/components';
import {NgbAccordionModule, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ViewdifferenceComponent ],
  imports: [
    CommonModule,AlertModule,
    ViewdifferenceRoutingModule,
    SharedModule,
    NgbCollapseModule,
    NgbAccordionModule
  ]
})
export class ViewdifferenceModule { }
