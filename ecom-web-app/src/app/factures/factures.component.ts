import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-factures',
  templateUrl: './factures.component.html',
  styleUrls: ['./factures.component.css']
})
export class FacturesComponent implements OnInit{

  bills : any;
  customerID!:number;

  constructor(private hhtp:HttpClient, private router:Router, private route:ActivatedRoute) {
    //récupérer l'id du client à partir de la route
    this.customerID=route.snapshot.params['customerID'];
  }

  ngOnInit():void {
    this.hhtp.get("http://localhost:8889/BILLING-SERVICE/bills/search/byCustomerID?projection=FullBill&customerID="
      +this.customerID)
      .subscribe({

      next : (data)=>{
        this.bills=data;
      },
      error : (err)=>{}
    });
  }

  getBillDetails(b: any) {

    this.router.navigateByUrl("/bill-details/"+b.id);
  }
}
