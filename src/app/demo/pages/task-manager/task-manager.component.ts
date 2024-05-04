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
@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit {

  @ViewChild('myModalClose') modalClose;
  oncreate() {
    this.taskMainDTO = {};
    this.taskMainDTO.createdby=2;
    //alert(JSON.stringify(this.taskMainDTO));

  }

  options = {
    autoClose: true,
    keepAfterRouteChange: false
};
  taskMainDTO: TaskMainDTO = {};
  dplistenentry: DpListenDTO = {};
  taskmainArray = [];

  constructor(private taskControllerService: TaskControllerService,
    private dpListenControllerService: DpListenControllerService,
    private fileControllerService: FileControllerService,
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
        this.alertService.success( 'Delete success', this.options);
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
    this.dpListenControllerService.savedplistenUsingPOST(this.dplistenentry).subscribe(
      (response: any) => {
        this.alertService.success('Run created succesful', this.options);
        setTimeout(() => 
          {
              
              this.router.navigate(['/reports', { id: this.taskMainDTO.taskid }]);
          },
          1000);
         
      },
      (error) => {
        console.log(error);
      }
    );


  }
  onFileSelected2(event: Event) {

    const file: File = event.currentTarget['files'][0];
    this.fileControllerService.uploadFileUsingPOST(file).subscribe(
      (response: any) => {
        this.alertService.success(response.fname +'upload succesful', this.options);
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
        this.alertService.success(response.fname +'upload succesful', this.options);
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

}
