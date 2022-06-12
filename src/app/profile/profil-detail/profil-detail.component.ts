import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Membres } from 'src/app/models/membre';
import { associations } from 'src/app/models/associations';
import { PostService } from '../../core/services/post.service';
import { Post } from '../../models/post';
import { UploadsService } from './../../core/services/uploads.service';
import { TokenService } from 'src/app/core/services/token.service';


@Component({
  selector: 'app-profil-detail',
  templateUrl: './profil-detail.component.html',
  styleUrls: ['./profil-detail.component.css'],
})
export class ProfilDetailComponent implements OnInit {
  edite = false;
  showForm = true;
  islogIn:boolean=false;
  membres!:Membres[];
  @Input('association') association!: associations;
  mypost: Post = {
    text: '',
    visualisation: '',
    image: '',
    like: true,
    commentaire: '',
    likeNum: 0,
    createdAt: new Date(),
  };

  cards: associations = {
    nameAssociation: '',
    infos: '',
    facebook: '',
    twitter: '',
    id: 0,
    sigleAssociation: '',
    objetSocial: '',
    phoneAssociation: 0,
    address: '',
    codePostal: '',
    logo: '',
    city: '',
    emailAssociation: '',
    instagram: '',
  };

  public associations!: associations[];
  posts: Post[] = [];
  addblogform: any;
  constructor(
    private postservice: PostService,
    private service: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private readonly uploadService: UploadsService,
    private tokenService:TokenService,
  ) {}

  ngOnInit(): void {
   // this.getPosts();
    this.getAsso();
    this.isLoggedIn();
    //this.getMembers();
  }
  getAsso() {
    return this.service.getAssociation().subscribe(
      (response: associations[]) => {
        this.associations = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  editeAnn(post: any) {
    this.cards = post;
    this.edite = true;
    console.log(this.cards.id);

    this.router.navigate(['profile/editer', this.cards.id]);
  }

  getAssoci(id: number) {
    return this.service.getAssociationById(id).subscribe(
      (response) => {
        this.association = response;
        this.association.logo=this.uploadService.getImage(response.logo);
        // console.log(this.association);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  save(data: any) {
    return this.service.saveDemande(data).subscribe(
      (response:{}) => {
        console.log(data)
      
       
    
        this.router.navigate(['Demande'])
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  ajouter(data: any) {
    return this.service.ajoutMembre(data).subscribe(
      (response:{}) => {
        console.log(data)
        // this.router.navigate(['Demande'])
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
