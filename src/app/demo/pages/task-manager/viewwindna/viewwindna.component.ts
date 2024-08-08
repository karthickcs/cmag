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
import * as _ from 'lodash'
declare var $: any;

@Component({
  selector: 'app-viewwindna',
  templateUrl: './viewwindna.component.html',
  styleUrls: ['./viewwindna.component.scss']
})
export class ViewwindnaComponent implements OnInit {



  goBack( runid, taskid) {
    this.router.navigate(['/dashboard', {
      taskid: taskid,
      runid: runid,
     
    }]);
  }

  clength: any = {};
  groupednewstructvaloriginal: any = {};
  columnname: any = "";
  groupednewstructvalObject: any = {};
  groupednewstructvaloriginalObject: any = {};
  colmaster: any = {};

  tname: any = "";
  tabnewstruct: any = {};
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
  tablecount: number=0;
  diffcount: number=0;
  constructor(private taskControllerService: TaskControllerService,
    private diffTableControllerService: DiffTableControllerService,
    private dpListenControllerService: DpListenControllerService,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute

  ) { }


  ngOnInit() {

    this.tabledata = require('../../../../../assets/tabledata.json');
    this.loaddata()
    this.route.params.subscribe(
      (params: Params) => {
        if (params['taskid']) {
          this.taskid = params['taskid'];
          this.runidselect = params['runid'];
          this.tranidreturn = params['tranid'];
          
          this.loaddifftable();

          //  

        }

      }
    );
  }
  convert(arg0) {
    if (arg0) {
      let ans = arg0.replace(".___1", "");
      ans = ans.replace(".___2", "");
      ans = ans.replace("_____", "");
      ans = ans.replace("AAAAAmaintranid", "Recid");
      ans = ans.replace("AAAAAnewtranid", "Recid");
      if (ans.lastIndexOf(".___0") > 0) {
        return " ";
      }
      return ans;
    }
    return "";
  }


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
  convertmin(arg0) {
    if (arg0) {

      return arg0.substring(0, 25);

    }
    return "";
  }
  convertcheck(arg0) {
    if (arg0) {


      if (arg0.lastIndexOf("_____.___1") > -1) {
        return "srcb";
      }
      if (arg0.lastIndexOf("_____.___2") > -1) {
        return "tarb"
      }
      if (arg0.lastIndexOf(".___1") > -1) {
        return "src";
      }
      if (arg0.lastIndexOf(".___2") > -1) {
        return "tar"
      }

      if (arg0.lastIndexOf("AAAAAmaintranid") > -1) {
        return "rec";
      }
      if (arg0.lastIndexOf("AAAAAnewtranid") > -1) {
        return "tarrec";
      }

      if (arg0.lastIndexOf(".___0") > 0) {
        return "sp";
      }
      return "";
    }
    return "";
  }
  filterTabletran(arg0) {
    throw new Error('Method not implemented.');
  }
  tabnewstructTran: any = {};
  groupedTran: any = {};
  groupedTranoriginal: any = {};
  groupedTranval: any = {};


