import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../core/services/post.service';
import { associations } from '../models/associations';
import { Membres } from '../models/membre';

@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.css']
})
export class MembresComponent implements OnInit {
  @Input('association') association!: associations;
  pages: number = 1;
  membres!:Membres[]
  data:Membres ={
    id_asso: 0,
    name: '',
    lastname: '',
    email: '',
    position: ''
  }
  constructor(private service:PostService,    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((parameterMap) => {
      const id = Number(parameterMap.get('id'));
      this.getAssoci(id);
      console.log("idd is "+id);
      this.getMembre();
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
          position: ''
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
  

}
