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
import { AuthService } from '../../../../auth/auth.service';
declare var $: any;

@Component({
  selector: 'app-viewwindna',
  templateUrl: './viewwind.component.html',
  styleUrls: ['./viewwind.component.scss']
})
export class ViewwindComponent implements OnInit {
  type: any;
onclick(arg0: string) {
  this.searchtextproduct=arg0;
  this.searchchangeproduct();
}

searchtextproduct: any ="";

tablemapcoll: any={};
groupednewstructvalObjectTable: {};
  groupedmlevel: any={};
  groupedmleveloriginal: any={};


  mapper = {
    "AA": "Arrangement Architecture",
    "PP": "Payments",
    "FT": "Payments",
    "ENTRY": "Accounting",
    "SC": "Securities",
    "DX": "Derivatives",
    "MM": "Money Market",
    "FX": "Forex",
  }
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
  constructor(private taskControllerService: TaskControllerService,
    private diffTableControllerService: DiffTableControllerService,
    private dpListenControllerService: DpListenControllerService,
    private alertService: AlertService,private authservice: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute

  ) { }


  ngOnInit() {

    this.tabledata = require('../../../../../assets/tabledata.json');
    
    this.route.params.subscribe(
      (params: Params) => {
        if (params['taskid']) {
          this.taskid = params['taskid'];
          this.runidselect = params['runid'];
          this.tranidreturn = params['tranid'];
          this.type = params['type'];
          this.loaddata(true)
          this.loaddifftable();

          //  

        }
        else{
          this.loaddata(false);
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
      if(ans.length <10)
      {
        return  ans;
      }
      else{
      return ans;
      }
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

      if(arg0.length<18){
        return   arg0.padEnd(18," ");;
      }
      else{
      return arg0.substring(0, 18);
      }

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
    this.loaddifftable();
  }
  loaddifftable() {
    this.diffTableDTO.taskid = "" + this.taskid;
    this.diffTableDTO.runid = this.runidselect;
    this.diffTableDTO.role= this.authservice.getRole();
    // this.diffTableDTOArray = require('../../../../../assets/diff.json');
    // this.loadDifferenceTableHorizontal();
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
            if (this.tabnewstruct[diff_entry.oracletname + ":" + diff_entry.maintranid.split("|")[1]]) {
              this.newstruct = this.tabnewstruct[diff_entry.oracletname + ":" + diff_entry.maintranid.split("|")[1]]
            }
            this.addDTO['tname'] = diff_entry.oracletname;
            this.addDTO['type'] = this.gettype(diff_entry.tval);
            this.addDTO['product'] = diff_entry.ttype;
            this.addDTO['column'] = this.getcolumnname(v1[0], diff_entry.oracletname);
            this.addDTO['oldval'] = "_Missing_";
            this.addDTO['newval'] = v1[1];
            this.addDTO['maintranid'] = diff_entry.maintranid.split("|")[2];;
            this.addDTO['runid'] = diff_entry.runid;
            this.addDTO['taskid'] = diff_entry.taskid;
            this.newstruct[this.getcolumnname(v1[0], diff_entry.oracletname) + ".___1"] = "_Missing_";
            this.newstruct[this.getcolumnname(v1[0], diff_entry.oracletname) + ".___2"] = v1[1];
            this.newstruct[this.getcolumnname(v1[0], diff_entry.oracletname) + ".___0"] = " ";
            this.newstruct['AAAAAmaintranid'] = diff_entry.maintranid;
            this.newstruct['AAAAAnewtranid'] = diff_entry.newtranid;
            this.tabnewstruct[diff_entry.oracletname + ":" + diff_entry.maintranid.split("|")[1]] = this.newstruct
            this.tabnewstructdetail[diff_entry.oracletname +":"+ diff_entry.maintranid.split("|")[1]+":" + diff_entry.maintranid.split("|")[2]] = this.newstruct
            this.changeDTOArray.push(this.addDTO);
          }
        }
        if (val[0] == 'remove') {
          for (var v1 of val[2]) {
            this.removeDTO = {};
            this.newstruct = {};
            if (this.tabnewstruct[diff_entry.oracletname + ":" + diff_entry.maintranid.split("|")[1]]) {
              this.newstruct = this.tabnewstruct[diff_entry.oracletname + ":" + diff_entry.maintranid.split("|")[1]]
               
            }
            this.removeDTO['tname'] = diff_entry.oracletname;
            this.removeDTO['type'] = this.gettype(diff_entry.tval);
            this.removeDTO['product'] = diff_entry.ttype;

            this.removeDTO['oldval'] = v1[1];
            this.removeDTO['column'] = this.getcolumnname(v1[0],diff_entry.oracletname);
            this.removeDTO['newval'] = "_Missing_";
            this.removeDTO['maintranid'] = diff_entry.maintranid.split("|")[2];;
            this.removeDTO['runid'] = diff_entry.runid;
            this.removeDTO['taskid'] = diff_entry.taskid;
            this.newstruct[this.getcolumnname(v1[0], diff_entry.oracletname) + ".___1"] = v1[1];
            this.newstruct[this.getcolumnname(v1[0], diff_entry.oracletname) + ".___2"] = "_Missing_";
            this.newstruct[this.getcolumnname(v1[0], diff_entry.oracletname) + ".___0"] = " ";
            this.newstruct['AAAAAmaintranid'] = diff_entry.maintranid;
            this.newstruct['AAAAAnewtranid'] = diff_entry.newtranid;
            this.tabnewstruct[diff_entry.oracletname + ":" + diff_entry.maintranid.split("|")[1]] = this.newstruct
            this.tabnewstructdetail[diff_entry.oracletname+":"+ diff_entry.maintranid.split("|")[1]+":" + diff_entry.maintranid.split("|")[2]] = this.newstruct
            this.changeDTOArray.push(this.removeDTO);
          }
        }
        if (val[0] == 'change') {
          this.changeDTO = {};
          this.newstruct = {};
          if (this.tabnewstruct[diff_entry.oracletname + ":" + diff_entry.maintranid.split("|")[1]]) {
            this.newstruct = this.tabnewstruct[diff_entry.oracletname + ":" + diff_entry.maintranid.split("|")[1]]
            
          }

          this.changeDTO['tname'] = diff_entry.oracletname;
          this.changeDTO['type'] = this.gettype(diff_entry.tval);
          this.changeDTO['product'] = diff_entry.ttype;
          this.changeDTO['column'] = this.getcolumnname(val[1], diff_entry.oracletname);
          this.changeDTO['oldval'] = val[2][0];
          this.changeDTO['newval'] = val[2][1];
          this.changeDTO['AAAAAmaintranid'] = diff_entry.maintranid;
          this.changeDTO['runid'] = diff_entry.runid;
          this.changeDTO['taskid'] = diff_entry.taskid;

          this.newstruct[this.getcolumnname(val[1], diff_entry.oracletname) + ".___1"] = val[2][0];
          this.newstruct[this.getcolumnname(val[1], diff_entry.oracletname) + ".___2"] = val[2][1];
          this.newstruct[this.getcolumnname(val[1], diff_entry.oracletname) + ".___0"] = " ";
          this.newstruct['AAAAAmaintranid'] = diff_entry.maintranid;
          this.newstruct['AAAAAnewtranid'] = diff_entry.newtranid;

          this.tabnewstruct[diff_entry.oracletname + ":" + diff_entry.maintranid.split("|")[1]] = this.newstruct
          this.tabnewstructdetail[diff_entry.oracletname+":"+ diff_entry.maintranid.split("|")[1]+":" + diff_entry.maintranid.split("|")[2]] = this.newstruct
          this.changeDTOArray.push(this.changeDTO);
        }
      }
    }
     
