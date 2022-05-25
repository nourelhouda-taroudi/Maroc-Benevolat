import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { associations } from './models/associations';
import { PostService } from './features/home/services/Services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pfs-clients';
  public associations!: associations[] ;
  private asso!: PostService ;
  showHead: boolean = false;
  constructor(private router: Router) {
   // on route change to '/login', set the variable showHead to false
   router.events.forEach((event) => {
    if (event instanceof NavigationStart) {

 {

      if (event['url'] == '/auth/login' ||  event['url'] == '/auth/register' || event['url'] == '/auth/forget-password' 
      || event['url'] == '/editer' ) {

        this.showHead = false;
      } else {
        // console.log("NU")
        this.showHead = true;
      }
 }
  
}});
}
getAsso(){
   
  return this.asso.getAssociation().subscribe((response: associations[]) => {
   this.associations = response;
 },
 (error : HttpErrorResponse) => {
   alert(error.message)
 }
);

 }

public searchFacture(key: string): void{
  const results: associations[] = [];
  console.log(key)
  for (const association of this.associations){
    if (association.nom.indexOf(key) !== -1 || association.description.indexOf(key) !== -1){
      results.push(association);
    }
  }
  this.associations = results;
  console.log(results)
  if (results.length === 0 || !key){
    this.getAsso();
  }
}
}
