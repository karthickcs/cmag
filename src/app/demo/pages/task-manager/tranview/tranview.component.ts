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
//************************************** */
// $('.collapse').not(':first').collapse(); // Collapse all but the first row on the page.

// This section makes the search work.

//********************************** */

@Component({
  selector: 'app-tranview',
  templateUrl: './tranview.component.html',
  styleUrls: ['./tranview.component.scss']
})
export class TranviewComponent implements OnInit {
diffcount: any;
tablecount: any;
  groupedtname:any={};
  groupedmlevel: any={};
  groupedmleveloriginal: any={};
  searchtextproduct: any= "";
filterTable(arg0: any) {

  this.searchtext=arg0.split(".").join("_");
this.search();
}


  searchtext: any = "";

  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };
 
  oldvaltname: any = "";
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
  tranid: any = 0;
  addfields: any = {};
  removefields: any = {};
  tabledata: any = {};
  grouped: any = {};
  groupedoriginal: any = {};

  constructor(private taskControllerService: TaskControllerService,
    private diffTableControllerService: DiffTableControllerService,
    private dpListenControllerService: DpListenControllerService,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef, private authservice: AuthService,
    private router: Router

  ) { }


  ngOnInit() {
    const object1 = {
      a: 'somestring',
      b: 42,
      c: false,
    };

    console.log(Object.keys(object1));
    // Expected output: Array ["a", "b", "c
    this.loaddata();

    this.tabledata = require('../../../../../assets/tabledata.json');

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
    this.diffTableDTO.taskid = "" + this.dplistenentry.taskid;
    this.diffTableDTO.runid = this.dplistenentry.runid;
    this.diffTableDTO.role = this.authservice.getRole();
    this.diffTableControllerService.getDiffDataUsingPOST(this.diffTableDTO).subscribe(
      (response: any) => {

        // // alert(response);
        this.diffTableDTOArray = response;
        if (this.diffTableDTOArray[0]) {
          this.tranid = this.diffTableDTOArray[0]['maintranid'];
          this.loadDifferenceTable();
        }

      },
      (error) => {
        console.log(error);
      }
    );
  }
  loadDifferenceTable() {
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
        console.log(val);
        console.log(val[0]);
        if (val[0] == 'add') {

          for (var v1 of val[2]) {
            this.addDTO = {};
            this.addDTO['tname'] = diff_entry.oracletname;
          this.addDTO['type'] = this.gettype(diff_entry.tval);
          this.addDTO['product'] = diff_entry.ttype;
          this.addDTO['column'] = this.getcolumnname(val[1], diff_entry.oracletname);
            this.addDTO['oldval'] = "Missing Tags";
            this.addDTO['newval'] = v1[1];
            this.addDTO['maintranid'] = diff_entry.maintranid;
            this.addDTO['tranid'] = diff_entry.maintranid.split("|")[2];
            this.addDTO['runid'] = diff_entry.runid;
            this.addDTO['taskid'] = diff_entry.taskid;
            this.addDTO['newtranid'] = diff_entry.newtranid;
            this.changeDTOArray.push(this.addDTO);
          }
        }
        if (val[0] == 'remove') {
          for (var v1 of val[2]) {
            this.removeDTO = {};
            this.removeDTO['tname'] = diff_entry.oracletname;
          this.removeDTO['type'] = this.gettype(diff_entry.tval);
          this.removeDTO['product'] = diff_entry.ttype;
          this.removeDTO['column'] = this.getcolumnname(val[1], diff_entry.oracletname);
            this.removeDTO['oldval'] = v1[1];
            
            this.removeDTO['newval'] = "Missing Tags";
            this.removeDTO['maintranid'] = diff_entry.maintranid;
            this.removeDTO['tranid'] = diff_entry.maintranid.split("|")[2];
            this.removeDTO['runid'] = diff_entry.runid;
            this.removeDTO['taskid'] = diff_entry.taskid;
            this.removeDTO['newtranid'] = diff_entry.newtranid;
            this.changeDTOArray.push(this.removeDTO);
          }
        }
        if (val[0] == 'change') {
          this.changeDTO = {};
        
          this.changeDTO['tname'] = diff_entry.oracletname;
          this.changeDTO['type'] = this.gettype(diff_entry.tval);
          this.changeDTO['product'] = diff_entry.ttype;
          this.changeDTO['column'] = this.getcolumnname(val[1], diff_entry.oracletname);
          this.changeDTO['oldval'] = val[2][0];
          this.changeDTO['newval'] = val[2][1];
          this.changeDTO['maintranid'] = diff_entry.maintranid +"|"+diff_entry.oracletname.split('.').join('_');
          this.changeDTO['tranid'] = diff_entry.maintranid.split("|")[2];
          this.changeDTO['runid'] = diff_entry.runid;
          this.changeDTO['taskid'] = diff_entry.taskid;
          this.changeDTO['newtranid'] = diff_entry.newtranid;
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
    this.groupedtname = _.groupBy(this.changeDTOArray, "tname");
    const groupedBytranid = _.groupBy(this.changeDTOArray, "tranid");
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
    this.groupedmleveloriginal=this.groupedmlevel ;
    // Group by age within each city group
    this.grouped = _.mapValues(groupedBytranid, (maintranidgr) => {
      return _.groupBy(maintranidgr, "maintranid");
    });

    this.groupedoriginal = this.grouped;
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
    try {
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
    } catch (error) {
      return field;
    }
    
  }
  processappend(apendind: string): string {
    if (apendind) {
      if (apendind.length == 3) {
        apendind = "[0" + apendind.split("[")[1];
      }
    }
    return apendind;
  }
  onMaintrainid(maintranid, runid, taskid) {
    this.router.navigate(['/transactionview', {
      taskid: taskid,
      runid: runid,
      tranid: maintranid
    }]);
  }
  search() {

    //const arr1 = Object.keys(this.groupedoriginal).filter(d =>console.log('arr1', d));
    this.grouped = Object.keys(this.groupedoriginal)
      .filter(key => 
        JSON.stringify(Object.keys(this.groupedoriginal[key])).includes(this.searchtext.toUpperCase()))
      .reduce((obj, key) => {
        obj[key] = this.groupedoriginal[key];
        return obj;
      }, {});

  }
  genTargetid(arg0: any) {
    let tarid = "";
    for (let row of arg0) {

      tarid = row['newtranid'];
      break;
    }

    return tarid.split("|")[1];
  }
  searchchange() {



    this.grouped = Object.keys(this.groupedoriginal)
      .filter(key => JSON.stringify(Object.keys(this.groupedoriginal[key])).includes(this.searchtext.toUpperCase()))
      .reduce((obj, key) => {
        obj[key] = this.groupedoriginal[key];
        return obj;
      }, {});


  }
  genTname(arg0: any) {
    let tname = "";
    for (let row of arg0) {

      tname = row['tname'];
      break;
    }

    return tname;
  }
  gettnameList(arg0: any) {
    let tname = "";
    
    Object.keys(arg0)
      .reduce((obj, key) => {
        let tnamefind = arg0[key];
        if (!tname.includes(tnamefind[0]['product'])) {
          tname += "   |   " + tnamefind[0]['product'];
        }
  
        return obj;
      }, {});
      
    return tname + "   |  ";
  }

  gettype(tval: any): any {
      
    if (tval=='TR' ){
      return "Transactional";
    }
    return "Static";
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

    onclick(arg0: string) {
      this.searchtextproduct=arg0;
      this.searchchangeproduct();
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
}
