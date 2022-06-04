import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PostService } from 'src/app/core/services/Services';
import { associations } from 'src/app/models/associations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  @Input('association') association!: associations;
  public associations!: associations[];
  url = '';
  constructor(private asso: PostService, public sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.getAsso();

    this.generateMapUrl();
  }

  generateMapUrl() {
    let address = encodeURIComponent(this.association.address);
    let city = encodeURIComponent(this.association.city);
    this.url = `https://maps.google.com/maps?q=${address}$${city}&t=&z=20&ie=UTF8&iwloc=&output=embed`;
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
}
