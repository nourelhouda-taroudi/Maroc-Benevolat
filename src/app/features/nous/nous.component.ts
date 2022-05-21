import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nous',
  templateUrl: './nous.component.html',
  styleUrls: ['./nous.component.css']
})
export class NousComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToConn(pageName: string): void{
  
    this.router.navigate([`${pageName}`]);

  }

}
