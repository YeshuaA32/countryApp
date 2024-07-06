import { Component } from '@angular/core';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent {

  searchByCapital(term:string):void{
    console.log('Desde ByCapitalPage')
    console.log({term});
    
  }
}
