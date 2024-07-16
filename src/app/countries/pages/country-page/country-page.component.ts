import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { count, switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css'
})
export class CountryPageComponent implements OnInit{

  public country?:Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesServices:CountriesService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.countriesServices.serachCountryByAlphaCode(id) )
    )
    .subscribe( country=>{
      if(!country){return this.router.navigateByUrl('');}
      //this.country=country
      return this.country=country;
      
    //funcion anterior que no se utiliza 
    //es otra manera de realizarlo
    
    
      // this.countriesServices.serachCountryByAlphaCode(id).subscribe(
      //   country=>{
      //     console.log({country});
      //   }
      // )
    });
  }

  serachCountry(code:string){
    this.countriesServices.serachCountryByAlphaCode(code).subscribe(
      country=>{
        console.log({country});
      }
    )
  }


}
