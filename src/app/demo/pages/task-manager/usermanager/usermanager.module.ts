import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsermanagerRoutingModule } from './usermanager-routing.module';
import { UsermanagerComponent } from './usermanager.component';
import { SharedModule } from '../../../../theme/shared/shared.module';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { TreeViewModule } from "@progress/kendo-angular-treeview";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'; 
import { InputsModule } from "@progress/kendo-angular-inputs"; 
import { ColorPickerModule } from 'primeng/colorpicker';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
@NgModule({
  declarations: [UsermanagerComponent],
  imports: [
    CommonModule,NgxMatColorPickerModule,ColorPickerModule,
    UsermanagerRoutingModule, NgxJsonViewerModule,MatTooltipModule,
    SharedModule, TreeViewModule,ButtonsModule,   MatButtonModule,MatIconModule,
    InputsModule
 
  ],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
   ]
})
export class UsermanagerModule { }
