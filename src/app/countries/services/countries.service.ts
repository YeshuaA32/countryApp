import { Injectable }    from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, delay, map, Observable, of, tap } from "rxjs";
import { Country } from "../interfaces/country";
import { cacheStore } from "../interfaces/cache-store.interface";
import { Region } from "../interfaces/region.type";


@Injectable({providedIn:'root'})

export class CountriesService {

    private apiUrl: string = 'https://restcountries.com/v3.1'

    public cacheStore:cacheStore={
        byCapital:  {term:'',countries:[]},
        byCountries:{term:'',countries:[]},
        byRegion:   {region:'',countries:[]},
    }

    constructor (private http:HttpClient){
        this.loadFromLocalStorage();
    }

    private saveToLocalStoreage(){
        localStorage.setItem('cacheStore',JSON.stringify(this.cacheStore))
    }
    private loadFromLocalStorage(){
        if (localStorage.getItem('cacheStore')) return;
        this.cacheStore=JSON.parse(localStorage.getItem('cacheStore')!);
    }

    private getCoutriesRequest(url:string):Observable<Country[]>{
        return this.http.get<Country[]>(url)
        .pipe(
            catchError(error=>{ return of([]) })
        );
    }



    serachCountryByAlphaCode(code:string):Observable<Country|null>{
        const url=  `${this.apiUrl}/alpha/${code}` ;
        return this.http.get<Country[]>(url)
        .pipe(
            map(countries=> countries.length>0? countries[0]:null),
            catchError(error=>{return of(null)}),
           // delay(5000),
        );
    }



    searchCapital(term : string):Observable<Country[]> {
        const url=  `${this.apiUrl}/capital/${term}`
        return this.getCoutriesRequest(url)
            .pipe(
                tap( countries=> this.cacheStore.byCapital={term,countries}),
                tap(()=>this.saveToLocalStoreage()),
            );
    } 
    searchCountry(term:string):Observable<Country[]>{
        const url=  `${this.apiUrl}/name/${term}`
        return this.getCoutriesRequest(url) .pipe(
            tap( countries=> this.cacheStore.byCountries={term,countries}),
            tap(()=>this.saveToLocalStoreage()),
        );;
    }
    searchRegion(region:Region):Observable<Country[]>{
        const url=  `${this.apiUrl}/region/${region}`
        return this.getCoutriesRequest(url) .pipe(
            tap( countries=> this.cacheStore.byRegion={region,countries}),
            tap(()=>this.saveToLocalStoreage()),
        );;
    }
}