import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-benevoles',
  templateUrl: './benevoles.component.html',
  styleUrls: ['./benevoles.component.css']
})
export class BenevolesComponent implements OnInit {

  constructor(private router: Router) { }
  

  ngOnInit(): void {
  }
  goToConn(pageName: string): void{
  
    this.router.navigate([`${pageName}`]);

  }

}
