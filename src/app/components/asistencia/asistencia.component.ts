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
  menuBoolean:boolean=false;
  loaderBoolean:boolean=false;
  messageBoolean:boolean=false;
  dataFake:boolean=false;
  menssage:string='Usuario encontrado exitosamente!';
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
  showMenu(){
    this.menuBoolean = !this.menuBoolean;
  }
  showMessage(text:string){
    this.menssage = text;
    this.messageBoolean = true;
    setTimeout(()=>{
      this.messageBoolean = false;
      console.log(this.messageBoolean)
    },2500)
  }
  marcarAsistencia(){
    this.loaderBoolean = true;
    this.dataFake = false;
    setTimeout(()=>{
      this.loaderBoolean = false;
      this.showMessage('Asistencia registrada exitosamente!');
    },1200)
  }
  marcarIngreso(){
    this.menssage='';
    this.loaderBoolean = true;
    this.dataFake = true;
    setTimeout(()=>{
      this.loaderBoolean = false;
      this.showMessage('Usuario encontrado exitosamente!');
    },1200)
  }
}
