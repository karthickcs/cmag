export * from './dbController.service';
import { DbControllerService } from './dbController.service';
export * from './diffTableController.service';
import { DiffTableControllerService } from './diffTableController.service';
export * from './dpListenController.service';
import { DpListenControllerService } from './dpListenController.service';
export * from './fileController.service';
import { FileControllerService } from './fileController.service';
export * from './jwtAuthenticationController.service';
import { JwtAuthenticationControllerService } from './jwtAuthenticationController.service';
export * from './tableStructController.service';
import { TableStructControllerService } from './tableStructController.service'; 
export * from './taskController.service';
import { TaskControllerService } from './taskController.service';
export const APIS = [DbControllerService, DiffTableControllerService, DpListenControllerService, FileControllerService, JwtAuthenticationControllerService, MyErrorControllerService, TaskControllerService];
