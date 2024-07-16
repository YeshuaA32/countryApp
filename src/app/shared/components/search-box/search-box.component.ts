import { Component, EventEmitter, Input, input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private deBouncer: Subject<string>=new Subject<string>();
  private deBoucerSucription?: Subscription;

  @Input()
  public placeholder: string='';

  @Input()
  public initialValue: string = '';

  @Input()
  public initialValueBox: string='';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    console.log("valor de initial value",this.initialValue);


    this.deBoucerSucription=  this.deBouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe(value=>{
      this.onDebounce.emit(value);
      
    })
  }
  ngOnDestroy(): void {
    console.log('destruido');
    this.deBoucerSucription?.unsubscribe();
    
  }

  emitValue(value:string):void{
    this.onValue.emit(value);
  }

  onkeyPress(searchTerm:string){
    console.log(searchTerm);
    this.deBouncer.next(searchTerm);
  }
}
