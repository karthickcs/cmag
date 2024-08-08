import { Component, OnInit } from '@angular/core';
import { TaskControllerService } from '../../../api/taskController.service';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { TaskMainDTO } from '../../../model/taskMainDTO';
import { FileControllerService } from '../../../api/fileController.service';
import { ViewChild } from '@angular/core';
import { DpListenDTO } from '../../../model/dpListenDTO';
import { DpListenControllerService } from '../../../api/dpListenController.service';
import { AlertService } from '../../../theme/shared/components/alert/alert.module';
import { Dbtest } from '../../../model/dbtest';
import { DbControllerService } from '../../../api/dbController.service';
@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit {

generatemeta: any=[];
clear2() {
  this.taskMainDTO.starttsOnlinesys2="";
  this.taskMainDTO.endtsOnlinesys2="";
}
clear1() {
  this.taskMainDTO.starttsOnlinesys1="";
  this.taskMainDTO.endtsOnlinesys1="";
}
copy2() {
  this.taskMainDTO.starttsOnlinesys2=this.taskMainDTO.starttssys2;
  this.taskMainDTO.endtsOnlinesys2=this.taskMainDTO.endtssys2;
}
copy1() {
this.taskMainDTO.starttsOnlinesys1=this.taskMainDTO.starttssys1;
this.taskMainDTO.endtsOnlinesys1=this.taskMainDTO.endtssys1;
}

  test1: any;
  test2: any;
createtrig1: any;
droptrigger1: any;

  changeSrcType() {
    throw new Error('Method not implemented.');
  }

  @ViewChild('myModalClose') modalClose;
  oncreate() {
    this.taskMainDTO = {};
    this.taskMainDTO.createdby = 2;
    this.taskMainDTO.tablenamesys1 = "LOG_TABLE";
    this.taskMainDTO.tablenamesys2 = "LOG_TABLE";
    this.taskMainDTO.dbtypesys1 = "oracle";
    this.taskMainDTO.dbtypesys2 = "oracle";
    this.taskMainDTO.sys1type = "DB";
    this.taskMainDTO.sys2type = "DB";
    //alert(JSON.stringify(this.taskMainDTO));

  }

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  taskMainDTO: TaskMainDTO = {};
  dplistenentry: DpListenDTO = {};
  taskmainArray = [];
  dbtest: Dbtest={}
  constructor(private taskControllerService: TaskControllerService,
    private dpListenControllerService: DpListenControllerService,
    private fileControllerService: FileControllerService,
    private dbtestService: DbControllerService,
    private alertService: AlertService,
    private auth: AuthService,
    private router: Router) { }


  ngOnInit() {

    this.loaddata();
  }
  loaddata() {
    this.taskControllerService.getTasknainUsingGET().subscribe(
      (response: any) => {
        //this.alertService.success('Success load!!', this.options);
        // alert(response);
        this.taskmainArray = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  ondelete(arg0: any, i: any) {
    this.taskControllerService.deletetaskmainUsingDELETE(arg0).subscribe(
      (response: any) => {
        this.alertService.success('Delete success', this.options);
        //alert("Delete success");
        this.loaddata();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onedit(id: any) {
    this.taskMainDTO = this.taskmainArray.find(taskmain => taskmain['taskid'] == id);

  }
  onrun(id: any) {
    //alert("run" + id);
    this.taskMainDTO = this.taskmainArray.find(taskmain => taskmain['taskid'] == id);

    this.dplistenentry.filelocation = this.taskMainDTO.filelocation
    this.dplistenentry.filelocationt2 = this.taskMainDTO.filelocation2
    this.dplistenentry.rowcount = this.taskMainDTO.rowcount
    this.dplistenentry.status = 'CREATED'
    this.dplistenentry.taskid = this.taskMainDTO.taskid
    this.dplistenentry.taskname = this.taskMainDTO.taskname

    this.dplistenentry.jdbcurlsys1 = this.taskMainDTO.jdbcurlsys1
    this.dplistenentry.usernamesys1 = this.taskMainDTO.usernamesys1
    this.dplistenentry.passwordsys1 = this.taskMainDTO.passwordsys1
    this.dplistenentry.dbtypesys1 = this.taskMainDTO.dbtypesys1
    this.dplistenentry.tablenamesys1 = this.taskMainDTO.tablenamesys1
    this.dplistenentry.starttssys1 = this.taskMainDTO.starttssys1
    this.dplistenentry.endtssys1 = this.taskMainDTO.endtssys1
    this.dplistenentry.sys1type = this.taskMainDTO.sys1type

    this.dplistenentry.jdbcurlsys2 = this.taskMainDTO.jdbcurlsys2
    this.dplistenentry.usernamesys2 = this.taskMainDTO.usernamesys2
    this.dplistenentry.passwordsys2 = this.taskMainDTO.passwordsys2
    this.dplistenentry.dbtypesys2 = this.taskMainDTO.dbtypesys2
    this.dplistenentry.tablenamesys2 = this.taskMainDTO.tablenamesys2
    this.dplistenentry.starttssys2 = this.taskMainDTO.starttssys2
    this.dplistenentry.endtssys2 = this.taskMainDTO.endtssys2
    this.dplistenentry.sys2type = this.taskMainDTO.sys2type


    this.dplistenentry.tablenameClobsys1 = this.taskMainDTO.tablenameClobsys1
    this.dplistenentry.starttsClobsys1 = this.taskMainDTO.starttsClobsys1
    this.dplistenentry.endtsClobsys1 = this.taskMainDTO.endtsClobsys1
    this.dplistenentry.tablenameOnlinesys1 = this.taskMainDTO.tablenameOnlinesys1
    this.dplistenentry.starttsOnlinesys1 = this.taskMainDTO.starttsOnlinesys1
    this.dplistenentry.endtsOnlinesys1 = this.taskMainDTO.endtsOnlinesys1
    this.dplistenentry.tablenameClobsys2 = this.taskMainDTO.tablenameClobsys2
    this.dplistenentry.starttsClobsys2 = this.taskMainDTO.starttsClobsys2
    this.dplistenentry.endtsClobsys2 = this.taskMainDTO.endtsClobsys2
    this.dplistenentry.tablenameOnlinesys2 = this.taskMainDTO.tablenameOnlinesys2
    this.dplistenentry.starttsOnlinesys2 = this.taskMainDTO.starttsOnlinesys2
    this.dplistenentry.endtsOnlinesys2 = this.taskMainDTO.endtsOnlinesys2
    this.dplistenentry.generateMetadata ="false"
    this.dplistenentry.batchtime =0
    this.dplistenentry.rowsprocessed =0
    this.dplistenentry.reportgentime =0
    this.dplistenentry.comparetime =0
    this.dplistenentry.dataloadtime =0

    this.dpListenControllerService.savedplistenUsingPOST(this.dplistenentry).subscribe(
      (response: any) => {
        this.alertService.success('Run created succesful', this.options);
       

      },
      (error) => {
        console.log(error);
      }
    );
   // this.generatemeta=[];

  }

  onGenerate(id: any) {
    this.taskMainDTO = this.taskmainArray.find(taskmain => taskmain['taskid'] == id);

    this.dplistenentry.filelocation = this.taskMainDTO.filelocation
    this.dplistenentry.filelocationt2 = this.taskMainDTO.filelocation2
    this.dplistenentry.rowcount = this.taskMainDTO.rowcount
    this.dplistenentry.status = 'CREATED'
    this.dplistenentry.taskid = this.taskMainDTO.taskid
    this.dplistenentry.taskname = this.taskMainDTO.taskname

    this.dplistenentry.jdbcurlsys1 = this.taskMainDTO.jdbcurlsys1
    this.dplistenentry.usernamesys1 = this.taskMainDTO.usernamesys1
    this.dplistenentry.passwordsys1 = this.taskMainDTO.passwordsys1
    this.dplistenentry.dbtypesys1 = this.taskMainDTO.dbtypesys1
    this.dplistenentry.tablenamesys1 = this.taskMainDTO.tablenamesys1
    this.dplistenentry.starttssys1 = this.taskMainDTO.starttssys1
    this.dplistenentry.endtssys1 = this.taskMainDTO.endtssys1
    this.dplistenentry.sys1type = this.taskMainDTO.sys1type

    this.dplistenentry.jdbcurlsys2 = this.taskMainDTO.jdbcurlsys2
    this.dplistenentry.usernamesys2 = this.taskMainDTO.usernamesys2
    this.dplistenentry.passwordsys2 = this.taskMainDTO.passwordsys2
    this.dplistenentry.dbtypesys2 = this.taskMainDTO.dbtypesys2
    this.dplistenentry.tablenamesys2 = this.taskMainDTO.tablenamesys2
    this.dplistenentry.starttssys2 = this.taskMainDTO.starttssys2
    this.dplistenentry.endtssys2 = this.taskMainDTO.endtssys2
    this.dplistenentry.sys2type = this.taskMainDTO.sys2type


    this.dplistenentry.tablenameClobsys1 = this.taskMainDTO.tablenameClobsys1
    this.dplistenentry.starttsClobsys1 = this.taskMainDTO.starttsClobsys1
    this.dplistenentry.endtsClobsys1 = this.taskMainDTO.endtsClobsys1
    this.dplistenentry.tablenameOnlinesys1 = this.taskMainDTO.tablenameOnlinesys1
    this.dplistenentry.starttsOnlinesys1 = this.taskMainDTO.starttsOnlinesys1
    this.dplistenentry.endtsOnlinesys1 = this.taskMainDTO.endtsOnlinesys1
    this.dplistenentry.tablenameClobsys2 = this.taskMainDTO.tablenameClobsys2
    this.dplistenentry.starttsClobsys2 = this.taskMainDTO.starttsClobsys2
    this.dplistenentry.endtsClobsys2 = this.taskMainDTO.endtsClobsys2
    this.dplistenentry.tablenameOnlinesys2 = this.taskMainDTO.tablenameOnlinesys2
    this.dplistenentry.starttsOnlinesys2 = this.taskMainDTO.starttsOnlinesys2
    this.dplistenentry.endtsOnlinesys2 = this.taskMainDTO.endtsOnlinesys2
    this.dplistenentry.generateMetadata ="true"
    this.dplistenentry.batchtime =0
    this.dplistenentry.rowsprocessed =0
    this.dplistenentry.reportgentime =0
    this.dplistenentry.comparetime =0
    this.dplistenentry.dataloadtime =0

    this.dpListenControllerService.savedplistenUsingPOST(this.dplistenentry).subscribe(
      (response: any) => {
        this.alertService.success('Run created succesful', this.options);
       

      },
      (error) => {
        console.log(error);
      }
    );
    this.generatemeta=[];
    }
  onFileSelected2(event: Event) {

    const file: File = event.currentTarget['files'][0];
    this.fileControllerService.uploadFileUsingPOST(file).subscribe(
      (response: any) => {
        this.alertService.success(response.fname + 'upload succesful', this.options);
        //alert(response.fname);
        this.taskMainDTO.filelocation2 = response.fname;
      },
      (error) => {
        console.log(error);
      }
    );

  }
  onFileSelected1($event: Event) {
    const file: File = event.currentTarget['files'][0];
    this.fileControllerService.uploadFileUsingPOST(file).subscribe(
      (response: any) => {
        this.alertService.success(response.fname + 'upload succesful', this.options);
        //alert(response.fname);
        this.taskMainDTO.filelocation = response.fname;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createtaskmain($event: MouseEvent) {

    this.taskControllerService.savetaskmainUsingPOST(this.taskMainDTO).subscribe(
      (response: any) => {

        //alert(response);
        this.loaddata();
        this.modalClose.nativeElement.click();

      },
      (error) => {
        console.log(error);
      }
    );
  }

  testdbsys1() {
    this.test1="";
    this.dbtest.jdbcurlsys1 = this.taskMainDTO.jdbcurlsys1
    this.dbtest.usernamesys1 = this.taskMainDTO.usernamesys1
    this.dbtest.passwordsys1 = this.taskMainDTO.passwordsys1
    this.dbtest.dbtypesys1 = this.taskMainDTO.dbtypesys1
    this.dbtest.tablenamesys1 = this.taskMainDTO.tablenamesys1
    this.dbtest.starttssys1 = this.taskMainDTO.starttssys1
    this.dbtest.endtssys1 = this.taskMainDTO.endtssys1
    this.dbtestService.dbtestUsingPOST(this.dbtest).subscribe(
      (response: any) => {
        this.test1=response.status;
      },
      (error) => {
        
        this.test1="Failed";
      }
    );
  }
  testdbsys2() {
    this.test2="";
    this.dbtest.jdbcurlsys1 = this.taskMainDTO.jdbcurlsys2
    this.dbtest.usernamesys1 = this.taskMainDTO.usernamesys2
    this.dbtest.passwordsys1 = this.taskMainDTO.passwordsys2
    this.dbtest.dbtypesys1 = this.taskMainDTO.dbtypesys2
    this.dbtest.tablenamesys1 = this.taskMainDTO.tablenamesys2
    this.dbtest.starttssys1 = this.taskMainDTO.starttssys2
    this.dbtest.endtssys1 = this.taskMainDTO.endtssys2
    this.dbtestService.dbtestUsingPOST(this.dbtest).subscribe(
      (response: any) => {
        this.test2=response.status;
      },
      (error) => {
        this.test2="Failed";
      }
    );
  }
  craetetriggersys2() {
    this.createtrigger2="";
    this.dbtest.jdbcurlsys1 = this.taskMainDTO.jdbcurlsys2
    this.dbtest.usernamesys1 = this.taskMainDTO.usernamesys2
    this.dbtest.passwordsys1 = this.taskMainDTO.passwordsys2
    this.dbtest.dbtypesys1 = this.taskMainDTO.dbtypesys2
    this.dbtest.tablenamesys1 = this.taskMainDTO.tablenamesys2
    this.dbtest.starttssys1 = this.taskMainDTO.starttssys2
    this.dbtest.endtssys1 = this.taskMainDTO.endtssys2
    this.dbtestService.createtriggerUsingPOST(this.dbtest).subscribe(
      (response: any) => {
        this.createtrigger2=response.status;
      },
      (error) => {
        this.createtrigger2="Failed";
      }
    );
    }
    droptriggersys2() {
      this.droptrigger2="";
      this.dbtest.jdbcurlsys1 = this.taskMainDTO.jdbcurlsys2
      this.dbtest.usernamesys1 = this.taskMainDTO.usernamesys2
      this.dbtest.passwordsys1 = this.taskMainDTO.passwordsys2
      this.dbtest.dbtypesys1 = this.taskMainDTO.dbtypesys2
      this.dbtest.tablenamesys1 = this.taskMainDTO.tablenamesys2
      this.dbtest.starttssys1 = this.taskMainDTO.starttssys2
      this.dbtest.endtssys1 = this.taskMainDTO.endtssys2
      this.dbtestService.droptriggerUsingPOST(this.dbtest).subscribe(
        (response: any) => {
          this.droptrigger2=response.status;
        },
        (error) => {
          this.droptrigger2="Failed";
        }
      );
    }
    createtrigger2: any;
    droptrigger2: any;
    droptriggersys1() {
      this.droptrigger1="";
      this.dbtest.jdbcurlsys1 = this.taskMainDTO.jdbcurlsys1
      this.dbtest.usernamesys1 = this.taskMainDTO.usernamesys1
      this.dbtest.passwordsys1 = this.taskMainDTO.passwordsys1
      this.dbtest.dbtypesys1 = this.taskMainDTO.dbtypesys1
      this.dbtest.tablenamesys1 = this.taskMainDTO.tablenamesys1
      this.dbtest.starttssys1 = this.taskMainDTO.starttssys1
      this.dbtest.endtssys1 = this.taskMainDTO.endtssys1
      this.dbtestService.droptriggerUsingPOST(this.dbtest).subscribe(
        (response: any) => {
          this.droptrigger1=response.status;
        },
        (error) => {
          console.log(error)
          this.droptrigger1="Failed";
        }
      );
    }
    createtriggersys1() {
      this.createtrig1="";
      this.dbtest.jdbcurlsys1 = this.taskMainDTO.jdbcurlsys1
      this.dbtest.usernamesys1 = this.taskMainDTO.usernamesys1
      this.dbtest.passwordsys1 = this.taskMainDTO.passwordsys1
      this.dbtest.dbtypesys1 = this.taskMainDTO.dbtypesys1
      this.dbtest.tablenamesys1 = this.taskMainDTO.tablenamesys1
      this.dbtest.starttssys1 = this.taskMainDTO.starttssys1
      this.dbtest.endtssys1 = this.taskMainDTO.endtssys1
      this.dbtestService.createtriggerUsingPOST(this.dbtest).subscribe(
        (response: any) => {
          this.createtrig1=response.status;
        },
        (error) => {
          console.log(error)
          this.createtrig1="Failed";
        }
      );
    }
    cleanoldrun() {
      this.dpListenControllerService.cleanupUsingGET().subscribe(
        (response: any) => {
          this.alertService.success('Clean up successful', this.options);
          
  
        },
        (error) => {
          console.log(error);
        }
      );
      }
}
