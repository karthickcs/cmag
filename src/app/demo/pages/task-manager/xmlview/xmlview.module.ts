import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { XmlviewRoutingModule } from './xmlview-routing.module';

import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import { XmlviewComponent } from './xmlview.component';
import { SharedModule } from '../../../../theme/shared/shared.module';
import { AlertModule } from '../../../../theme/shared/components';
import {NgbAccordionModule, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon';
@NgModule({
  declarations: [XmlviewComponent ],
  imports: [
    CommonModule,AlertModule,MatTooltipModule,MatButtonModule,
    XmlviewRoutingModule,MatIconModule,
    SharedModule,
    NgbCollapseModule,
    NgbAccordionModule
  ]
})
export class XmlviewModule { }
