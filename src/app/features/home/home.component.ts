import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import slideData from '../../../app/features/slide.json';

import { associations } from '../../models/associations';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PostService } from 'src/app/core/services/Services';
import { UploadsService } from 'src/app/core/services/uploads.service';

interface Slide {
  img: String;
  para: String;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  ipAddress = '';
  edite = false;
  slide: boolean = true;
  searchText: string = '';
  selectedText: string = '';
  resp: string = '';
  public association!: associations;

  constructor(
    private asso: PostService,
    private router: Router,
    public uploadService: UploadsService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  public associations!: associations[];
  associ!: associations[];
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

  ngOnInit(): void {
    this.route.paramMap.subscribe((parameterMap) => {
      const id = Number(parameterMap.get('id'));
      this.getAssoci(id);
      console.log(id);
    });
    this.getAsso();
  }

  slides: Slide[] = slideData;

  getAsso() {
    return this.asso.getAssociation().subscribe((response: associations[]) => {
      this.associations = response;
    });

    (error: HttpErrorResponse) => {
      alert(error.message);
    };
  }

  getAssoci(id: number) {
    return this.asso.getAssociationById(id).subscribe(
      (response) => {
        this.association = response;
        this.association.logo = this.uploadService.getImage(response.logo);
        // console.log(this.association);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  goToConn(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  public searchAsso(homeform: NgForm): void {
    let key = JSON.stringify(homeform.value);

    const results: associations[] = [];
    for (const card of this.associations) {
      if (
        card.infos.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1
      ) {
        results.push(card);
      }
    }
    this.associations = results;
    console.log(results);
    if (results.length == 0 || !key) {
      this.getAsso();
    }
  }

  public onChange(event: any): void {
    //event will give you full breif of action
    const choix = event.target.value;
    console.log(choix);
    const results: associations[] = [];
    for (const agences of this.associations) {
      if (agences.infos.indexOf(choix) !== -1) {
        results.push(agences);
      }
    }
    this.associations = results;
    this.onChange(event);
    if (results.length === 0 || !choix) {
      this.getAsso();
    }
  }

  navigateTo(post: any) {
    this.cards = post;
    this.edite = true;
    console.log(this.cards.id);
    this.router.navigate(['profile', this.cards.id]);
  }

  onSearchTextEntered(searchedValue: string) {
    this.searchText = searchedValue;
    console.log(this.searchText);
  }

  selectChangeHandler(event: any) {
    const choix = event.target.value;

    console.log(choix);

    const results: associations[] = [];
    for (const association of this.associations) {
      if (
        association.sigleAssociation
          .toLocaleLowerCase()
          .indexOf(choix.toLocaleLowerCase()) !== -1
      ) {
        results.push(association);
      }
    }
    this.associations = results;

    if (results.length === 0 || !choix) {
      this.getAsso();
    }
  }
}
