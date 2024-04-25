import { Component, OnInit } from '@angular/core';
import { TaskControllerService } from '../../../../api/taskController.service';
import { DpListenControllerService } from '../../../../api/dpListenController.service';
import { TaskMainDTO } from '../../../../model/taskMainDTO';
import { DpListenDTO } from '../../../../model/dpListenDTO';
import { DiffTableControllerService } from '../../../../api/diffTableController.service';
import { DiffTableDTO } from '../../../../model/diffTableDTO';

@Component({
  selector: 'app-managetask',
  templateUrl: './managetask.component.html',
  styleUrls: ['./managetask.component.scss']
})
export class ManagetaskComponent implements OnInit {

  diffTableDTO: DiffTableDTO = {};
   
  diffTableDTOArray = [];
  taskMainDTO: TaskMainDTO = {};
  dplistenentry: DpListenDTO = {};
  taskmainArray = [];
taskid: any =0;
dplistenArray= [];
runid: any=0;
runidselect: any=0;
  constructor(private taskControllerService: TaskControllerService,
    private diffTableControllerService: DiffTableControllerService,
    private dpListenControllerService: DpListenControllerService 
 
     ) { }


  ngOnInit() {

    this.loaddata();
  }
  loaddata() {
    this.taskControllerService.getTasknainUsingGET().subscribe(
      (response: any) => {

        // alert(response);
        this.taskmainArray = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadruniddata(  ) {
    // alert(this.taskid);
    this.dpListenControllerService.getRunIdsUsingGET(this.taskid).subscribe(
      (response: any) => {

        // // alert(response);
        this.dplistenArray = response;
        
      },
      (error) => {
        console.log(error);
      }
    );
  }
  loadrunid() {
    // alert(this.runidselect);
   this.dplistenentry = this.dplistenArray.find(dplisten => dplisten['runid'] == this.runidselect);
   // alert(JSON.stringify(this.dplistenentry));
   this.loaddifftable();
  }
  loaddifftable() {
    this.diffTableDTO.taskid=""+this.dplistenentry.taskid;
    this.diffTableDTO.runid=this.dplistenentry.runid;
     this.diffTableControllerService.getDiffDataUsingPOST(this.diffTableDTO).subscribe(
      (response: any) => {

        // // alert(response);
        this.diffTableDTOArray = response;
        
      },
      (error) => {
        console.log(error);
      }
    );  
  }
}
