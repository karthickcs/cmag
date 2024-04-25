import { Component, OnInit } from '@angular/core';
import { TaskControllerService } from '../../../../api/taskController.service';
import { Router } from '@angular/router';
import { TaskMainDTO } from '../../../../model/taskMainDTO';
import { AuthService } from '../../../../auth/auth.service';
import { FileControllerService } from '../../../../api/fileController.service';
@Component({
  selector: 'app-createtask',
  templateUrl: './createtask.component.html',
  styleUrls: ['./createtask.component.scss']
})
export class CreatetaskComponent implements OnInit {

taskMainDTO: TaskMainDTO   ={};
  
 
 
  constructor(private taskControllerService: TaskControllerService, 
    private fileControllerService: FileControllerService, 
    private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
 
     
    this.taskMainDTO.createdby=2;
     
  }


  onFileSelected2(event: Event) {
   // alert(event.currentTarget.files[0]);
   const file:File = event.currentTarget['files'][0];
   this.fileControllerService.uploadFileUsingPOST(file).subscribe(
      (response: any) => {

              alert(response.fname);
              this.taskMainDTO.filelocation2=response.fname;
      },
      (error) => {
        console.log(error);
      }
    );
   
    }
    onFileSelected1($event: Event) {
      const file:File = event.currentTarget['files'][0];
      this.fileControllerService.uploadFileUsingPOST(file).subscribe(
         (response: any) => {
   
                 alert(response.fname);
                 this.taskMainDTO.filelocation=response.fname;
         },
         (error) => {
           console.log(error);
         }
        );
    }
  
  myClickFunction($event: MouseEvent) {
    //alert("hello");
    this.taskControllerService.savetaskmainUsingPOST(this.taskMainDTO).subscribe(
      (response: any) => {

        alert("Saved");
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
