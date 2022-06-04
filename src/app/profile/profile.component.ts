import { ActivatedRoute } from '@angular/router';
import { UploadsService } from './../core/services/uploads.service';
import { PostService } from 'src/app/core/services/Services';
import { associations } from 'src/app/models/associations';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  association!: associations;
  dataExiste:boolean=false;
  constructor(
    private postService: PostService,
    private readonly uploadService: UploadsService,
    private route: ActivatedRoute,

  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((parameterMap) => {
      const id = Number(parameterMap.get('id'));
      this.getAssoci(id);
    });
  }

  getAssoci(id: number) {
    return this.postService.getAssociationById(id).subscribe(
      (response) => {
        this.association = response;
        console.log(response);

        this.association.logo = this.uploadService.getImage(response.logo);
        this.dataExiste = true
        // console.log(this.association);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
