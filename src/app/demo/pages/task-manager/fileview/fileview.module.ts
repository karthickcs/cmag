import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileviewRoutingModule } from './fileview-routing.module';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import { FileviewComponent } from './fileview.component';
import { SharedModule } from '../../../../theme/shared/shared.module';
import { AlertModule } from '../../../../theme/shared/components';
import {NgbAccordionModule, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
@NgModule({
  declarations: [FileviewComponent ],
  imports: [
    CommonModule,AlertModule,MatTooltipModule,MatButtonModule,MatTableModule, MatPaginatorModule, 
    FileviewRoutingModule,MatIconModule,
    SharedModule,
    NgbCollapseModule,
    NgbAccordionModule
  ]
})
export class FileviewModule { }
