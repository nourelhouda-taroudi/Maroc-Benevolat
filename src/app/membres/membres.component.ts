import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../core/services/post.service';
import { TokenService } from '../core/services/token.service';
import { associations } from '../models/associations';
import { Membres } from '../models/membre';

@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.css']
})
export class MembresComponent implements OnInit {
  @Input('association') association!: associations;
  member1=new Membres();
  pages: number = 1;
  membres!:Membres[]
  membre!:Membres;
  data:Membres ={
    id_asso: 0,
    name: '',
    lastname: '',
    email: '',
    position: '',
    id:0
  }
  islogIn:boolean=false;
  constructor(private service:PostService,    private route: ActivatedRoute,private tokenService:TokenService,) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((parameterMap) => {
      const id = Number(parameterMap.get('id'));
      this.getAssoci(id);
      console.log("idd is "+id);
      this.getMembre();
      this.isLoggedIn();
    });
  }
  
  getMembre(){
    this.service.getMembres().subscribe((response: Membres[]) => {
      this.membres = response;   
    },
    (error : HttpErrorResponse) => {
      alert(error.message)
    }
  );
  }

  getAssoci(id: number) {
    return this.service.getAssociationById(id).subscribe(
      (response) => {
        this.association = response;
        this.data={
          id_asso: Object.values(response)[0],
          name: '',
          lastname: '',
          email: '',
          position: '',
          id:0
        }

        this.service.getMembreById(this.data).subscribe((respon: Membres[]) => {
              this.membres = respon;
          
             
            },)
  
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  edite(membre:Membres){
    this.member1=membre;
  }
  deleteMembre(id: any){
    this.service.deleteMembre(id).subscribe(() =>{
      this.membres=this.membres.filter(demande => demande.id =id)
      console.log(id);
      this.getMembre()
    })
  }
  public updateMember(member:Membres):void{
    this.service.updateMembre(member,member.id).subscribe((response: Membres) => {
      console.log(response);
      this.getMembre();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
  }
  isLoggedIn(){
    this.islogIn=this.tokenService.loggedIn(); 
  }
}
