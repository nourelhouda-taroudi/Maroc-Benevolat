import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../core/services/post.service';
import { Membres } from '../models/membre';

@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.css']
})
export class MembresComponent implements OnInit {

  pages: number = 1;
  membres!:Membres[]
  constructor(private service:PostService) { }

  ngOnInit(): void {
    this.getMembre()
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

}
