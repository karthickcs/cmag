import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { TaskControllerService } from '../../../../api/taskController.service';
import { DpListenControllerService } from '../../../../api/dpListenController.service';
import { TaskMainDTO } from '../../../../model/taskMainDTO';
import { DpListenDTO } from '../../../../model/dpListenDTO';
import { DiffTableControllerService } from '../../../../api/diffTableController.service';
import { DiffTableDTO } from '../../../../model/diffTableDTO';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TableStructControllerService } from '../../../../api/tableStructController.service';
import { TableStructDTO } from '../../../../model/tableStructDTO';
import { UserControllerService } from '../../../../api/userController.service';
import { UserDTO } from '../../../../model/userDTO';
import { JwtAuthenticationControllerService } from '../../../../api/jwtAuthenticationController.service';
import { RolemasterDTO } from '../../../../model/rolemasterDTO';
 

 
@Component({
  selector: 'app-usermanager',
  templateUrl: './usermanager.component.html',
  styleUrls: ['./usermanager.component.scss']
})
export class UsermanagerComponent implements OnInit {
color: any;
colorrgb: any="15, 163, 72";
 
 
oncreateRole() {
 this.roleDto={};
 this.changedetectionref.detectChanges;
}
submitDataRole() {
  this.userControllerService.saverolemasterUsingPOST(this.roleDto).subscribe(
    (response: any) => {
      //this.alertService.success('Success load!!', this.options);
      this.loadRoles();
      this.modalCloseRole.nativeElement.click();
     //
    },
    (error) => {
      console.log(error);
    }
  );
}



@ViewChild('myModalRoleClose') modalCloseRole;
  @ViewChild('myModalClose') modalClose;
  userArray: any={};
  roleArray: any ={};
  userDto: UserDTO ={};
  roleDto: RolemasterDTO={};

  constructor(private userControllerService: UserControllerService, private changedetectionref: ChangeDetectorRef,
    private jwtAuthenticationControllerService:JwtAuthenticationControllerService, 
    private el: ElementRef, private renderer:Renderer2,
    
    private router: Router) { }

    ngOnInit() {
      
        this.loadUsers();
        this.loadRoles();
      }
      loadUsers() {
        this.userControllerService.getUsersUsingGET().subscribe(
          (response: any) => {
            //this.alertService.success('Success load!!', this.options);
            // alert(response);
            this.userArray = response;
          },
          (error) => {
            console.log(error);
          }
        );
      }
      loadRoles() {
        this.userControllerService.getAllUsersUsingGET().subscribe(
          (response: any) => {
            //this.alertService.success('Success load!!', this.options);
            // alert(response);
            this.roleArray = response;
          },
          (error) => {
            console.log(error);
          }
        );
      }
      submitData() {
        this.jwtAuthenticationControllerService.updateUserUsingPOST(this.userDto).subscribe(
         (response: any) => {
           //this.alertService.success('Success load!!', this.options);
           this.loadUsers();
           this.modalClose.nativeElement.click();
          //
         },
         (error) => {
           console.log(error);
         }
       );
       }
       rolesobj: any;
        
       onEdit(id: any) {
         this.userDto = this.userArray.find(user => user['id'] == id);
       }
       ondelete(id:any) {
        this.userControllerService.deleteuserUsingDELETE(id).subscribe(
          (response: any) => {
            //this.alertService.success('Success load!!', this.options);
            // alert(response);
            this.loadUsers();
          },
          (error) => {
            console.log(error);
          }
        );
       }
       onedit(id:any) {
        this.roleDto = this.roleArray.find(role => role['id'] == id);
       }
       onrun() {
       throw new Error('Method not implemented.');
       }
       oncreate() {

      
        var collection = document.getElementsByClassName("pcoded-navbar");
        const elm = document.querySelector<HTMLElement>('.pcoded-navbar')!;
        elm.style.backgroundColor = "rgb("+this.colorrgb.split(',')[0]+","+ this.colorrgb.split(',')[1]+","+ this.colorrgb.split(',')[2]+")";
        
        this.userDto = {};
        this.changedetectionref.detectChanges;
        }

        onApply() {

      
          var collection = document.getElementsByClassName("pcoded-navbar");
          const elm = document.querySelector<HTMLElement>('.pcoded-navbar')!;
          elm.style.backgroundColor = this.color;
          
          
          }

          onrgb() {

      
            var collection = document.getElementsByClassName("pcoded-navbar");
            const elm = document.querySelector<HTMLElement>('.pcoded-navbar')!;
            elm.style.backgroundColor = "rgb("+this.colorrgb.split(',')[0]+","+ this.colorrgb.split(',')[1]+","+ this.colorrgb.split(',')[2]+")";
            
            const nodeList = document.querySelectorAll<HTMLElement>("table");
            for (let i = 0; i < nodeList.length; i++) {
              nodeList[i].style.backgroundColor = "red";
            }
           // elm1.style.backgroundColor = "rgb("+this.colorrgb.split(',')[0]+","+ this.colorrgb.split(',')[1]+","+ this.colorrgb.split(',')[2]+")";
          //  elm1.style.backgroundColor = "rgb("+this.colorrgb.split(',')[0]+","+ this.colorrgb.split(',')[1]+","+ this.colorrgb.split(',')[2]+")";
            
            }
        
}
