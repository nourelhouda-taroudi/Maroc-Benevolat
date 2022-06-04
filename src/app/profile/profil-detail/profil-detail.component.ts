import { UploadsService } from './../../core/services/uploads.service';

import { Component, Input, OnInit, Pipe } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../core/services/post.service';
import { associations } from 'src/app/models/associations';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profil-detail',
  templateUrl: './profil-detail.component.html',
  styleUrls: ['./profil-detail.component.css'],
})
export class ProfilDetailComponent implements OnInit {
  edite = false;
  showForm = true;
  association!: associations;
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
    private asso: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private readonly uploadService: UploadsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((parameterMap) => {
      const id = Number(parameterMap.get('id'));
      this.getAssoci(id);
      console.log(id);
    });
    this.getAsso();
  }
  getAsso() {
    return this.asso.getAssociation().subscribe(
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
    return this.asso.getAssociationById(id).subscribe(
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
}
