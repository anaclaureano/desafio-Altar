import { Component, OnInit } from '@angular/core';
import { DataseviceService } from '../core/datasevice.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {
  public PATTERN = /^[a-zA-Z]*$/;
  public isAlpha: boolean =true;

  public array= [];
  public code$: Observable<Object>;
  public grid$: Observable<Object>;
  public character= undefined;
  public code :string;
  public isDisable: boolean=false;

  constructor(private dataservice: DataseviceService) { }
  

  ngOnInit(): void {

    this.grid$= this.dataservice.getGridObservable();
    this.grid$.subscribe((grid:any[]) => {
      this.array = grid;
    });
      this.code$ = this.dataservice.getCodeObservable();
      this.code$.subscribe((code:string)=>{
        this.code = code;
      });

  }
  onKey(event:any) {

    this.isAlpha = this.PATTERN.test(this.character);

    if(this.isAlpha==false){
      this.cleanInput();
    }
    else{
      this.dataservice.character = this.character;
    }
    setInterval(()=>{
      this.isDisable=false;
    },4000);
    setInterval(()=>{
      this.isDisable=true;
      this.cleanInput();
    },8000);
  }

  generateGrid(){
    this.dataservice.trigger=true;
    this.dataservice.startGrid();

  }

  cleanInput(){
      this.character=undefined;
      this.dataservice.character=undefined;
  }


}
