import { Component, OnInit } from '@angular/core';
import { TaskControllerService } from '../../../../api/taskController.service';
import { DpListenControllerService } from '../../../../api/dpListenController.service';
import { TaskMainDTO } from '../../../../model/taskMainDTO';
import { DpListenDTO } from '../../../../model/dpListenDTO';
import { DiffTableControllerService } from '../../../../api/diffTableController.service';
import { DiffTableDTO } from '../../../../model/diffTableDTO';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  changeDTO: any = {};
  changeDTOArray = [];
  addDTO: any = {};
  addDTOArray = [];
  removeDTO: any = {};
  removeDTOArray = [];
  diffTableDTO: DiffTableDTO = {};
  jsondiff: any = {};
  diffTableDTOArray = [];
  taskMainDTO: TaskMainDTO = {};
  dplistenentry: DpListenDTO = {};
  taskmainArray = [];
  taskid: any = 0;
  dplistenArray = [];
  runid: any = 0;
  runidselect: any = 0;
  tranid: any;
  addfields: any ={};
  removefields: any={};
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

        // // alert(response);
        this.taskmainArray = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadruniddata() {
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
    this.diffTableDTO.taskid = "" + this.dplistenentry.taskid;
    this.diffTableDTO.runid = this.dplistenentry.runid;
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

  loadtramdata() {
    this.diffTableDTO = this.diffTableDTOArray.find(diffdata => diffdata['maintranid'] == this.tranid);
    let a = "";
    a = this.diffTableDTO.difference;
    a = a.split('(').join('[')
    a = a.split(')').join(']')

    this.jsondiff = JSON.parse(a);
    this.diffTableDTO.difference = a;
    this.changeDTOArray=[];
    for (var val of this.jsondiff) {
      console.log(val);
      console.log(val[0]);
      if (val[0] == 'add') {

        for (var v1 of val[2]) {
        this.addDTO ={};
        this.addDTO['field']=v1[0];
        this.addDTO['oldval']=v1[1];
        
        this.addDTOArray.push(this.addDTO);
        }
      }
      if (val[0] == 'remove') {
        for (var v1 of val[2]) {
        this.removeDTO ={};
        this.removeDTO['field']=v1[0];
        this.removeDTO['oldval']=v1[1];
        
        this.removeDTOArray.push(this.removeDTO);
      }
      }
      if (val[0] == 'change') {
        this.changeDTO ={};
        this.changeDTO['field']=val[1];
        this.changeDTO['oldval']=val[2][0];
        this.changeDTO['newval']=val[2][1];
        this.changeDTOArray.push(this.changeDTO);
      }
    }
  }

}
