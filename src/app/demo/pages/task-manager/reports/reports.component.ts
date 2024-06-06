import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TaskControllerService } from '../../../../api/taskController.service';
import { DpListenControllerService } from '../../../../api/dpListenController.service';
import { TaskMainDTO } from '../../../../model/taskMainDTO';
import { DpListenDTO } from '../../../../model/dpListenDTO';
import { DiffTableControllerService } from '../../../../api/diffTableController.service';
import { DiffTableDTO } from '../../../../model/diffTableDTO';
import { AlertService } from '../../../../theme/shared/components';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
read(arg0: string) {
   if(arg0)
    {
      if (arg0.split("|")[1]) {
         return arg0.split("|")[1];
      }
      else{
         return arg0;
      }
    }
    return "";
}
  options = {
    autoClose: false,
    keepAfterRouteChange: false
};
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
  tranid: any=0;
  addfields: any ={};
  removefields: any={};
  tabledata: any={};
  constructor(private taskControllerService: TaskControllerService,
    private diffTableControllerService: DiffTableControllerService,
    private dpListenControllerService: DpListenControllerService,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute

  ) { }


  ngOnInit() {
    this.loaddata();
    this.diffTableDTO={};
    this.route.params.subscribe(
      (params: Params) => {
               if(params['taskid']){
                this.taskid= params['taskid'];
                this.runidselect= params['runid'];
                this.tranid= params['tranid'];
                this.loadruniddata(true);
                
                this.tranid= params['tranid'];
                this.loadtramdata();
               
               //  
            
               }
               if (params['id']){
                    this.taskid= params['id'];
                    this.loadruniddata(false)
               }
      }
    );
    this.tabledata = require('../../../../../assets/tabledata.json');
    //console.log(Object.keys(this.tabledata));
    
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

  loadruniddata(onload:boolean) {
    // alert(this.taskid);
    this.dpListenControllerService.getRunIdsUsingGET(this.taskid).subscribe(
      (response: any) => {

        // // alert(response);
        this.dplistenArray = response;
        if (!onload){
        this.runidselect= this.dplistenArray.reduce((max, obj) => {
          return Math.max(max, obj.runid);
        }, 0);
        }
        this.loadrunid();
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
    //this.diffTableDTO.taskid = "" + this.dplistenentry.taskid;
    //this.diffTableDTO.runid = this.dplistenentry.runid;
    let diffTableDTO: DiffTableDTO = {
      taskid: "" + this.dplistenentry.taskid,
      runid: this.dplistenentry.runid,
    };
    this.diffTableControllerService.getDiffDataUsingPOST(diffTableDTO).subscribe(
      (response: any) => {

        // // alert(response);
        this.diffTableDTOArray = response;
        if(this.diffTableDTOArray[0]){
          this.tranid=this.diffTableDTOArray[0]['maintranid'];
          this.loadtramdata();
        }
         
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadtramdata() {
    this.addDTOArray=[];
    this.removeDTOArray=[];
    this.changeDTOArray=[];
    //this.cdr.detectChanges();
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
        this.addDTO['field']=this.gettname(v1[0]);
        this.addDTO['oldval']=v1[1];
        
        this.addDTOArray.push(this.addDTO);
        }
      }
      if (val[0] == 'remove') {
        for (var v1 of val[2]) {
        this.removeDTO ={};
        this.removeDTO['field']=this.gettname(v1[0]);
        this.removeDTO['oldval']=v1[1];
        
        this.removeDTOArray.push(this.removeDTO);
      }
      }
      if (val[0] == 'change') {
        this.changeDTO ={};
        this.changeDTO['field']=this.gettname(val[1]);
         
        this.changeDTO['oldval']=val[2][0];
        this.changeDTO['newval']=val[2][1];
        this.changeDTOArray.push(this.changeDTO);
      }
    }
  }

  gettname(field) {
    if (Array.isArray(field)){
      field=field[0];
    }
    let a = field.replace('INSERTING on FBNK_', '');
    a = a.replace('UPDATING on FBNK_', '');
    a = a.replace('DELETING on FBNK_', '');
    a = a.replace('INSERTING on F_', '');
    a = a.replace('UPDATING on F_', '');
    a = a.replace('DELETING on F_', '');
    a = a.replace('/row/', '');
    let ans = a.split(":");
    let columnname = "";
    let tname=ans[0].split("_").join(".").replace('001', '')
    let cname=ans[2].split("[")[0]
    cname=cname.substring(cname.lastIndexOf("/")+1)
    if (this.tabledata[tname]) {
      columnname = this.tabledata[tname][cname.toUpperCase()]
      return tname + "." + columnname;
    }
    return tname  + "." + cname;;
  }

}
