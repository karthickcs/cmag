
import { switchMap } from 'rxjs/operators';
import { interval, Subscription } from 'rxjs';
import * as _ from 'lodash'
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
declare var $: any;
import { ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
import { formatDate } from '@angular/common';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import {
  ApexAxisChartSeries,

  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexAnnotations,
  ApexFill,
  ApexStroke, ApexXAxis, ApexTitleSubtitle, ApexLegend,
  ApexGrid, ApexMarkers, ApexTooltip
} from "ng-apexcharts";
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community';
import { TaskControllerService } from '../../../../api/taskController.service';
import { DpListenControllerService } from '../../../../api/dpListenController.service';
import { TaskMainDTO } from '../../../../model/taskMainDTO';
import { DpListenDTO } from '../../../../model/dpListenDTO';
import { DiffTableControllerService } from '../../../../api/diffTableController.service';
import { DiffTableDTO } from '../../../../model/diffTableDTO';
import { AlertService } from '../../../../theme/shared/components';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../../../auth/auth.service';
import { TableStructControllerService } from '../../../../api/tableStructController.service';

export type ChartOptionsaxis = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: any; //ApexXAxis;
  annotations: ApexAnnotations;
  fill: ApexFill;
  stroke: ApexStroke;
  grid: ApexGrid;
  title: ApexTitleSubtitle;
  labels: any;
  legend: ApexLegend;
  colors: string[];
  tooltip: ApexTooltip;

};
export type ChartOptionsNonAxis = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  colors: string[];
  tooltip: ApexTooltip;
  plotOptions: ApexPlotOptions;
  stroke: ApexStroke;
};


@Component({
  selector: 'app-dashchart',
  templateUrl: './dashchart.component.html',
  styleUrls: ['./dashchart.component.scss'],

})
export class DashchartComponent implements OnInit {
 

  gridOptions: any;
  user: any;
 

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptionsNonAxis>;
 
  public chartOptions3: Partial<ChartOptionsaxis>;
  public chartOptions4: Partial<ChartOptionsaxis>;
  public chartOptions5: Partial<ChartOptionsaxis>;
   
  public chartOptions9: Partial<ChartOptionsNonAxis>;
  public chartOptions10: Partial<ChartOptionsaxis>;
  myDate: any;
  clength: any = {};
 
  columnname: any = "";
  
  colmaster: any = {};
  mySubscription: Subscription
  tname: any = "";
  tabnewstruct: any = {};
  groupednewstructval: any = {};
  colnames: any = [];
  colnamesdum: any = [];
  ColumnDefs;
  RowData: any;
  AgLoad: boolean;



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
  dplistenentry: any = {};
  taskmainArray = [];
  taskid: any = 0;
  dplistenArray: DpListenDTO[] = [];
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
  tablemap: String[][];
  tablecount: number = 0;
  diffcount: number = 0;
  addcount: number = 0;
  removedcount: number = 0;

  constructor(private taskControllerService: TaskControllerService,
    private diffTableControllerService: DiffTableControllerService,
    private dpListenControllerService: DpListenControllerService,
    private tableStructControllerService: TableStructControllerService,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute, private authservice: AuthService

  ) {
    this.myDate = formatDate(new Date(), 'EEEE, MMMM d, y, ', 'en');
  }

