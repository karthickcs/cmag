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
  selector: 'app-viewacc',
  templateUrl: './viewacc.component.html',
  styleUrls: ['./viewacc.component.scss']
})
export class ViewaccComponent implements OnInit {

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
    private cdr: ChangeDetectorRef,
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
            this.addDTO['tname'] = this.gettname(v1[0]);
            this.addDTO['column'] = this.getcolumnname(v1[0]);
            this.addDTO['oldval'] = "Missing Tags";
            this.addDTO['newval'] = v1[1];
            this.addDTO['maintranid'] = diff_entry.maintranid;
            this.addDTO['runid'] = diff_entry.runid;
            this.addDTO['taskid'] = diff_entry.taskid;
            this.changeDTOArray.push(this.addDTO);
          }
        }
        if (val[0] == 'remove') {
          for (var v1 of val[2]) {
            this.removeDTO = {};
            this.removeDTO['tname'] = this.gettname(v1[0]);
            this.removeDTO['oldval'] = v1[1];
            this.removeDTO['column'] = this.getcolumnname(v1[0]);
            this.removeDTO['newval'] = "Missing Tags";
            this.removeDTO['maintranid'] = diff_entry.maintranid;
            this.removeDTO['runid'] = diff_entry.runid;
            this.removeDTO['taskid'] = diff_entry.taskid;
            this.changeDTOArray.push(this.removeDTO);
          }
        }
        if (val[0] == 'change') {
          this.changeDTO = {};
          this.changeDTO['tname'] = this.gettname(val[1]);
          this.changeDTO['column'] = this.getcolumnname(val[1]);
          this.changeDTO['oldval'] = val[2][0];
          this.changeDTO['newval'] = val[2][1];
          this.changeDTO['maintranid'] = diff_entry.maintranid;
          this.changeDTO['runid'] = diff_entry.runid;
          this.changeDTO['taskid'] = diff_entry.taskid;
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
    const groupedBytname = _.groupBy(this.changeDTOArray, "tname");

    // Group by age within each city group
    this.grouped = _.mapValues(groupedBytname, (maintranidgr) => {
      return _.groupBy(maintranidgr, "maintranid");
    });

    this.groupedoriginal = this.grouped;
  }


  gettname(field) {
    if (Array.isArray(field)){
      field=field[0];
    }
    let a = field.replace('INSERTING on FBNK_', '');
    a = a.replace('UPDATING on FBNK_', '');
    a = a.replace('DELETING on FBNK_', '');
    a = a.replace('/row/', '');
    let ans = a.split(":");
    let columnname = "";
    //if (this.tabledata[ans[0].replace("_", ".").replace('001', '')]) {
    //columnname = this.tabledata[ans[0].replace("_", ".").replace('001', '')][ans[2].toUpperCase()]
    return ans[0].replace("_", ".").replace('001', '');

  }
  getcolumnname(field) {
    if (Array.isArray(field)){
      field=field[0];
    }
    let a = field.replace('INSERTING on FBNK_', '');
    a = a.replace('UPDATING on FBNK_', '');
    a = a.replace('DELETING on FBNK_', '');
    a = a.replace('/row/', '');
    let ans = a.split(":");
    let columnname = "";
    if (this.tabledata[ans[0].replace("_", ".").replace('001', '')]) {
      columnname = this.tabledata[ans[0].replace("_", ".").replace('001', '')][ans[2].toUpperCase()]
      return columnname;
    }
    return field;
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
      .filter(key => key.includes(this.searchtext.toUpperCase()))
      .reduce((obj, key) => {
        obj[key] = this.groupedoriginal[key];
        return obj;
      }, {});

  }

  searchchange() {
     


      this.grouped = Object.keys(this.groupedoriginal)
        .filter(key => key.includes(this.searchtext.toUpperCase()))
        .reduce((obj, key) => {
          obj[key] = this.groupedoriginal[key];
          return obj;
        }, {});
    

  }
}
