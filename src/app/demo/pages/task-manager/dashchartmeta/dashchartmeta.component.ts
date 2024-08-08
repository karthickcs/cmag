
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
  selector: 'app-dashchartmeta',
  templateUrl: './dashchartmeta.component.html',
  styleUrls: ['./dashchartmeta.component.scss'],

})
export class DashchartmetaComponent implements OnInit {
getlength(arg0: any[]) {
if(arg0){
  return arg0.length;
}
return 0;
}
getrunid(arg0: number) {
    if(arg0>-1){
      return arg0;

    }
    else{
      return "MetaData";
    }
}

  gridOptions: any;
  user: any;
  changeDTOTstruct: any = {};
  removeDTOTstruct: any = {};
  addDTOArrayTsruct = [];
  removeDTOArrayTsruct = [];
  addDTOTstruct: any = {};
  changeDTOArrayTstruct = [];
  processedTstruct: any = 0;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptionsNonAxis>;
 
  public chartOptions3: Partial<ChartOptionsaxis>;
 
  public chartOptions5: Partial<ChartOptionsaxis>;
   
  public chartOptions9: Partial<ChartOptionsNonAxis>;
  public chartOptions10: Partial<ChartOptionsaxis>;
  myDate: any;
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
          this.runidselect = '-1';
          this.loaddata(true);
          this.cdr.detectChanges();
         

