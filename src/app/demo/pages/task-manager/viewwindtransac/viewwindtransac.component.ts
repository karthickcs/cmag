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
//************************************** */
// $('.collapse').not(':first').collapse(); // Collapse all but the first row on the page.

// This section makes the search work.

//********************************** */
@Component({
  selector: 'app-viewwindtransac',
  templateUrl: './viewwindtransac.component.html',
  styleUrls: ['./viewwindtransac.component.scss']
})
export class ViewwindtransacComponent implements OnInit {

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
  tranidoriginal: any="";
  groupednewstructvalObjectTable: {};
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
    this.loaddata();
    this.route.params.subscribe(
      (params: Params) => {
        if (params['taskid']) {
          this.taskid = params['taskid'];
          this.runidselect = params['runid'];
          this.tranidoriginal=params['tranid']
          this.tranidoriginal = this.tranidoriginal.replace("s2.","");
          this.loaddifftable(params['tranid']);

          //  

        }

      }
    );


  }
  convertmin(arg0) {
    if (arg0) {

      return arg0.substring(0, 10);

    }
    return "";
  }
  convertcheck(arg0) {
    if (arg0) {
      if (arg0.lastIndexOf("_____.1") > -1) {
        return "srcb";
      }
      if (arg0.lastIndexOf("_____.2") > -1) {
        return "tarb"
      }
      if (arg0.lastIndexOf(".1") > -1) {
        return "src";
      }
      if (arg0.lastIndexOf(".2") > -1) {
        return "tar"
      }

      if (arg0.lastIndexOf("AAAAAmaintranid") > -1) {
        return "rec";
      }
      if (arg0.lastIndexOf("AAAAAnewtranid") > -1) {
        return "rec";
      }
      if (arg0.lastIndexOf(".0") > 0) {
        return "sp";
      }
      return "";
    }
    return "";
  }
  convert(arg0) {
    if (arg0) {
      let ans = arg0.replace(".1", "");
      ans = ans.replace(".2", "");
      ans = ans.replace("_____", "");
      ans = ans.replace("AAAAAmaintranid", "Recid");
      ans = ans.replace("AAAAAnewtranid", "Tar_Recid");
      if (ans.lastIndexOf(".0") > 0) {
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


  loaddata() {
    this.taskControllerService.getTasknainUsingGET().subscribe(
      (response: any) => {

        // // alert(response);
        this.taskmainArray = response;
        this.loadruniddata(true)
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
        // this.loadrunid();
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
    this.loaddifftable(null);
  }
  loaddifftable(tid: any) {
    this.diffTableDTO.taskid = "" + this.taskid;
    this.diffTableDTO.runid = this.runidselect;
    this.diffTableControllerService.getDiffDataUsingPOST(this.diffTableDTO).subscribe(
      (response: any) => {

        // // alert(response);
        this.diffTableDTOArray = response;
        if (this.diffTableDTOArray[0]) {
          this.tranid = this.diffTableDTOArray[0]['maintranid'];

          this.loadDifferenceTableHorizontal(tid);
        }

      },
      (error) => {
        console.log(error);
      }
    );
  }



  loadDifferenceTableHorizontal(tid: any) {
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
            if (this.tabnewstruct[this.gettname(v1[0])+":"+ diff_entry.maintranid.split("|")[1]+":" + diff_entry.maintranid.split("|")[2]]) {
              this.newstruct = this.tabnewstruct[this.gettname(v1[0])+":"+ diff_entry.maintranid.split("|")[1]+":" + diff_entry.maintranid.split("|")[2]]
            }
            this.addDTO['tname'] = this.gettname(v1[0]);
            this.addDTO['column'] = this.getcolumnname(v1[0]);
            this.addDTO['oldval'] = "_Missing_";
            this.addDTO['newval'] = v1[1];
            this.addDTO['maintranid'] = diff_entry.maintranid.split("|")[2];;
            this.addDTO['runid'] = diff_entry.runid;
            this.addDTO['taskid'] = diff_entry.taskid;
            this.newstruct[this.getcolumnname(v1[0]) + ".1"] = "_Missing_";
            this.newstruct[this.getcolumnname(v1[0]) + ".2"] = v1[1];
            this.newstruct[this.getcolumnname(v1[0]) + ".0"] = " ";
            this.newstruct['AAAAAmaintranid'] = diff_entry.maintranid;
            this.newstruct['AAAAAnewtranid'] = diff_entry.newtranid;
            this.tabnewstruct[this.gettname(v1[0])+":"+ diff_entry.maintranid.split("|")[1]+":" + diff_entry.maintranid.split("|")[2]] = this.newstruct
            this.changeDTOArray.push(this.addDTO);
          }
        }
        if (val[0] == 'remove') {
          for (var v1 of val[2]) {
            this.removeDTO = {};
            this.newstruct = {};
            if (this.tabnewstruct[this.gettname(v1[0])+":"+ diff_entry.maintranid.split("|")[1]+":" + diff_entry.maintranid.split("|")[2]]) {
              this.newstruct = this.tabnewstruct[this.gettname(v1[0])+":"+ diff_entry.maintranid.split("|")[1]+":" + diff_entry.maintranid.split("|")[2]]
            }
            this.removeDTO['tname'] = this.gettname(v1[0]);
            this.removeDTO['oldval'] = v1[1];
            this.removeDTO['column'] = this.getcolumnname(v1[0]);
            this.removeDTO['newval'] = "_Missing_";
            this.removeDTO['maintranid'] = diff_entry.maintranid.split("|")[2];;
            this.removeDTO['runid'] = diff_entry.runid;
            this.removeDTO['taskid'] = diff_entry.taskid;
            this.newstruct[this.getcolumnname(v1[0]) + ".1"] = v1[1];
            this.newstruct[this.getcolumnname(v1[0]) + ".2"] = "_Missing_";
            this.newstruct[this.getcolumnname(v1[0]) + ".0"] = " ";
            this.newstruct['AAAAAmaintranid'] = diff_entry.maintranid;
            this.newstruct['AAAAAnewtranid'] = diff_entry.newtranid;
            this.tabnewstruct[this.gettname(v1[0])+":"+ diff_entry.maintranid.split("|")[1]+":" + diff_entry.maintranid.split("|")[2]] = this.newstruct
            this.changeDTOArray.push(this.removeDTO);
          }
        }
        if (val[0] == 'change') {
          this.changeDTO = {};
          this.newstruct = {};
          if (this.tabnewstruct[this.gettname(val[1])+":"+ diff_entry.maintranid.split("|")[1]+":" + diff_entry.maintranid.split("|")[2]]) {
            this.newstruct = this.tabnewstruct[this.gettname(val[1])+":"+ diff_entry.maintranid.split("|")[1]+":" + diff_entry.maintranid.split("|")[2]]
          }

          this.changeDTO['tname'] = this.gettname(val[1]);
          this.changeDTO['column'] = this.getcolumnname(val[1]);
          this.changeDTO['oldval'] = val[2][0];
          this.changeDTO['newval'] = val[2][1];
          this.changeDTO['AAAAAmaintranid'] = diff_entry.maintranid.split("|")[2];;
          this.changeDTO['runid'] = diff_entry.runid;
          this.changeDTO['taskid'] = diff_entry.taskid;

          this.newstruct[this.getcolumnname(val[1]) + ".1"] = val[2][0];
          this.newstruct[this.getcolumnname(val[1]) + ".2"] = val[2][1];
          this.newstruct[this.getcolumnname(val[1]) + ".0"] = " ";
          this.newstruct['AAAAAmaintranid'] = diff_entry.maintranid;
          this.newstruct['AAAAAnewtranid'] = diff_entry.newtranid;
          this.tabnewstruct[this.gettname(val[1])+":"+ diff_entry.maintranid.split("|")[1]+":" + diff_entry.maintranid.split("|")[2]] = this.newstruct
          this.changeDTOArray.push(this.changeDTO);
        }
      }
    }

    this.grouped = _.groupBy(this.changeDTOArray, "AAAAAmaintranid");
    // this.tabnewstruct=_.groupBy(this.newstruct, "tname");

    // Group by age within each city group

    this.tname = tid
    this.filterTable(tid)
    this.groupedoriginal = this.grouped;
    this.groupedval = this.grouped[Object.keys(this.grouped)[0]]
  }
  gettname(field) {
    if (Array.isArray(field)) {
      field = field[0];
    }
    let a = field.replace('INSERTING on ', '');
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
      apendind = this.processappend(apendind);
    }
    cname = cname.substring(cname.lastIndexOf("/") + 1)
    if (this.tabledata[tname]) {
      columnname = this.tabledata[tname][cname.toUpperCase()]
      return columnname + apendind;
    }
    return cname + apendind;
  }
   processappend(apendind: string): string {
    if (apendind ){
      if(apendind.length==3){
        apendind = "[0" + apendind.split("[")[1];
      }
    }
    return apendind;
  }
  goBack( runid, taskid) {
    this.router.navigate(['/windowsna', {
      taskid: taskid,
      runid: runid,
      tranid: this.tranidoriginal
    }]);
  }
  onMaintrainid(maintranid, runid, taskid) {
    this.router.navigate(['/reports', {
      taskid: taskid,
      runid: runid,
      tranid: maintranid
    }]);
  }
  search() {
    alert(this.searchtext)
    let cname = this.columnname
    //const arr1 = Object.keys(this.groupedoriginal).filter(d =>console.log('arr1', d));
    this.groupednewstructval = this.groupednewstructvaloriginal
      .filter(key => key[cname])
      .filter(key => key[cname].includes(this.searchtext.toUpperCase()));
    if (this.searchtext == '') {
      this.groupednewstructval = this.groupednewstructvaloriginal
    }

  }

  searchchange() {

    let cname = this.columnname

    this.groupednewstructval = this.groupednewstructvaloriginal
      .filter(key => key[cname])
      .filter(key => key[cname].includes(this.searchtext.toUpperCase()));



  }

  filterTable(tnamefull) {
    let tname = tnamefull.split("|")[2];
    this.clength = {};
    let sval = Object.keys(this.tabnewstruct)
      .filter(key => key.includes(tname))
      .reduce((obj, key) => {
        let t = key.replace(tname, '')
        obj[key] = this.tabnewstruct[key];
        this.clength[t] = Object.keys(this.tabnewstruct[key]).length;
        return obj;
      }, {});
    this.colmaster = {}
    this.groupednewstructval = Object.values(sval)
    this.groupednewstructvaloriginal = Object.values(sval)
    this.groupednewstructvalObject = sval
    this.groupednewstructvaloriginalObject = sval
    this.groupednewstructvalObjectTable={};
    this.groupednewstructvalObjectTable = Object.entries(this.groupednewstructvalObject).reduce((r, [k, v]) => {
      var key = k.split(":")[0] ;
      (r[key] = r[key] || {})[k] = v;
      return r;
  }, {});



    Object.keys(this.groupednewstructvalObject)
      .reduce((obj, key) => {
        let colnames1 = new Set();
        
        Object.keys(this.groupednewstructvalObject[key])
          .reduce((obji, keyi) => {

            colnames1.add(keyi);
            return {};
          }, {});
        this.colmaster[key.split(":")[0]] = Array.from(colnames1).sort();
        ;
        return {};
      }, {});
    for (let key of Object.keys(this.colmaster)) {
      for (let i = this.colmaster[key].length; i < 30; i = i + 3) {
        this.colmaster[key][i] = ".0";
        this.colmaster[key][i + 1] = "_____.1";
        this.colmaster[key][i + 2] = "_____.2";
      }
    }
    this.tname = tname

  }
  getcolumn(tname): any {

    let length = this.clength[tname];
    let collllength = this.colmaster[tname].length;
    this.colnamesdum = [];
    for (let i = 0; i < collllength - length; i = i + 3) {
      this.colnamesdum[i] = "c1.0";
      this.colnamesdum[i + 1] = "c1.1";
      this.colnamesdum[i + 2] = "c1.2";
    }
    return this.colnamesdum;
  }
}
