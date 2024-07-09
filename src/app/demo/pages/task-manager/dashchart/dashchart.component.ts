
import { switchMap } from 'rxjs/operators';
import { interval, Subscription} from 'rxjs';
import * as _ from 'lodash'
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
declare var $: any;
import {  ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
import {formatDate} from '@angular/common';
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
  ApexStroke,ApexXAxis,ApexTitleSubtitle,ApexLegend,
  ApexGrid,ApexMarkers,ApexTooltip
} from "ng-apexcharts";
 
import { TaskControllerService } from '../../../../api/taskController.service';
import { DpListenControllerService } from '../../../../api/dpListenController.service';
import { TaskMainDTO } from '../../../../model/taskMainDTO';
import { DpListenDTO } from '../../../../model/dpListenDTO';
import { DiffTableControllerService } from '../../../../api/diffTableController.service';
import { DiffTableDTO } from '../../../../model/diffTableDTO';
import { AlertService } from '../../../../theme/shared/components';
import { ActivatedRoute, Params, Router } from '@angular/router';
export type ChartOptions10 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  fill: ApexFill;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  colors: string[];
};
export type ChartOptions9 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};
export type ChartOptions8 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  labels: string[];
  stroke: any; // ApexStroke;
  markers: ApexMarkers;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  tooltip: ApexTooltip;
};
 
export type ChartOptions5 = {
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
};
export type ChartOptions4 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  colors: string[];
};
export type ChartOptions3 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  fill: ApexFill;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
};
export type ChartOptions2 = {
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
};
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  colors: string[];
};
 
@Component({
  selector: 'app-dashchart',
  templateUrl: './dashchart.component.html',
  styleUrls: ['./dashchart.component.scss']
})
export class DashchartComponent implements OnInit {
  
  ngOnInit(): void {
    this.tabledata = require('../../../../../assets/tabledata.json');
    this.loaddata() ; 
    this.afterInit();
     
    this.mySubscription= interval(10000).subscribe((x =>{
      this.loaddifftable();
      this.afterInit();
      
            }));
    
  }
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions2>;
  public chartOptions3: Partial<ChartOptions3>;
  public chartOptions4: Partial<ChartOptions4>;
  public chartOptions5: Partial<ChartOptions5>;
  public chartOptions8: Partial<ChartOptions8>;
  public chartOptions9: Partial<ChartOptions9>;
  public chartOptions10: Partial<ChartOptions10>;
  myDate : any;
  clength: any = {};
  groupednewstructvaloriginal: any = {};
  columnname: any = "";
  groupednewstructvalObject: any = {};
  groupednewstructvaloriginalObject: any = {};
  colmaster: any = {};
  mySubscription: Subscription
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
  addcount: number=0;
  removedcount: number=0; 
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
    this.addcount=0;
    this.diffcount=0;
    this.removedcount=0;
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
          this.addcount+=1;
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
          this.removedcount+=1;
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
          this.diffcount+=1;
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
    // this.diffcount=0;
    // Object.keys(this.grouped)
    //     .reduce((obj, key) => {
    //       this.diffcount=this.diffcount+this.grouped[key].length;
    //     return obj;
    //   }, {});
    // this.tabnewstruct=_.groupBy(this.newstruct, "tname");

    // Group by age within each city group
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
 
  constructor(private taskControllerService: TaskControllerService,
    private diffTableControllerService: DiffTableControllerService,
    private dpListenControllerService: DpListenControllerService,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute

  ){
    this.myDate = formatDate(new Date(), 'EEEE, MMMM d, y, ', 'en');
  }
    // this.chartOptions = {
    //   series: [23, 5, 43],
    //   chart: {
    //     type: "donut"
    //   },
    //   labels: ["Added", "Deleted", "Modified" ],
    //   fill: {
    //     type: "gradient"
    //   },
    //   responsive: [
    //     {
    //       breakpoint: 480,
    //       options: {
    //         chart: {
    //           width: 200
    //         },
    //         legend: {
    //           position: "bottom"
    //         }
    //       }
    //     }
    //   ]
    // };

