import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/core/services/Services';
import { AdminInter } from 'src/app/models/admin';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginAdminComponent implements OnInit {

  constructor(private router:Router, private asso:PostService) { }

  admin = new AdminInter();

  ngOnInit(): void {
  }
  

  goToConn(pageName: string): void{
  
    this.router.navigate([`${pageName}`]);

  }


 



 login(data: any) {
    return this.asso.loginAdmin(data).subscribe(
      (response) => {
        if(response === null){
          this.router.navigate(['/login_admin'])
          console.log("bad login")
        }
        else{ 
          this.router.navigate(['/all_associations'])
     }
       
    
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }




  
}
