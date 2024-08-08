import { Component, OnInit } from '@angular/core';
import { TaskControllerService } from '../../../../api/taskController.service';
import { DpListenControllerService } from '../../../../api/dpListenController.service';
import { TaskMainDTO } from '../../../../model/taskMainDTO';
import { DpListenDTO } from '../../../../model/dpListenDTO';
import { DiffTableControllerService } from '../../../../api/diffTableController.service';
import { DiffTableDTO } from '../../../../model/diffTableDTO';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TableStructControllerService } from '../../../../api/tableStructController.service';
import { TableStructDTO } from '../../../../model/tableStructDTO';
 


interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
      },
      {
        name: 'Orange',
        children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
      },
    ],
  },
];
@Component({
  selector: 'app-managetask',
  templateUrl: './managetask.component.html',
  styleUrls: ['./managetask.component.scss']
})
export class ManagetaskComponent implements OnInit {


  
  goBack( runid, taskid) {
    this.router.navigate(['/metadash', {
      taskid: taskid,
      runid: runid,
       
    }]);
  }


  tabledata: any={};
   diffTableDTO: DiffTableDTO = {};

  tablestrucct:TableStructDTO  [];
  taskMainDTO: TaskMainDTO = {};
 
  taskmainArray = [];
  taskid: any = 0;
  dplistenArray = [];
  runid: any = 0;
  runidselect: any = 0;
oldjson: any={};
newjson: any={};
  jsondiff: any={};
  changeDTO:any= {};
 
searchtext: any;
columnname: any;
  changeDTOArrayOriginal: any=[];
  changeDTOArray: any=[];

  addDTOArrayOriginal: any=[];
  addDTOArray: any=[];
  addDTO:any= {};

  removeDTOArrayOriginal: any=[];
  removeDTOArray: any=[];
  removeDTO:any= {};
  difftype: string="";
  optionval: any="";
 

  

  

 
 
  constructor(private taskControllerService: TaskControllerService,
    private tableStructControllerService: TableStructControllerService,
    private dpListenControllerService: DpListenControllerService,
    private router: Router,
    private route: ActivatedRoute
  ) { 

     
  }


