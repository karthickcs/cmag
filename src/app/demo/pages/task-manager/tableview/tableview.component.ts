import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskControllerService } from '../../../../api/taskController.service';
import { Router } from '@angular/router';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { TaskMainDTO } from '../../../../model/taskMainDTO';
import { AuthService } from '../../../../auth/auth.service';
import { FileControllerService } from '../../../../api/fileController.service';
import { ChangeDetectorRef } from '@angular/core';
 
import { DpListenControllerService } from '../../../../api/dpListenController.service';
 
import { DpListenDTO } from '../../../../model/dpListenDTO';
import { DiffTableControllerService } from '../../../../api/diffTableController.service';
import { DiffTableDTO } from '../../../../model/diffTableDTO';
import { AlertService } from '../../../../theme/shared/components';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import * as _ from 'lodash'
declare var $: any;
@Component({
  selector: 'app-tableview',
  templateUrl: './tableview.component.html',
  styleUrls: ['./tableview.component.scss']
})
export class TableviewComponent   {
  
   
    displayedColumns = ['id', 'name', 'progress', 'color'];
    dataSource: MatTableDataSource< DiffTableDTO>;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    load(taskid,runid) {
      this.router.navigate(['/windows', {
        taskid: taskid,
        runid: runid
         
      }]);
    }
      clength:any= {};
      groupednewstructvaloriginal: any={};
    columnname: any="";
      convert(arg0) {
        if (arg0) {
          let ans = arg0.replace(".1", ".src");
          ans = ans.replace(".2", ".Target");
          ans = ans.replace("AAAAAmaintranid", "Recid");
          if(ans.lastIndexOf(".0")>0){
            return " ";
          }
          return ans;
        }
        return "";
      }
      tname: any = "";
      tabnewstruct: any = {};
      groupednewstructval: any = {};
      colnames: any = [];
    
      read(arg0) {
        if (arg0) {
          if (arg0.split("|")[1]) {
            return arg0.split("|")[1];
          }
          else {
            return arg0;
          }
        }
        return "";
      }
    
    
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
      constructor(private taskControllerService: TaskControllerService,
        private diffTableControllerService: DiffTableControllerService,
        private dpListenControllerService: DpListenControllerService,
        private alertService: AlertService,
        private cdr: ChangeDetectorRef,
        private router: Router,
        private route: ActivatedRoute
        
      ) {

        // Create 100 users
      // const users: UserData[] = [];
      // for (let i = 1; i <= 100; i++) { users.push(createNewUser(i)); }
  
      // // Assign the data to the data source for the table to render
      // this.dataSource = new MatTableDataSource(users);
       }
    
       ngOnInit() {
        this.tabledata = require('../../../../../assets/tabledata.json');
        this.loaddata()
        this.route.params.subscribe(
          (params: Params) => {
                   if(params['taskid']){
                    this.taskid= params['taskid'];
                    this.runidselect= params['runid'];
                
                    this.loaddifftable();
                   
                   //  
                
                   }
                  
          }
        );
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
    
      loadruniddata(onload: boolean) {
        // alert(this.taskid);
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
        this.loaddifftable();
      }
      loaddifftable() {
        this.diffTableDTO.taskid = "" + this.taskid;
        this.diffTableDTO.runid = this.runidselect;
        this.diffTableControllerService.getDiffDataUsingPOST(this.diffTableDTO).subscribe(
          (response: any) => {
    
            // // alert(response);
            this.diffTableDTOArray = response;
            this.dataSource = new MatTableDataSource(response);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            if (this.diffTableDTOArray[0]) {
              this.tranid = this.diffTableDTOArray[0]['maintranid'];
              // this.loadDifferenceTable();
              // this.loadDifferenceTableHorizontal();
            }
    
          },
          (error) => {
            console.log(error);
          }
        );
      }
    /**
     * Set the paginator and sort after the view init since this component will
     * be able to query its view for the initialized paginator and sort.
     */
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
    applyFilter(filterValueevent) {
      let filterValue=filterValueevent.value;
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
  }
  
   