  load(taskid, runid) {
    this.router.navigate(['/tableview', {
      taskid: taskid,
      runid: runid

    }]);
  }
  loaddata() {
    this.taskControllerService.getTasknainUsingGET().subscribe(
      (response: any) => {

        // // alert(response);
        this.taskmainArray = response;
        if( this.taskmainArray[0]){
          this.taskid=this.taskmainArray[0].taskid;
          this.taskMainDTO=this.taskmainArray[0]
        }
        this.loadruniddata(false);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadruniddata(onload: boolean) {
    // alert(this.taskid);
    this.dplistenArray =[];
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
    // this.diffTableDTOArray = require('../../../../../assets/diff.json');
    // this.loadDifferenceTableHorizontal();
    this.diffTableDTOArray = [];
    this.grouped={};
    this.groupedoriginal={};
    this.changeDTOArray=[];
    this.diffTableControllerService.getDiffDataUsingPOST(this.diffTableDTO).subscribe(
      (response: any) => {

        // // alert(response);
        this.diffTableDTOArray = response;
        if (this.diffTableDTOArray[0]) {
          this.tranid = this.diffTableDTOArray[0]['maintranid'];
          // this.loadDifferenceTable();
          this.loadDifferenceTableHorizontal();
        }

      },
      (error) => {
        console.log(error);
      }
    );
  }
   

  loadDifferenceTableHorizontal() {
    this.addDTOArray = [];
    this.removeDTOArray = [];
    this.changeDTOArray = [];
    this.cdr.detectChanges();
    this.changeDTOArray = [];
    for (var diff_entry of this.diffTableDTOArray) {

      let a = "";
      a = diff_entry.difference;
      a = a.split('(').join('[')
      a = a.split(')').join(']')

      try {
        this.jsondiff = JSON.parse(a);
      } catch (error) {

      }
      diff_entry.difference = a;

      for (var val of this.jsondiff) {
        //  console.log(val);
        // console.log(val[0]);
        if (val[0] == 'add') {

          for (var v1 of val[2]) {
            this.addDTO = {};
            this.newstruct = {};
            if (this.tabnewstruct[this.gettname(v1[0]) + ":" + diff_entry.maintranid.split("|")[1]]) {
              this.newstruct = this.tabnewstruct[this.gettname(v1[0]) + ":" + diff_entry.maintranid.split("|")[1]]
            }
            this.addDTO['tname'] = this.gettname(v1[0]);
            this.addDTO['column'] = this.getcolumnname(v1[0]);
            this.addDTO['oldval'] = "_Missing_";
            this.addDTO['newval'] = v1[1];
            this.addDTO['maintranid'] = diff_entry.maintranid.split("|")[2];;
            this.addDTO['runid'] = diff_entry.runid;
            this.addDTO['taskid'] = diff_entry.taskid;
            this.newstruct[this.getcolumnname(v1[0]) + ".___1"] = "_Missing_";
            this.newstruct[this.getcolumnname(v1[0]) + ".___2"] = v1[1];
            this.newstruct[this.getcolumnname(v1[0]) + ".___0"] = " ";
            this.newstruct['AAAAAmaintranid'] = diff_entry.maintranid;
            this.newstruct['AAAAAnewtranid'] = diff_entry.newtranid;
            this.tabnewstruct[this.gettname(v1[0]) + ":" + diff_entry.maintranid.split("|")[1]] = this.newstruct
            this.changeDTOArray.push(this.addDTO);
          }
        }
        if (val[0] == 'remove') {
          for (var v1 of val[2]) {
            this.removeDTO = {};
            this.newstruct = {};
            if (this.tabnewstruct[this.gettname(v1[0]) + ":" + diff_entry.maintranid.split("|")[1]]) {
              this.newstruct = this.tabnewstruct[this.gettname(v1[0]) + ":" + diff_entry.maintranid.split("|")[1]]
            }
            this.removeDTO['tname'] = this.gettname(v1[0]);
            this.removeDTO['oldval'] = v1[1];
            this.removeDTO['column'] = this.getcolumnname(v1[0]);
            this.removeDTO['newval'] = "_Missing_";
            this.removeDTO['maintranid'] = diff_entry.maintranid.split("|")[2];;
            this.removeDTO['runid'] = diff_entry.runid;
            this.removeDTO['taskid'] = diff_entry.taskid;
            this.newstruct[this.getcolumnname(v1[0]) + ".___1"] = v1[1];
            this.newstruct[this.getcolumnname(v1[0]) + ".___2"] = "_Missing_";
            this.newstruct[this.getcolumnname(v1[0]) + ".___0"] = " ";
            this.newstruct['AAAAAmaintranid'] = diff_entry.maintranid;
            this.newstruct['AAAAAnewtranid'] = diff_entry.newtranid;
            this.tabnewstruct[this.gettname(v1[0]) + ":" + diff_entry.maintranid.split("|")[1]] = this.newstruct
            this.changeDTOArray.push(this.removeDTO);
          }
        }
        if (val[0] == 'change') {
          this.changeDTO = {};
          this.newstruct = {};
          if (this.tabnewstruct[this.gettname(val[1]) + ":" + diff_entry.maintranid.split("|")[1]]) {
            this.newstruct = this.tabnewstruct[this.gettname(val[1]) + ":" + diff_entry.maintranid.split("|")[1]]
          }

          this.changeDTO['tname'] = this.gettname(val[1]);
          this.changeDTO['column'] = this.getcolumnname(val[1]);
          this.changeDTO['oldval'] = val[2][0];
          this.changeDTO['newval'] = val[2][1];
          this.changeDTO['AAAAAmaintranid'] = diff_entry.maintranid;
          this.changeDTO['runid'] = diff_entry.runid;
          this.changeDTO['taskid'] = diff_entry.taskid;

          this.newstruct[this.getcolumnname(val[1]) + ".___1"] = val[2][0];
          this.newstruct[this.getcolumnname(val[1]) + ".___2"] = val[2][1];
          this.newstruct[this.getcolumnname(val[1]) + ".___0"] = " ";
          this.newstruct['AAAAAmaintranid'] = diff_entry.maintranid;
          this.newstruct['AAAAAnewtranid'] = diff_entry.newtranid;

          this.tabnewstruct[this.gettname(val[1]) + ":" + diff_entry.maintranid.split("|")[1]] = this.newstruct
          this.changeDTOArray.push(this.changeDTO);
        }
      }
    }
    //this.changeDTOArray.sort((a, b) => a.field.localeCompare(b.field));
    // this.grouped = this.changeDTOArray.reduce(
    //   (result:any, currentValue:any) => { 
    //     (result[currentValue['tname']] = result[currentValue['tname']] || []).push(currentValue);
    //     return result;
    //   }, {});

    // Group by city
    this.grouped = _.groupBy(this.changeDTOArray, "tname");

    this.tablecount=Object.keys(this.grouped).length;
    this.diffcount=0;
    Object.keys(this.grouped)
        .reduce((obj, key) => {
          this.diffcount=this.diffcount+this.grouped[key].length;
        return obj;
      }, {});
    // this.tabnewstruct=_.groupBy(this.newstruct, "tname");

    // Group by age within each city group
    if (this.tranidreturn == "") {
      this.tname = Object.keys(this.grouped)[0]
    }
    else {
      this.tname = this.gettname(this.tranidreturn.split("|")[0])
    }

    this.filterTable(this.tname)
    this.groupedoriginal = this.grouped;
    this.groupedval = this.grouped[Object.keys(this.grouped)[0]]
  }
  gettname(field) {
    if (Array.isArray(field)) {
      field = field[0];
    }
    let a = field.replace('INSERTING on FBNK_', '');
    a = a.replace('UPDATING on ', '');
    a = a.replace('DELETING on ', '');
    a = a.replace('INSERTING on ', '');
    a = a.replace('UPDATING on ', '');
    a = a.replace('DELETING on ', '');
    a = a.replace('INSERTING on ', '');
    a = a.replace('UPDATING on ', '');
    a = a.replace('DELETING on ', '');
    a = a.replace('/row/', '');
    let ans = a.split(":");
    let columnname = "";
    let tname = ans[0].split("_").join(".").replace('001', '')
    if (ans[2]) {
      let cname = ans[2].split("[")[0]
    }
    // if (this.tabledata[tname]) {
    //   columnname = this.tabledata[tname][cname.toUpperCase()]
    //   return tname + "." + columnname;
    // }
    return tname;
  }

  getcolumnname(field) {
    if (Array.isArray(field)) {
      field = field[0];
    }
    let a = field.replace('INSERTING on FBNK_', '');
    a = a.replace('UPDATING on FBNK_', '');
    a = a.replace('DELETING on FBNK_', '');
    a = a.replace('INSERTING on F_', '');
    a = a.replace('UPDATING on F_', '');
    a = a.replace('DELETING on F_', '');
    a = a.replace('INSERTING on FBSG_', '');
    a = a.replace('UPDATING on FBSG_', '');
    a = a.replace('DELETING on FBSG_', '');
    a = a.replace('/row/', '');
    let ans = a.split(":");
    let columnname = "";
    let tname = ans[0].split("_").join(".").replace('001', '')
    let cname = ans[2].split("[")[0]
    let apendind = "";
    if (ans[2].split("[")[1]) {
      apendind = "[" + ans[2].split("[")[1];
      apendind = processappend(apendind);
    }
    cname = cname.substring(cname.lastIndexOf("/") + 1)
    if (this.tabledata[tname]) {
      columnname = this.tabledata[tname][cname.toUpperCase()]
      return columnname + apendind;
    }
    return cname + apendind;
  }

  onMaintrainid(maintranid, runid, taskid) {
    this.router.navigate(['/transactionview', {
      taskid: taskid,
      runid: runid,
      tranid: maintranid
    }]);
  }
  search() {
    let cname = this.columnname
    //const arr1 = Object.keys(this.groupedoriginal).filter(d =>console.log('arr1', d));
  
   
    this.groupednewstructval = this.groupednewstructvaloriginal.filter((objj) => {
        return objj[cname].toUpperCase()  ==this.searchtext.toUpperCase();
    });

    if(this.searchtext == ""){
      this.groupednewstructval = this.groupednewstructvaloriginal;
    }
  }

  // searchchange() {

  //   let cname = this.columnname

  //   this.groupednewstructval = this.groupednewstructvaloriginal
  //     .filter(key => key[cname])
  //     .filter(key => key[cname].includes(this.searchtext.toUpperCase()));



  // }

  filterTable(tname) {
    this.clength = {};
    let sval = Object.keys(this.grouped)
      .filter(key => key.split(":")[0]==tname )
      .reduce((obj, key) => {
       // let t = key.replace(tname, '')
        obj[key] = this.grouped[key];
        this.clength[key] = Object.keys(this.grouped[key]).length;
        return obj;
      }, {});
    let colnames1 = new Set();
    this.groupednewstructval = Object.values(sval)[0]
    this.groupednewstructvaloriginal = Object.values(sval)[0]
    

  





    this.tname = tname

  }

  getcolumn(index): any {
    let v = this.groupednewstructval[index]['AAAAAmaintranid'];
    let k = v.split("|")[1];
    let length = this.clength[k];
    let collllength = this.colnames.length;
    this.colnamesdum = [];
    for (let i = 0; i < collllength - length; i = i + 3) {
      this.colnamesdum[i] = "c1.___0";
      this.colnamesdum[i + 1] = "c1.___1";
      this.colnamesdum[i + 2] = "c1.___2";
    }
    return this.colnamesdum;
  }



}
function processappend(apendind: string): string {
  if (apendind ){
    if(apendind.length==3){
      apendind = "[0" + apendind.split("[")[1];
    }
  }
  return apendind;
}