          //  

        }
        else {
          this.loaddata(false);
        }

      }
    );

    this.afterInit();

    this.mySubscription = interval(10000).subscribe((x => {
      this.loadrunid();
     
      this.loadruniddata(false); 
      this.afterInit();

    }));

  }
  loadrunid() {
    // alert(this.runidselect);
   
    this.dplistenentry ={}
    this.dplistenentry = this.dplistenArray.find(dplisten => dplisten['runid'] == -1);
    // alert(JSON.stringify(this.dplistenentry));

    this.loadtablestruct();
  }
  
 
  goBackmeta(optionval: any) {
    this.router.navigate(['/metaData', {
      taskid: this.taskid,
      optionval: optionval,
      runid: this.runidselect
    }]);
  }
  
 
  loadruniddata(onload: boolean) {

    this.taskMainDTO = this.taskmainArray.filter(x => x['taskid'] == this.taskid)[0];
    // alert(this.taskid);
    this.dplistenArray = [];
    this.dpListenControllerService.getRunIdforMetaUsingGET(this.taskid).subscribe(
      (response: any) => {

        // // alert(response);
        this.dplistenArray = response;
       
          this.runidselect =  '-1';
       
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
    var addlen=0;
    var removelen=0;
    var changelen=0;

    if(this.addDTOArrayTsruct){
      addlen=this.addDTOArrayTsruct.length;
    }
     if(this.changeDTOArrayTstruct){
      changelen=this.changeDTOArrayTstruct.length;
    }
    if(this.removeDTOArrayTsruct){
      removelen=this.removeDTOArrayTsruct.length;
    } 

    this.chartOptions = {
      series: [addlen,removelen,changelen],
      chart: {
        width: 380,
        type: "donut"
      },
      colors: ['#8b89f5', '#FED0A6', '#F49102', '#5A2A27', '#C4BBAF'],
      labels: ["Tables Added", "Tables Removed", "Tables Modified"],
      dataLabels: {
        enabled: false
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
      ann = this.getPercentTstruct() 
      if (isNaN(ann)) {
        ann = 0;
      }
      if (this.dplistenentry.status == 'DONE') {
        ann = 100
      }
    } catch (error) {
      ann = 0;
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
              x: "comparison",
              y: [
                dataloadtime,
                dataloadtime +  comparetime
              ],
              fillColor: "#F49102"
            },
            {
              x: "ReportGeneration",
              y: [
                dataloadtime  + comparetime,
                dataloadtime  + comparetime + reportgentime
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
      
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "category",
         
        categories: catarr,
        tickPlacement: "on"
      } ,dataLabels: {
        formatter: function (val:number) {
          return val.toFixed(0);
        }
      },
    };
  }
  loadtablestruct() {

    this.tableStructControllerService.gettablestructsUsingGET(this.taskid, "1").subscribe(
      (response: any) => {


        this.tabnewstruct = response;
        this.loadtablestructprocess();


      },
      (error) => {
        console.log(error);
      }
    );
    this.tableStructControllerService.countLinesUsingGET(this.taskid, "1").subscribe(
      (response: any) => {


        this.processedTstruct = parseInt(response.countlines);



      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadtablestructprocess() {

    this.changeDTOArrayTstruct = [];
    this.addDTOArrayTsruct = [];
    this.removeDTOArrayTsruct = [];

    for (var diff_entry of this.tabnewstruct) {

      let a = "";
      a = diff_entry.difference;
      a = a.split('(').join('[')
      a = a.split(')').join(']')

      try {
        this.jsondiff = JSON.parse(a);
      } catch (error) {

      }
      diff_entry.difference = a;
      if (JSON.stringify(a).lastIndexOf("TargetSystem") > -1) {
        this.removeDTOTstruct = {};
        this.removeDTOTstruct['tname'] = diff_entry.tname;
        this.removeDTOTstruct['cname'] = "Table";
        this.removeDTOTstruct['oldval'] = "Present";
        this.removeDTOTstruct['newval'] = "Removed";

        this.removeDTOArrayTsruct.push(this.removeDTOTstruct);

        continue;
      }
      if (JSON.stringify(a).lastIndexOf("SrcSystem") > -1) {
        this.addDTOTstruct = {};
        this.addDTOTstruct['tname'] = diff_entry.tname;
        this.addDTOTstruct['cname'] = "Table";
        this.addDTOTstruct['oldval'] = "Missing";
        this.addDTOTstruct['newval'] = "Added";

        this.addDTOArrayTsruct.push(this.addDTOTstruct);

        continue;
      }
      for (var val of this.jsondiff) {

        if (val[0] == 'add') {

          for (var v1 of val[2]) {
            this.changeDTOTstruct = {};
            this.changeDTOTstruct['tname'] = diff_entry.tname;
            this.changeDTOTstruct['cname'] = this.getcolumnnametstruct(v1[0], diff_entry.tname);
            this.changeDTOTstruct['oldval'] = "Missing Tags";
            this.changeDTOTstruct['newval'] = v1[1];

            this.changeDTOArrayTstruct.push(this.changeDTOTstruct);
          }
        }
        if (val[0] == 'remove') {
          for (var v1 of val[2]) {
            this.changeDTOTstruct = {};
            this.changeDTOTstruct['tname'] = diff_entry.tname;
            this.changeDTOTstruct['cname'] = this.getcolumnnametstruct(v1[0], diff_entry.tname);
            this.changeDTOTstruct['newval'] = "Missing Tags";
            this.changeDTOTstruct['oldval'] = v1[1];

            this.changeDTOArrayTstruct.push(this.changeDTOTstruct);
          }
        }
        if (val[0] == 'change') {
          this.changeDTOTstruct = {};

          this.changeDTOTstruct['tname'] = diff_entry.tname;
          this.changeDTOTstruct['cname'] = this.getcolumnnametstruct(val[1], diff_entry.tname);
          this.changeDTOTstruct['oldval'] = val[2][0];
          this.changeDTOTstruct['newval'] = val[2][1];
          this.changeDTOArrayTstruct.push(this.changeDTOTstruct);
        }
      }
    }
    this.grouped = _.groupBy(this.changeDTOArrayTstruct, "tname");
    this.afterInit();
  }
  getcolumnnametstruct(field, tnameval: string) {
    if (Array.isArray(field)) {
      field = field[0];
    }
    let cname = field;


    return cname;
  }
  getPercentTstruct() {
    if (this.processedTstruct > 8000)
      return 100;
    else {
      return Math.round((this.processedTstruct / 8000) * 100)
    }

  }
}
