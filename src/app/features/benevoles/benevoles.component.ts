import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { search } from '../home/search';

@Component({
  selector: 'app-benevoles',
  templateUrl: './benevoles.component.html',
  styleUrls: ['./benevoles.component.css']
})
export class BenevolesComponent implements OnInit {
  public search : search = new search();
  constructor(private router: Router) { }
  

  ngOnInit(): void {
  }
  goToConn(pageName: string): void{
  
    this.router.navigate([`${pageName}`]);

  }

}
