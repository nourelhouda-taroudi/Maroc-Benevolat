import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { PostService } from './core/services/Services';
import { associations } from './models/associations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'pfs-clients';
  public associations!: associations[];

  private asso!: PostService;
  showHead: boolean = false;
  constructor(private router: Router,
  
    ) {
    // on route change to '/login', set the variable showHead to false
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        {
          if (
            event['url'].split('/')[1]=='auth'||
            event['url'] == '/editer' ||
            event['url'] == '/login_admin' ||
            event['url'] == '/home_admin'  ||
            event['url'] == '/all_associations'  ||
            event['url'] == '/Suppression'||
            event['url'] == '/Signaler'
          ) {
            this.showHead = false;
          } else {
            // console.log("NU")
            this.showHead = true;
          }
        }
      }
    });
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

  public searchFacture(key: string): void {
    const results: associations[] = [];
    console.log(key);
    for (const association of this.associations) {
      if (
        association.nameAssociation.indexOf(key) !== -1 ||
        association.infos.indexOf(key) !== -1
      ) {
        results.push(association);
      }
    }
    this.associations = results;
    console.log(results);
    if (results.length === 0 || !key) {
      this.getAsso();
    }
  }

  
}
