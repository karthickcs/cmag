import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableviewRoutingModule } from './tableview-routing.module';
import { TableviewComponent } from './tableview.component';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table'; 

@NgModule({
  declarations: [TableviewComponent],
  imports: [
    CommonModule,
    TableviewRoutingModule,
    SharedModule,MatToolbarModule, MatInputModule, MatTableModule,MatPaginatorModule
  ]
  ,
  exports: [CommonModule, MatToolbarModule, MatInputModule, MatTableModule]
})
export class TableviewModule { }
