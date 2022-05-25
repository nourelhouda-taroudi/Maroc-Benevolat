import { Pipe, PipeTransform } from '@angular/core';
import { associations } from './models/associations';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(association: associations[], searchValue: string): associations[] {
   if(!association || !searchValue){
     return association;
   }
   return association.filter(association =>
    association.description.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) );
  }

}
