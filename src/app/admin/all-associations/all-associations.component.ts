import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/Services';
import { associations } from 'src/app/models/associations';

@Component({
  selector: 'app-all-associations',
  templateUrl: './all-associations.component.html',
  styleUrls: ['./all-associations.component.css']
})
export class AllAssociationsComponent implements OnInit {
  public associations!: associations[] ;
  constructor(private asso: PostService) { }
  searchText:string='';
  slide : boolean= true;
  ngOnInit(): void {
    this.getAsso()
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


   deletepost(id: any){
    this.asso.deleteAsso(id).subscribe(() =>{
      this.associations =this.associations.filter(post => post.id !=id)
    })
  }

  onSearchTextEntered(searchedValue: string){
    this.searchText = searchedValue
    console.log(this.searchText)
    this.slide=false;
    if(this.searchText === ''){
      this,this.slide=true
    }
 
  }
}
