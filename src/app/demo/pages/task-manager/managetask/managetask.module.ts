import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagetaskRoutingModule } from './managetask-routing.module';
import { ManagetaskComponent } from './managetask.component';
import { SharedModule } from '../../../../theme/shared/shared.module';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { TreeViewModule } from "@progress/kendo-angular-treeview";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
 
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
 
import { InputsModule } from "@progress/kendo-angular-inputs"; 

@NgModule({
  declarations: [ManagetaskComponent],
  imports: [
    CommonModule,
    ManagetaskRoutingModule, NgxJsonViewerModule,MatTooltipModule,
    SharedModule, TreeViewModule,ButtonsModule,   MatButtonModule,
    InputsModule
 
  ]
})
export class ManagetaskModule { }
