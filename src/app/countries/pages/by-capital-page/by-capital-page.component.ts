import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[]=[];
  public initiaValueCapital: string='';
  public isLoading: boolean=false;


  constructor(private countriesService:CountriesService){}
  ngOnInit(): void {
     this.countries=this.countriesService.cacheStore.byCapital.countries;
     this.initiaValueCapital=this.countriesService.cacheStore.byCapital.term;
  }

  searchByCapital(term:string):void{
    this.isLoading=true;

    this.countriesService.searchCapital(term).subscribe(countries=>{
      this.countries=countries
      this.isLoading=false;
    });
  }



}