  ngOnInit(): void {
    this.user = this.authservice.currentUser();
    this.user = this.user[0].toUpperCase() + this.user.slice(1);
    this.tabledata = require('../../../../../assets/tabledata.json');


    this.route.params.subscribe(
      (params: Params) => {
        if (params['taskid']) {
          this.taskid = params['taskid'];
          this.runidselect = params['runid'];
          this.loaddata(true);
          this.cdr.detectChanges();
          this.loaddifftable();

          //  

        }
        else {
          this.loaddata(false);
        }

      }
    );

    this.afterInit();

    this.mySubscription = interval(30000).subscribe((x => {
      
      this.loadrunid();
      this.loaddifftable();
      this.loadruniddata(false); 
       
      this.afterInit();

    }));

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
   // this.diffTableDTOArray = [];
    this.diffcount = 0;
    this.addcount = 0;
    this.removedcount = 0;
    this.grouped = {};
   
    this.addDTOArray = [];
    this.removeDTOArray = [];
    this.changeDTOArray = [];
 
    this.cdr.detectChanges();
    this.changeDTOArray = [];
    this.addcount = 0;
    this.diffcount = 0;
    this.removedcount = 0;
   
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

  goBack() {
    this.router.navigate(['/windows', {
      taskid: this.taskid,
      runid: this.runidselect,
      tranid: ""
    }]);
  }
  goBackmeta(optionval: any) {
    this.router.navigate(['/metaData', {
      taskid: this.taskid,
      optionval: optionval,
      runid: this.runidselect
    }]);
  }
  loadDifferenceTableHorizontal() {
    this.addDTOArray = [];
    this.removeDTOArray = [];
    this.changeDTOArray = [];
    this.cdr.detectChanges();
    this.changeDTOArray = [];
    this.addcount = 0;
    this.diffcount = 0;
    this.removedcount = 0;
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
          this.addcount += 1;
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
          this.removedcount += 1;
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
          this.diffcount += 1;
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
    

    // Group by city
    this.grouped = _.groupBy(this.changeDTOArray, "tname");

    this.tablecount = Object.keys(this.grouped).length;
    
    if (this.tranidreturn == "") {
      this.tname = Object.keys(this.grouped)[0]
    }
    else {
      this.tname = this.gettname(this.tranidreturn.split("|")[0])
    }


    this.groupedoriginal = this.grouped;
    this.groupedval = this.grouped[Object.keys(this.grouped)[0]]
    this.afterInit();

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
    // if (ans[2].split("[")[1]) {
    //   apendind = "[" + ans[2].split("[")[1];
    //   apendind = processappend(apendind);
    // }
    cname = cname.substring(cname.lastIndexOf("/") + 1)
    if (this.tabledata[tname]) {
      columnname = this.tabledata[tname][cname.toUpperCase()]
      return columnname + apendind;
    }
    return cname + apendind;
  }
  loadruniddata(onload: boolean) {
    this.diffcount = 0;
    this.addcount = 0;
    this.removedcount = 0;
    this.grouped = {};
    this.afterInit();
    this.addDTOArray = [];
    this.removeDTOArray = [];
    this.changeDTOArray = [];
    
    this.changeDTOArray = [];
    this.cdr.detectChanges();
    this.taskMainDTO = this.taskmainArray.filter(x => x['taskid'] == this.taskid)[0];
    // alert(this.taskid);
    this.dplistenArray = [];
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
  loaddata(onload: any) {
    this.taskmainArray = [];
    this.taskControllerService.getTasknainUsingGET().subscribe(
      (response: any) => {

        // // alert(response);
        this.taskmainArray = response;
        if (!onload) {
          if (this.taskmainArray[0]) {
            this.taskid = this.taskmainArray[0].taskid;
            this.taskMainDTO = this.taskmainArray[0]
          }
        }
        this.loadruniddata(onload);

      },
      (error) => {
        console.log(error);
      }
    );
  }

  

  afterInit() {

    this.chartOptions = {
      series: [this.addDTOArray.length, this.removeDTOArray.length, this.changeDTOArray.length],
      chart: {
        width: 380,
        type: "donut"
      },
      colors: ['#8b89f5', '#FED0A6', '#F49102', '#5A2A27', '#C4BBAF'],
      labels: ["Tables Added", "Tables Deleted", "Table Modified"],
      dataLabels: {
        formatter: function (val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex];
        }
      },
      fill: {
        type: "gradient"
      },
      legend: {
        formatter: function (val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex];
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    let ann = 0;
    let arr = [];
    let dtarr = [];
    let catarr = [];
    let dataarr = [];

    
      Object.keys(this.grouped)
      .reduce((obj, key) => {
        let ta = [];
        ta.push(key)
        ta.push(this.grouped[key].length)

        // dtarr.push( this.grouped[key].length)
        // catarr.push(  key )
        arr.push(ta);
        return obj;
      }, {});
    arr = arr.sort((a, b) => b[1] - a[1]);
    for (var i = 0; i < arr.length; i++) {
      if (i == 10) {
        break;
      }
      dtarr.push(arr[i][1]);
      catarr.push(arr[i][0]);
      
    }
   
    for (var i = 0; i < arr.length; i++) {
      if (i == 10) {
        break;
      }
      let aobj = {};
      aobj['x'] = arr[i][0];
      aobj['y'] = arr[i][1];
      aobj['fillColor'] = "#8b89f5";
      dataarr.push(aobj);

    }

    try {
      ann = (this.dplistenentry.rowsprocessed * 100) / this.dplistenentry.rowcount;
      if (ann > 100) {
        ann = 100;
      }
      if (isNaN(ann)) {
        ann = 0;
      }
      if (this.dplistenentry.status == 'DONE') {
        ann = 100
      }
    } catch (error) {
      ann = 1;
    }
    
   
    var dataloadtime=0;
    var batchtime=0;
    var comparetime =0;
    var reportgentime=0;

    if(this.dplistenentry){
      
      batchtime=this.dplistenentry.batchtime;
      comparetime =this.dplistenentry.comparetime;
      reportgentime=this.dplistenentry.reportgentime;
      dataloadtime=this.dplistenentry.dataloadtime;
    }

    
    this.chartOptions3 = {
      series: [
        {
          data: [
            {
              x: "DataLoad",
              y: [
                0,
                dataloadtime
              ],

              fillColor: "#4C5EF6"
            },
            {
              x: "Batch Analysis",
              y: [
                dataloadtime ,
                dataloadtime + batchtime  
              ],
              fillColor: "#F49102"
            },
            {
              x: "comparison",
              y: [
                dataloadtime + batchtime,
                dataloadtime + batchtime + comparetime
              ],
              fillColor: "#F49102"
            },
            {
              x: "ReportGeneration",
              y: [
                dataloadtime + batchtime + comparetime,
                dataloadtime + batchtime + comparetime + reportgentime
              ],
              fillColor: "#4C5EF6"
            }
          ]
        }
      ],
      chart: {
        height: 350,
        type: "rangeBar"
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '20%'
        }
      },
      xaxis: {
        type: "category"
      }
    };
    this.chartOptions4 = {
      series: [
        {
          data: dataarr
        }
      ],
      fill: {
        colors: ["#8b89f5"],
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: "dark",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      chart: {
        height: 350,
        type: "treemap"
      },
      title: {
        text: ""
      }
    };

     
    this.chartOptions5 = {
      series: [
        {
          name: "Difference",
          data: dtarr
        }
      ],

      chart: {
        height: 350,
        type: "bar"
      },

      plotOptions: {
        bar: {
          horizontal: true,
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false,
        style: {
          fontSize: "140px",
          fontFamily: "Inter",
          fontWeight: "bold"
        }
      },
      stroke: {
        width: 2
      },

      grid: {
        row: {
          colors: ["#fff", "#f2f2f2"]
        }
      },
      xaxis: {
        labels: {
          rotate: -45
        },
        categories: catarr,
        tickPlacement: "on"
      },
      yaxis: {
        title: {
          text: ""
        }
      },
      fill: {
        colors: ["#8b89f5"],
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: ["#8b89f5"],
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100]
        }
      }
    };
   
   

    this.chartOptions9 = {

      series: [ann],
      chart: {
        height: 350,
        type: "radialBar",
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px"
            },
            value: {
              formatter: function (val) {
                return parseInt(val.toString(), 10).toString();
              },
              color: "#111",
              fontSize: "36px",
              show: true
            }
          }
        }
      },
      fill: {
        colors: ["#F49102"],
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#F49102"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["Percent"]
    };
    

    this.chartOptions10 = {
      series: [
        {
          name: "Difference",
          data: dtarr
        }
      ],
      colors: ['#4C5EF6', '#F49102', '#F49102', '#5A2A27', '#C4BBAF'],
      chart: {
        height: 400,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "category",
        categories: catarr,

      }
    };
  }
  }