    afterInit() {
      let arr=[];
      let dtarr=[];
      let catarr=[];
      Object.keys(this.grouped)
          .reduce((obj, key) => {
            let ta=[];
            ta.push(  key )
            ta.push( this.grouped[key].length)
            
            // dtarr.push( this.grouped[key].length)
            // catarr.push(  key )
            arr.push(ta);
          return obj;
        }, {});
        arr = arr.sort((a, b) =>  b[1]-a[1] );
        for (var i=0; i<arr.length; i++) {
          if(i==10){
            break;
          }
          dtarr.push( arr[i][1]);
           catarr.push(  arr[i][0] );
        }
    this.chartOptions = {
      series: [this.addcount, this.removedcount, this.diffcount],
      chart: {
        width: 380,
        type: "donut"
      },
      colors: ['#8b89f5', '#FED0A6', '#F49102', '#5A2A27', '#C4BBAF'],
      labels: ["Added", "Deleted", "Modified" ],
      dataLabels: {
        enabled: false
      },
      fill: {
        type: "gradient"
      },
      legend: {
        formatter: function(val, opts) {
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
    this.chartOptions2 = {
      series: [
        {
          name: "Difference",
          data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31 ]
        }
      ],
       
      chart: {
        height: 350,
        type: "bar"
      },
     
      plotOptions: {
        bar: {
          
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false,
        style: {
          fontSize: "140px",
          fontFamily: "Helvetica, Arial, sans-serif",
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
        style: {
          fontSize: "140px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: "bold"
        },
        categories: [
            "FBNK_CATEG_ENT_LWOR000",
    "FBNK_CONSOLIDATE_AS000",
    "FBNK_CONSOLIDATE_PR000",
    "FBNK_AA_ARRANGEMENT006",
    "FBNK_CATEG_ENT_TODAY",
    "FBNK_CONSOL_UPDATE_000",
    "FBNK_EB_CONTRACT_BA001",
    "FBNK_PV_ASSET_DETAIL",
    "FBNK_RE_CONSOL_PROFIT",
    "FBNK_SC_PERF_DETAIL"
        ],
        tickPlacement: "on"
      },
      yaxis: {
        title: {
          text: ""
        }
      },
      fill: {
        colors : ["#F49102"],
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100]
        }
      }
    };

    this.chartOptions3 = {
      series:  [
        {
          data: [
            {
              x: "DataLoad",
              y: [
                5,
                15
              ],
              
              fillColor: "#6200EE"
            },
            {
              x: "Batch Analysis",
              y: [
                15,
                33
              ],
              fillColor: "#9C27B0"
            },
            {
              x: "Comparision",
              y: [
                33,
                88
              ],
               fillColor: "#D81B60"
            },
            {
              x: "ReportGeneration",
              y: [
                88,
                95
              ],
               fillColor: "#FF9800"
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
    let dataarr=[];

    for (var i=0; i<arr.length; i++) {
      if(i==10){
        break;
      }
      let aobj={};
      aobj['x']=arr[i][0] ;
      aobj['y']=arr[i][1];
      aobj['fillColor']="#8b89f5";
      dataarr.push(aobj);
        
    }
    this.chartOptions4 = {
      series: [
        {
          data: dataarr
        }
      ],
      fill: {
        colors : ["#8b89f5"],
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
    // this.chartOptions4 = {
    //   series: [
    //     {
    //       data: [
    //         {
    //           x: "FBNK_CATEG_ENT_LWOR000",
    //           y: 218
              
    //         },
    //         {
    //           x: "FBNK_CONSOLIDATE_AS000",
    //           y: 149
    //         },
    //         {
    //           x: "FBNK_CONSOLIDATE_PR000",
    //           y: 184
    //         },
    //         {
    //           x: "FBNK_AA_ARRANGEMENT006",
    //           y: 55
    //         },
    //         {
    //           x: "FBNK_CATEG_ENT_TODAY",
    //           y: 84
    //         },
    //         {
    //           x: "FBNK_CONSOL_UPDATE_000",
    //           y: 31
    //         },
    //         {
    //           x: "FBNK_EB_CONTRACT_BA001",
    //           y: 70
    //         },
    //         {
    //           x: "FBNK_PV_ASSET_DETAIL",
    //           y: 30
    //         },
    //         {
    //           x: "FBNK_RE_CONSOL_PROFIT",
    //           y: 44
    //         },
    //         {
    //           x: "FBNK_SC_PERF_DETAIL",
    //           y: 68
    //         } 
    //       ]
    //     }
    //   ],
    //   legend: {
    //     show: false
    //   },
    //   chart: {
    //     height: 350,
    //     type: "treemap"
    //   },
    //   title: {
    //     text: "Distibuted Treemap (different color for each cell)",
    //     align: "center"
    //   },
  
    //   plotOptions: {
    //     treemap: {
          
    //       enableShades: false
    //     }
    //   }
    // };
    // this.chartOptions5 = {
    //   series: [
    //     {
    //       name: "basic",
    //       data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31 ]
    //     }
    //   ],
    //   chart: {
    //     type: "bar",
    //     height: 350
    //   },
    //   plotOptions: {
    //     bar: {
    //       horizontal: true
          
    //     }
    //   },
      
    //   dataLabels: {
    //     enabled: false,
    //     style: {
    //       fontSize: "12px",
    //       colors: ["green"]
    //     }
    //   },
    //   xaxis: {
    //     categories: [
    //       "FBNK_CATEG_ENT_LWOR000",
    //       "FBNK_CONSOLIDATE_AS000",
    //       "FBNK_CONSOLIDATE_PR000",
    //       "FBNK_AA_ARRANGEMENT006",
    //       "FBNK_CATEG_ENT_TODAY",
    //       "FBNK_CONSOL_UPDATE_000",
    //       "FBNK_EB_CONTRACT_BA001",
    //       "FBNK_PV_ASSET_DETAIL",
    //       "FBNK_RE_CONSOL_PROFIT",
    //       "FBNK_SC_PERF_DETAIL"
    //     ]
    //   },
    //   fill: {
    //     colors: ['#7E36AF']
    //   }
    // };
    this.chartOptions5 = {
      series: [
        {
          data: [
            {
              x: "jjj",
              y: 218,
              fillColor: "#8b89f5"              
            },
            {
              x: "FBNK_CONSOLIDATE_AS000",
              y: 149,
              fillColor: "#8b89f5"              
            },
            {
              x: "FBNK_CONSOLIDATE_PR000",
              y: 184,
              fillColor: "#8b89f5"              
            },
            {
              x: "FBNK_AA_ARRANGEMENT006",
              y: 55,
              fillColor: "#8b89f5"              
            },
            {
              x: "FBNK_CATEG_ENT_TODAY",
              y: 84,
              fillColor: "#8b89f5"              
            },
            {
              x: "FBNK_CONSOL_UPDATE_000",
              y: 31,
              fillColor: "#8b89f5"              
            },
            {
              x: "FBNK_EB_CONTRACT_BA001",
              y: 70,
              fillColor: "#8b89f5"              
            },
            {
              x: "FBNK_PV_ASSET_DETAIL",
              y: 30,
              fillColor: "#8b89f5"              
            },
            {
              x: "FBNK_RE_CONSOL_PROFIT",
              y: 44,
              fillColor: "#8b89f5"              
            },
            {
              x: "FBNK_SC_PERF_DETAIL",
              y: 68,
              fillColor: "#8b89f5"              
            } 
          ]
        }
      ],
      
      chart: {
        height: 350,
        type: "bar"
      },
    
       
      plotOptions: {
        bar: {
          horizontal: true
        }
      }
    };


    this.chartOptions8 = {
      series: [
        {
          name: "Added",
          type: "column",
          data: [13, 11, 12, 17, 13, 12, 27, 21, 24, 12, 10]
        },
        {
          name: "Modified",
          type: "area",
          data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
        },
        {
          name: "Modified",
          type: "line1",
          data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        stacked: false
      },
      stroke: {
        width: [0, 2, 5],
        curve: "smooth"
      },
      plotOptions: {
        bar: {
          columnWidth: "50%"
        }
      },

      fill: {
        colors : ["#8b89f5"],
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
      labels: [
        "FBNK_CATEG_ENT_LWOR000",
          "FBNK_CONSOLIDATE_AS000",
          "FBNK_CONSOLIDATE_PR000",
          "FBNK_AA_ARRANGEMENT006",
          "FBNK_CATEG_ENT_TODAY",
          "FBNK_CONSOL_UPDATE_000",
          "FBNK_EB_CONTRACT_BA001",
          "FBNK_PV_ASSET_DETAIL",
          "FBNK_RE_CONSOL_PROFIT",
          "FBNK_SC_PERF_DETAIL"
      ],
      markers: {
        size: 0
      },
      xaxis: {
        type: "category"
      },
      yaxis: {
        title: {
          text: "Points"
        },
        min: 0
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function(y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " points";
            }
            return y;
          }
        }
      }
    };
  
    this.chartOptions5= {
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
        colors : ["#8b89f5"],
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
      series: [75],
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
              formatter: function(val) {
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
        colors : ["#F49102"],
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
      chart: {
        height: 330,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      series: [
        {
          name: "Series 1",
          data: [15, 32, 35, 45, 35, 43, 42]
        },
        
        {
          name: "Series 2",
          data: [45, 52, 45, 55, 25, 33, 22]
        }
        
      ],
      fill: {
        colors : ["#F49102"],
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
      colors: ['#8b89f5', '#FED0A6', '#F49102', '#5A2A27', '#C4BBAF'],
      xaxis: {
        categories: [
          "01 Jan",
          "02 Jan",
          "03 Jan",
          "04 Jan",
          "05 Jan",
          "06 Jan",
          "07 Jan"
        ]
      }
    };

    this.chartOptions10 ={
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
        categories:  catarr,
       
      }
    };
      }
}
