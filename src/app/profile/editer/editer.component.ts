import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/core/services/Services';
import { associations } from 'src/app/models/associations';

@Component({
  selector: 'app-editer',
  templateUrl: './editer.component.html',
  styleUrls: ['./editer.component.css'],
})
export class EditerComponent implements OnInit {
  edite = false;
  showForm = true;
  association!: associations;

  editAsso: associations = {
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
  constructor(
    private route: ActivatedRoute,
    private assoService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((parameterMap) => {
      const id = Number(parameterMap.get('id'));
      this.getAsso(id);
      console.log(id);
    });
  }

  getAsso(id: number) {
    return this.assoService.getAssociationById(id).subscribe(
      (response: any) => {
        this.association = response;

        console.log(this.association);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  goToConn(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }
  resetpost() {
    this.editAsso = {
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
  }

  updateAsso() {
    this.assoService.updateAsso(this.association).subscribe((post: any) => {
      this.resetpost();
  
      this.showForm = false;
      this.router.navigate([`profile/${this.association.id}`]);
    });
  }

  goTo(post: any) {
    this.editAsso = post;
    this.router.navigate(['profile', this.editAsso.id]);
  }
}
