import { Component, OnInit } from '@angular/core';
import { associations } from 'src/app/models/associations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  association !: associations;
  constructor() { }

  ngOnInit(): void {
  }

}
