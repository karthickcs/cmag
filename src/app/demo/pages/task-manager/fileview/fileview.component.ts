import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { TaskControllerService } from '../../../../api/taskController.service';
import { DpListenControllerService } from '../../../../api/dpListenController.service';
import { TaskMainDTO } from '../../../../model/taskMainDTO';
import { diffElement, DpListenDTO } from '../../../../model/dpListenDTO';
import { DiffTableControllerService } from '../../../../api/diffTableController.service';
import { DiffTableDTO } from '../../../../model/diffTableDTO';
import { AlertService } from '../../../../theme/shared/components';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import * as _ from 'lodash'
import { AuthService } from '../../../../auth/auth.service';
import { FileControllerService } from '../../../../api/fileController.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
declare var $: any;

@Component({
  selector: 'app-viewwindna',
  templateUrl: './fileview.component.html',
  styleUrls: ['./fileview.component.scss'],
 
})


export class FileviewComponent implements OnInit {

  
tablemapcoll: any={};
groupednewstructvalObjectTable: {};
 
  master: any=[];

  displayedColumns: string[] = ['index','difference', 'maintran', 'newtran' ];
     

  clength: any = {};
  groupednewstructvaloriginal: any = {};
  columnname: any = "";
  groupednewstructvalObject: any = {};
  groupednewstructvaloriginalObject: any = {};
  colmaster: any = {};
  colmastertran: any = {};
  tname: any = "";
  tabnewstruct: any = {};
  tabnewstructdetail: any = {};
  groupednewstructval: any = {};
  colnames: any = [];
  colnamesdum: any = [];



  searchtext: any = "";

  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };
  oldvaltname: any = "";
  changeDTO: any = {};
  changeDTOArray = [];
  newstruct: any = {};
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
  tranid: any = 0;
  addfields: any = {};
  removefields: any = {};
  tabledata: any = {};
  grouped: any = {};
  groupedoriginal: any = {};
  groupedval: any;
  tranidreturn: any = "";
  tablemap:   String[][];
  tablemaptran:   String[][];
  tablecount: number=0;
  diffcount: number=0;
  blobText: string="";
linecount: any=1000;
  constructor(private taskControllerService: TaskControllerService,
    private diffTableControllerService: DiffTableControllerService,
    private dpListenControllerService: DpListenControllerService,
    private fileControllerService: FileControllerService,
    private alertService: AlertService,private authservice: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  dataSource = new MatTableDataSource<diffElement>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
   
    this.loaddata(false)
 
  }
  

  
  tabnewstructTran: any = {};
  groupedTran: any = {};
  groupedTranoriginal: any = {};
  groupedTranval: any = {};


  load(taskid, runid) {
    this.router.navigate(['/windowsna', {
      taskid: taskid,
      runid: runid

    }]);
  }
  loaddata(onload:any) {
    this.taskControllerService.getTasknainUsingGET().subscribe(
      (response: any) => {

         
        this.taskmainArray = response;
        if(!onload){
          if( this.taskmainArray[0]){
            this.taskid=this.taskmainArray[0].taskid;
            this.taskMainDTO=this.taskmainArray[0]
          }
        }
        this.loadruniddata(onload);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadruniddata(onload: boolean) {
    // alert(this.taskid);
    this.taskMainDTO= this.taskmainArray.filter(x => x['taskid']==this.taskid)[0];
    this.dpListenControllerService.getRunIdsUsingGET(this.taskid).subscribe(
      (response: any) => {

        // // alert(response);
        this.dplistenArray = response;
        if (!onload) {
          this.runidselect = this.dplistenArray.reduce((max, obj) => {
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
    
  }
  
  loadfile() {
    this.fileControllerService.getfiletrunUsingGET(this.taskid,this.runidselect).subscribe(
      (response: any) => {

        // // alert(response);
       let res = response;
       const blob = new Blob([response], { type: 'text/csv' });
       blob.text().then(text => {
        this.blobText = text.substring(3,20000);
        // let tarr=text.split('\n');
        // this.master=[];
        // let ii=0;
        // for (let i in tarr){
        //            if(ii==0){
        //             ii=ii+1;
        //             continue;
        //            }
        //             let sarr=tarr[i].split(',');
        //             var obj={
        //               difference : sarr[1],
        //               maintran : sarr[2],
        //               newtran : sarr[3],         


        //             }
        //             this.master.push(obj);
        //}
        this.dataSource=new MatTableDataSource<diffElement>(this.master);
        this.dataSource.paginator= this.paginator;
              })
  //     const url= window.URL.createObjectURL(blob);
   //    window.open(url);
       
      },
      (error) => {
        console.log(error);
      }
    );
  }

  
  downloadloadfile() {
    this.fileControllerService.getfiletrunUsingGET(this.taskid,this.runidselect).subscribe(
      (response: any) => {

        // // alert(response);
       let res = response;
       const blob = new Blob([response], { type: 'text/csv' });
      
     const url= window.URL.createObjectURL(blob);
     const a = document.createElement("a");
     a.href = URL.createObjectURL( blob
     );
     a.setAttribute("download", "Finaldiff_"+this.taskid+"_"+this.runidselect+".csv");
     document.body.appendChild(a);
     a.click();
     document.body.removeChild(a);
    // window.open(url);
       
      },
      (error) => {
        console.log(error);
      }
    );
  }
  viewlog() {
    this.fileControllerService.getlogfileUsingGET(this.linecount).subscribe(
      (response: any) => {
        this.blobText=response;
      },
      (error) => {
        
        this.blobText=" ";
      }
    );
    }

}


