import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss']
})
export class AsistenciaComponent implements OnInit {
  fecha: any;
  horaReloj: any;
  minutoReloj: any;
  segundoReloj: any;
  s: any;
  myDate:any;
  constructor() {
   }

  ngOnInit() {
    setInterval(() => {         //replaced function() by ()=>
      this.myDate = new Date();
      this.horaReloj = this.myDate.getHours();
      this.minutoReloj = this.myDate.getMinutes();
      this.segundoReloj = this.myDate.getSeconds();
      console.log(this.minutoReloj/10)
      if((this.minutoReloj/10) < 1){
        console.log('v')
        this.minutoReloj = '0'+this.minutoReloj
      }
      if((this.segundoReloj/10) < 1){
        console.log('v')
        this.segundoReloj = '0'+this.segundoReloj
      }
      console.log(this.myDate); // just testing if it is working
    }, 1000);
  }
  
}
