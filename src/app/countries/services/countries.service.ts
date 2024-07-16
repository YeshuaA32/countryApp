import { Injectable }    from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, delay, map, Observable, of, tap } from "rxjs";
import { Country } from "../interfaces/country";


@Injectable({providedIn:'root'})

export class CountriesService {

    private apiUrl: string = 'https://restcountries.com/v3.1'

    constructor (private http:HttpClient){}

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
        return this.getCoutriesRequest(url);
    } 
    searchCountry(term:string):Observable<Country[]>{
        const url=  `${this.apiUrl}/name/${term}`
        return this.getCoutriesRequest(url);
    }
    searchRegion(region:string):Observable<Country[]>{
        const url=  `${this.apiUrl}/region/${region}`
        return this.getCoutriesRequest(url);
    }
}