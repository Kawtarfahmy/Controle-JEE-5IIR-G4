import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-facture-details',
  templateUrl: './facture-details.component.html',
  styleUrls: ['./facture-details.component.css']
})
export class FactureDetailsComponent implements OnInit{


  billDetails : any;
  billID!:number;

  constructor(private hhtp:HttpClient, private router:Router, private route:ActivatedRoute) {
    //récupérer l'id du facture à partir de la route
    this.billID=route.snapshot.params['billID'];
  }

  ngOnInit():void {
    this.hhtp.get("http://localhost:8889/BILLING-SERVICE/fullBill/"
      +this.billID)
      .subscribe({

        next : (data)=>{
          this.billDetails=data;
        },
        error : (err)=>{}
      });
  }

  getBillDetails(b: any) {

    this.router.navigateByUrl("/bill-details/"+b.id);
  }

}
