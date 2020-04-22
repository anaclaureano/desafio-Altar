import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataseviceService {

  constructor() {

  }

  public codeObs = new Subject<string>();
  public date= Date.now();
  public firstNum:number;
  public secondNum:number;
  public code: string;
  public array= [];
  public alphabeth= 'abcdefghijklmnoprstuvxz';
  public lastSeconds = 0;
  public secs$: Observable<Object>;

  public character: string;
  public cont$: Observable<Object>;
  public grid$=new Subject();
  public paymentListRow: any[] = [];
  trigger:boolean=false;



  generateArrayGrid(){

    if(this.character!=undefined){
      let indexCharacter = this.alphabeth.indexOf(this.character) +1;
      let contPercentage = 0;
      let z = 0;
      //console.log(this.alphabeth.indexOf(this.character));
      let randomArray =[];
      for(let i=0; i<100; i++){
        randomArray.push(Math.floor((Math.random() * 23) + 1));
      }
      //console.log(randomArray);
      randomArray.forEach(element=>{
        if(element==indexCharacter){
          contPercentage =contPercentage +1;
        }
      });
      if(contPercentage < 20){
        do{
          if(randomArray[(Math.floor((Math.random() * 100) + 1))]==indexCharacter){
            continue;
          }else{
            randomArray[(Math.floor((Math.random() * 100) + 1))]=indexCharacter;
            contPercentage =contPercentage +1;
          }
          
        }while(contPercentage<=20)


      }
      for (let i=0;i<10 ;i++){
        this.array[i]=[];
        for(let j=0; j<10 ; j++){
          this.array[i][j]= this.alphabeth.slice(((randomArray[z])-1),((randomArray[z])));
          z=z+1;
        }
      }
      this.grid$.next(this.array);
    }
    else{
      for (let i=0;i<10 ;i++){
      this.array[i]=[];
      for(let j=0; j<10 ; j++){
        const x = Math.floor((Math.random() * 23) + 1);
        this.array[i][j]= this.alphabeth.slice((x-1),x);
      }
    }

    this.grid$.next(this.array);
    }

  }
  getGridObservable(){
    return this.grid$.asObservable();
  }
  startGrid(){
      setInterval(()=>{
        let second = new Date().getSeconds();
        this.generateArrayGrid();
        this.getCode(second);
        console.log("new value ", this.code);
        this.codeObs.next(this.code);
        
      },2000)
  }
  getCodeObservable(){
    return this.codeObs.asObservable();
  }

  getCode(second:number){

    let secondString =second.toString();
    let a; let b;
    this.firstNum=0;
    this.secondNum=0;

    if(second/10 <1){
      a=0;
      b = parseInt(secondString.slice(0,1)) ;
    }
    else{
      a = parseInt(secondString.slice(0,1)) ;
      b = parseInt(secondString.slice(1,2));
    }

    //console.log(a);
    //console.log(b);

    //console.log(this.array[a][b]);
    //console.log(this.array[b][a]);

    let codeLetter1 = this.array[a][b];
    let codeLetter2 = this.array[b][a];

    this.array.forEach(element => {
      element.forEach(el=>{
        if (el==codeLetter1){
          this.firstNum = this.firstNum + 1;
        }
      });
    });

    this.array.forEach(element => {
      element.forEach(el=>{
        if (el==codeLetter2){
          this.secondNum = this.secondNum + 1;
        }
      });
    });

    if(this.firstNum>9){
      let firstNumTemp =this.firstNum;
      let i= 2;

     do{
        firstNumTemp= this.firstNum/i;
        firstNumTemp= parseInt(firstNumTemp.toFixed(0));
        i++;
     }while (firstNumTemp>9)
      this.firstNum=firstNumTemp;
    }

    if(this.secondNum>9){
      let secondNumTemp =this.secondNum;
      let i= 2;

     do{
        secondNumTemp= this.secondNum/i;
        secondNumTemp= parseInt(secondNumTemp.toFixed(0));
        i++;
     }while (secondNumTemp>9)
      this.secondNum=secondNumTemp;
    }

    //console.log(this.firstNum);
    //console.log(this.secondNum);

    this.code=this.firstNum+''+this.secondNum;

  }
  createPayment(rowPayment: object){
    this.paymentListRow.push(rowPayment);
  }
  getPayment(){
    return this.paymentListRow;
  }





}