    this.grouped = _.groupBy(this.changeDTOArray, "tname");
    const groupbytype = _.groupBy(this.changeDTOArray, "type"); 
     
    // Group by age within each city group
    const groupbyproduct = _.mapValues(groupbytype, (maintranidgr) => {
      return _.groupBy(maintranidgr, "product");
    });
    this.groupedmlevel = _.mapValues(groupbyproduct, (maintranidgr) => {
      return  _.mapValues(maintranidgr, (level2) =>  {
        return _.groupBy(level2, "tname");
      });
      
    });
    if (!this.groupedmlevel['Static']){
      this.groupedmlevel['Static']={};
    }
    if(this.type=='S'){
      this.groupedmlevel = _.omit(this.groupedmlevel,'Transactional');
    }
    if(this.type=='T'){
      this.groupedmlevel = _.omit(this.groupedmlevel,'Static');
    }

   
    this.groupedmleveloriginal=this.groupedmlevel ;
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
      this.tname = Object.keys(this.grouped).sort()[0]
    }
    else {
      this.tname = this.gettname(this.tranidreturn.split("|")[0])
    }

    this.filterTable(this.tname)
    this.groupedoriginal = this.grouped;
    this.groupedval = this.grouped[Object.keys(this.grouped).sort()[0]]
  }
  
  gettype(tval: any): any {
      
      if (tval=='TR' ){
        return "Transactional";
      }
      return "Static";
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

  getcolumnname(field,tnameorac) {
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
      apendind = this.processappend(apendind);
    }
    cname = cname.substring(cname.lastIndexOf("/") + 1)
    let tnameval=tnameorac.substring( tnameorac.indexOf("_")+1)
    if (this.tabledata[tnameval]) {
      columnname = this.tabledata[tnameval][cname.toUpperCase()]
      return columnname + apendind;
    }
    return cname + apendind;
  }

  onMaintrainid(maintranid, runid, taskid) {
    this.router.navigate(['/windowstran', {
      taskid: taskid,
      runid: runid,
      tranid: maintranid
    }]);
  }
  search() {
    let cname = this.columnname
    //const arr1 = Object.keys(this.groupedoriginal).filter(d =>console.log('arr1', d));
    this.groupednewstructval = this.groupednewstructvaloriginal
      .filter(key => key[cname])
      .filter(key => key[cname].includes(this.searchtext.toUpperCase()));

      this.tablemap = new Array(this.groupednewstructval.length)
      .fill(" ")
      .map(() =>
        new Array(this.colnames.length).fill(" ")
      );

    for (let i = 0; i < this.groupednewstructval.length; i++) {
      let strkeys = Object.keys(this.groupednewstructval[i])
      for (var kk of strkeys) {
        let fval = this.groupednewstructval[i][kk];
        let colindx=this.colnames.indexOf(kk);
        this.tablemap[i][colindx]=fval;
      }

    }
  }

  searchchange() {

    let cname = this.columnname

    this.groupednewstructval = this.groupednewstructvaloriginal
      .filter(key => key[cname])
      .filter(key => key[cname].includes(this.searchtext.toUpperCase()));



  }

  filterTable(tname) {
    this.clength = {};
    let sval = Object.keys(this.tabnewstruct)
      .filter(key => key.split(":")[0]==tname  )
      .reduce((obj, key) => {
        let t = key.replace(tname, '')
        obj[t] = this.tabnewstruct[key];
        this.clength[t] = Object.keys(this.tabnewstruct[key]).length;
        return obj;
      }, {});
    let colnames1 = new Set();
    this.groupednewstructval = Object.values(sval)
    this.groupednewstructvaloriginal = Object.values(sval)
    Object.keys(this.groupednewstructval)
      .reduce((obj, key) => {
        Object.keys(this.groupednewstructval[key])
          .reduce((obji, keyi) => {
            colnames1.add(keyi);
            return {};
          }, {});

        return {};
      }, {});
    this.colnames = Array.from(colnames1).sort();


    this.tablemap = new Array(this.groupednewstructval.length)
      .fill(" ")
      .map(() =>
        new Array(this.colnames.length).fill(" ")
      );

    for (let i = 0; i < this.groupednewstructval.length; i++) {
      let strkeys = Object.keys(this.groupednewstructval[i])
      for (var kk of strkeys) {
        let fval = this.groupednewstructval[i][kk];
        let colindx=this.colnames.indexOf(kk);
        this.tablemap[i][colindx]=fval;
      }

    }

    // for (let i = this.colnames.length; i < 30; i = i + 3) {
    //   this.colnames[i] = ".___0";
    //   this.colnames[i + 1] = "_____.___1";
    //   this.colnames[i + 2] = "_____.___2";
    // }





    this.tname = tname

  }

  getcolumn(index): any {
    let v = this.groupednewstructval[index]['AAAAAmaintranid'];
    let k = v.split("|")[1];
    let length = this.clength[k];
    let collllength = this.colnames.length;
    this.colnamesdum = [];
    for (let i = 0; i < collllength - length; i = i + 2) {
    //  this.colnamesdum[i] = "c1.___0";
      this.colnamesdum[i + 1] = "c1.___1";
      this.colnamesdum[i + 2] = "c1.___2";
    }
    return this.colnamesdum;
  }

    processappend(apendind: string): string {
    if (apendind ){
      if(apendind.length==3){
        apendind = "[0" + apendind.split("[")[1];
      }
    }
    return apendind;
  }
  lodtrandata(tranid) {
    let tname = tranid.split("|")[2];
    this.clength = {};
    let sval = Object.keys(this.tabnewstructdetail)
      .filter(key => key.includes(tname))
      .reduce((obj, key) => {
        let t = key.replace(tname, '')
        obj[key] = this.tabnewstructdetail[key];
        this.clength[t] = Object.keys(this.tabnewstructdetail[key]).length;
        return obj;
      }, {});
    this.colmaster = {}
 
    this.groupednewstructvalObject = sval
    this.groupednewstructvaloriginalObject = sval
    this.groupednewstructvalObjectTable={};
    this.groupednewstructvalObjectTable = Object.entries(this.groupednewstructvalObject).reduce((r, [k, v]) => {
      var key = k.split(":")[0] ;
      (r[key] = r[key] || {})[k] = v;
      return r;
  }, {});


  Object.keys(this.groupednewstructvalObjectTable)
  .reduce((obj, key) => {
    let colnames1 = new Set();
    
    Object.keys(this.groupednewstructvalObjectTable[key])
      .reduce((obji, keyi) => {
        Object.keys(this.groupednewstructvalObjectTable[key][keyi])
        .reduce((obji, keyj) => {
  
          colnames1.add(keyj);
          return {};
        }, {});
        
        return {};
      }, {});
    this.colmaster[key.split(":")[0]] = Array.from(colnames1).sort();
    ;
    return {};
  }, {});

  Object.keys(this.groupednewstructvalObjectTable)
  .reduce((obj, key) => {
    this.tablemaptran = new Array(Object.keys(this.groupednewstructvalObjectTable[key]).length)
    .fill(" ");
    Object.keys(this.groupednewstructvalObjectTable[key])
    .reduce((obji, keyi) => {

      this.tablemaptran=this.tablemaptran
      .map(() =>
        new Array(this.colmaster[keyi.split(":")[0]].length).fill(" ")
      );
       
        
      return {};
    }, {});

    this.tablemapcoll[key] = this.tablemaptran;
    return {};
  }, {});


   
  Object.keys(this.groupednewstructvalObjectTable)
  .reduce((obj, key) => {
    let i=0;
    Object.keys(this.groupednewstructvalObjectTable[key])
    .reduce((obji, keyi) => {
      let strkeys = Object.keys(this.groupednewstructvalObjectTable[key][keyi])
      for (var kk of strkeys) {
        let fval = this.groupednewstructvalObjectTable[key][keyi][kk];
        let colindx=this.colmaster[keyi.split(":")[0]].indexOf(kk);
        this.tablemapcoll[key][i][colindx]=fval;
      }
      i=i+1;
      return {};
    }, {});
    
 
    return {};
  }, {}); 


  
     

  
  for (let i = 0; i < this.groupednewstructval.length; i++) {
    let strkeys = Object.keys(this.groupednewstructval[i])
    for (var kk of strkeys) {
      let fval = this.groupednewstructval[i][kk];
      let colindx=this.colnames.indexOf(kk);
     // this.tablemaptran[i][colindx]=fval;
    }

  }

    
    this.tname = tname

  }


  searchchangeproduct() {
    this.groupedmlevel=JSON.parse(JSON.stringify(this.groupedmleveloriginal));
    if(this.searchtextproduct.trim()==""){
     
      return;
    }
   
     
    if(this.groupedmlevel['Transactional']){
    let tmap = Object.keys(this.groupedmlevel['Transactional'])
    .filter(key => key.includes(this.searchtextproduct.toUpperCase()))
    .reduce((obj, key) => {
      obj[key] = this.groupedmlevel['Transactional'][key];
      return obj;
    }, {});
    this.groupedmlevel['Transactional']= tmap;
    }
    let tempstatic=this.groupedmlevel['Static'];
    if(this.groupedmlevel['Static']){
    let tstaticmap = Object.keys(this.groupedmlevel['Static'])
    .filter(key => key.includes(this.searchtextproduct.toUpperCase()))
    .reduce((obj, key) => {
      obj[key] = this.groupedmlevel['Static'][key];
      return obj;
    }, {});
    this.groupedmlevel['Static']= tstaticmap;
  }
  }

  calculateDiff(arg0: any) {
    try {
      let gp=  _.groupBy(arg0, "AAAAAmaintranid");
      return Object.keys(gp).length;
    } catch (error) {
      return 0;
    }
    
    }
    calculateDiffFull(arg0: any) {
      let count=0;
      
        Object.keys(arg0)    
    .reduce((obj, key) => {
      try {
        let gp=  _.groupBy(arg0[key], "AAAAAmaintranid");
        count =count+Object.keys(gp).length;
      } catch (error) {
        
      }
    
      return obj;
    }, {});
         
       return count ; 
     
      
      }
}


