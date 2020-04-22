import { Component, OnInit } from '@angular/core';
import { DataseviceService } from '../core/datasevice.service';
import { Observable } from 'rxjs';
import { GeneratorComponent } from '../generator/generator.component';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  public code$: Observable<Object>;
  public paymentListRow: any[] = [];
  public paymentListTemp: any;

  name:string;
  ammount:string;
  code:string;
  grid='64';


  constructor(private dataservice: DataseviceService) { }


  ngOnInit(): void {
    
      this.code$ = this.dataservice.getCodeObservable();
      this.code$.subscribe((code:string)=>{
        this.code = code;
        console.log("new code received on payments:",code);
      });
    
    this.paymentListRow = this.dataservice.getPayment();
  }

  addPaymentRow(){
    if(this.ammount==''||this.name==''||this.ammount==undefined||this.ammount==undefined||this.code==undefined){
      alert("Todos os campos devem ser preenchidos");
    }
    else{
      this.paymentListTemp = {
      name: this.name,
      ammount:this.ammount,
      code:this.code,
      grid:this.grid

      }
    this.dataservice.createPayment(this.paymentListTemp);
    this.ammount='';
    this.name='';
    }
  }

    



}
