import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  enteredSEarchVAlue: string ='';

  @Output()
  searchTextChanged: EventEmitter<string>= new EventEmitter<string>();


  onSearchTextChanged(){
    this.searchTextChanged.emit(this.enteredSEarchVAlue)
    console.log(this.enteredSEarchVAlue)
  }

  selectedValue: string = '';

  @Output()
  selected: EventEmitter<string>= new EventEmitter<string>();

  selectChangeHandler(event: any){
    const choix = event.target.value;
    this.selected.emit(choix);
    console.log(choix);
   
  }
}
