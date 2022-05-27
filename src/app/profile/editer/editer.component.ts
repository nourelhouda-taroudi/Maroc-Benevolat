import { PostService } from 'src/app/features/home/services/Services';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { associations } from 'src/app/models/associations';

@Component({
  selector: 'app-editer',
  templateUrl: './editer.component.html',
  styleUrls: ['./editer.component.css']
})
export class EditerComponent implements OnInit {
  edite = false;
  showForm = true;
  association !: associations;

  editAsso:associations ={
    nom: '',
    description: '',
    facebook: '',
    twitter: '',
    id: 0,
    siege: '',
    objet: '',
    telephone: 0,
    adresse: '',
    code_postal: 0,
    ville: '',
    email: '',
    instagram: ''
  }
  constructor(private route: ActivatedRoute, private assoService : PostService, private router: Router) { }



  ngOnInit(): void {
    this.route.paramMap.subscribe(parameterMap => {
     const id = Number(parameterMap.get('id'));
     this.getAsso(id);
     console.log(id)
        })
  }

 


  getAsso(id : number){
   
    return this.assoService.getAssociationById(id).subscribe((response:any) => {
     this.association= response;

     console.log(this.association)
   
   },
   (error : HttpErrorResponse) => {
     alert(error.message)
   }
 );
 
   }

   goToConn(pageName: string): void{
  
    this.router.navigate([`${pageName}`]);

  }
  resetpost(){
    this.editAsso={
       nom: '',
    description: '',
    facebook: '',
    twitter: '',
    id: 0,
    siege: '',
    objet: '',
    telephone: 0,
    adresse: '',
    code_postal: 0,
    ville: '',
    email: '',
    instagram: ''
    }
  }

   updateAsso(){
    this.assoService.updateAsso(this.association).subscribe((post:any) => {
      this.resetpost();
      this.edite = false;
      this.showForm =  false;
      this.router.navigate(['profile'])
    })
  }

   

  

}
