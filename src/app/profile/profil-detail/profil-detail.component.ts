import { Signaler } from './../../models/signaler';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Membres } from 'src/app/models/membre';
import { associations } from 'src/app/models/associations';
import { PostService } from '../../core/services/post.service';
import { Post } from '../../models/post';
import { UploadsService } from './../../core/services/uploads.service';
import { TokenService } from 'src/app/core/services/token.service';
import { ResourceLoader } from '@angular/compiler';


@Component({
  selector: 'app-profil-detail',
  templateUrl: './profil-detail.component.html',
  styleUrls: ['./profil-detail.component.css'],
})
export class ProfilDetailComponent implements OnInit {
  edite = false;
  showForm = true;
  islogIn:boolean=false;
  signale=new Signaler();
  membres!:Membres[];
  EmailVerfication!:string;
  statusdata = [
    { id: 1, name: 'Faux compte ' },
    { id: 2, name: 'Publication de contenus inappropriés' },
  ];
  value = this.statusdata[0];

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
        console.log("here"+data)
        window.location.reload()
      
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  isLoggedIn(){
    this.islogIn=this.tokenService.loggedIn(); 
    this.EmailVerfication=this.tokenService.getInfos().email;
  }
saveSignale(data:any){
  this.signale.nom=this.association.nameAssociation;
 return this.postservice.postSignal(data).subscribe((response:{})=>{
  
  console.log(this.signale.nom)
  window.location.reload()

  })
}
}