  ngOnInit() {
    this.columnname="tname";
    

    this.route.params.subscribe(
      (params: Params) => {
        if (params['taskid']) {
          this.taskid = params['taskid'];
          this.optionval = params['optionval'];
          this.runidselect = params['runid'];
           
          this.loaddata( )
          this.loadruniddata()
         
         
          //  

        }
        else{
          this.loaddata( );
          this. loadruniddata()
        }

      }
    );
  }
  myClickFunction(maintranid) {
    this.router.navigate(['/transactionview', { taskid: this.taskid ,
      runid: this.runidselect ,
      tranid: maintranid 
    }]);
  }
  loaddata() {
    this.taskControllerService.getTasknainUsingGET().subscribe(
      (response: any) => {

        // alert(response);
        this.taskmainArray = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadruniddata() {
    this.taskMainDTO = this.taskmainArray.filter(x => x['taskid'] == this.taskid)[0];
    
    this.dpListenControllerService.getRunIdsUsingGET(this.taskid).subscribe(
      (response: any) => {

        // // alert(response);
        this.dplistenArray = response;
         
        
          this.loadrunid();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  loadrunid() {
   
    this.loaddifftable();
  }
  loaddifftable() {
     
    this.tableStructControllerService.gettablestructsUsingGET( this.taskid ,"1").subscribe(
      (response: any) => {

        // // alert(response);
        this.tablestrucct = response;
        this.loadtramdata();
        
         
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadtramdata() {
     
    this.changeDTOArray=[];
    this.addDTOArray=[];
    this.removeDTOArray=[];
    //this.cdr.detectChanges();
    //this.diffTableDTO = this.diffTableDTOArray.find(diffdata => diffdata['maintranid'] == this.tranid);
    
    for (var diff_entry of this.tablestrucct) {
    
    let a = "";
    a = diff_entry.difference;
    a = a.split('(').join('[')
    a = a.split(')').join(']')

    try {
      this.jsondiff = JSON.parse(a);
    } catch (error) {

    }
    diff_entry.difference = a;
    if( JSON.stringify(a).lastIndexOf("TargetSystem") > -1){
      this.removeDTO ={};
      this.removeDTO['tname']=diff_entry.tname;
      this.removeDTO['cname']="Table"; 
      this.removeDTO['oldval'] =   "Present";
      this.removeDTO['newval'] =  "Removed";
      
      this.removeDTOArray.push(this.removeDTO);

      continue;
    }
    if( JSON.stringify(a).lastIndexOf("SrcSystem") > -1){
      this.addDTO ={};
      this.addDTO['tname']=diff_entry.tname;
      this.addDTO['cname']="Table"; 
      this.addDTO['oldval'] =   "Missing";
      this.addDTO['newval'] =   "Added";
      
      this.addDTOArray.push(this.addDTO);

      continue;
    }
    for (var val of this.jsondiff) {
      
      if (val[0] == 'add') {

        for (var v1 of val[2]) {
        this.changeDTO ={};
        this.changeDTO['tname']=diff_entry.tname;
        this.changeDTO['cname']=this.getcolumnname(v1[0],diff_entry.tname); 
        this.changeDTO['oldval'] = "Missing Tags";
        this.changeDTO['newval'] = v1[1];
        
        this.changeDTOArray.push(this.changeDTO);
        }
      }
      if (val[0] == 'remove') {
        for (var v1 of val[2]) {
        this.changeDTO ={};
        this.changeDTO['tname']=diff_entry.tname;
        this.changeDTO['cname']=this.getcolumnname(v1[0],diff_entry.tname); 
        this.changeDTO['newval'] = "Missing Tags";
        this.changeDTO['oldval'] = v1[1];
        
        this.changeDTOArray.push(this.changeDTO);
      }
      }
      if (val[0] == 'change') {
        this.changeDTO ={};
        
        this.changeDTO['tname']=diff_entry.tname;
        this.changeDTO['cname']=this.getcolumnname(val[1],diff_entry.tname); 
        this.changeDTO['oldval']=val[2][0];
        this.changeDTO['newval']=val[2][1];
        this.changeDTOArray.push(this.changeDTO);
      }
    }
  }
  this.changeDTOArrayOriginal= this.changeDTOArray;
  this.addDTOArrayOriginal= this.addDTOArray;
  this.removeDTOArrayOriginal = this.removeDTOArray;
  if(this.optionval=="add"){
    
    this.searchonlyindest()
  }
  else if(this.optionval=="remove") {
    this.searchonlyinsrc()
  }
   
  }
  getcolumnname(field, tnameval: string ) {
    if (Array.isArray(field)) {
      field = field[0];
    }
     let cname=field;
    
     
    return cname ;
  }
  convertmin(arg0) {
    if (arg0) {

      if(arg0.length<18){
        return   arg0.padEnd(20," ");;
      }
      else{
      return arg0.substring(0, 20);
      }

    }
    return "";
  }
  convertminss(arg0) {
    if (arg0) {

      if(arg0.length<18){
        return   arg0.padEnd(20," ");;
      }
      else{
      return arg0.substring(0, 20);
      }

    }
    return "";
  }

  search() {
    let cname = this.columnname
    if(this.difftype=="dest"){
      this.changeDTOArray = this.addDTOArrayOriginal
      .filter((diffobj) => {
       return diffobj[cname].toUpperCase().includes(this.searchtext.toUpperCase());  ;
   });
    }
    else if(this.difftype=="src"){
      this.changeDTOArray = this.removeDTOArrayOriginal
      .filter((diffobj) => {
       return diffobj[cname].toUpperCase().includes(this.searchtext.toUpperCase());  ;
   });
    }
    else {
      this.changeDTOArray = this.changeDTOArrayOriginal
     .filter((diffobj) => {
      return diffobj[cname].toUpperCase().includes(this.searchtext.toUpperCase());  ;
  });
    }
    //const arr1 = Object.keys(this.groupedoriginal).filter(d =>console.log('arr1', d));
    
    
  }

  searchonlyindest() {
    this.difftype="dest";
    let cname = this.columnname
    //const arr1 = Object.keys(this.groupedoriginal).filter(d =>console.log('arr1', d));
    this.changeDTOArray = this.addDTOArrayOriginal;
    }
    searchonlyinsrc() {
      this.difftype="src";
      let cname = this.columnname
    //const arr1 = Object.keys(this.groupedoriginal).filter(d =>console.log('arr1', d));
    this.changeDTOArray = this.removeDTOArrayOriginal;
    }
    searchdiff(){
      this.difftype="difference";
      this.changeDTOArray = this.changeDTOArrayOriginal;
    }

}
