import { Component, OnInit } from '@angular/core';
import axios from 'axios'

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
  userObj: Object[];
  id: any;
  s: any;
  myDate: any;
  menuBoolean: boolean = false;
  loaderBoolean: boolean = false;
  messageBoolean: boolean = false;
  dataFake: boolean = false;
  idName: string = ''
  menssage: string = 'Usuario encontrado exitosamente!';
  constructor() {
  }

  ngOnInit() {
    this.userObj = []
    this.id = 46;
    console.log('this.userObj', this.userObj)

     /* this.segundoReloj = this.myDate.getSeconds();
      console.log(this.minutoReloj/10)
      if((this.minutoReloj/10) < 1){
        console.log('v')
        this.minutoReloj = '0'+this.minutoReloj
      }
      if((this.segundoReloj/10) < 1){
        console.log('v')
        this.segundoReloj = '0'+this.segundoReloj
      }
      console.log(this.horaReloj, this.minutoReloj); // just testing if it is working
      */
  }
  showMenu() {
    this.menuBoolean = !this.menuBoolean;
  }
  showMessage(text: string) {
    this.menssage = text;
    this.messageBoolean = true;
    setTimeout(() => {
      this.messageBoolean = false;
      console.log(this.messageBoolean)
    }, 2500)
  }
  marcarAsistencia() {
    this.loaderBoolean = true;
    this.dataFake = false;

    axios.post('http://localhost:8000/asistence', {
      "Detalle": "Detalle",
      "idUsuario": 1,
      "idReferencia": 1,
      "idLocal": 1    })
      .then( ({data}) => {
        this.showMessage('Asistencia registrada exitosamente!');
        this.loaderBoolean = false;
      })
      .catch( (error) => {
        this.loaderBoolean = false;
        this.showMessage('Encontro un error!');
    });

  }

  marcarSalida(){
    this.myDate = new Date();
    this.horaReloj = this.myDate.getHours();
    this.minutoReloj = this.myDate.getMinutes();
    this.userObj[0]['hSalida'] = this.horaReloj + ':' + this.minutoReloj 
  }

  marcarIngreso(idValue) {
    this.menssage = '';
    this.loaderBoolean = true;
    this.dataFake = true;
    this.idName = '1';
    this.userObj = [];
    console.log(this.id)
    axios.get(`http://localhost:8000/users/${idValue}`)
      .then(({ data }) => {
        this.loaderBoolean = false;
        this.myDate = new Date();
        this.horaReloj = this.myDate.getHours();
        this.minutoReloj = this.myDate.getMinutes();
        data.data.hInicio =  this.horaReloj + ':' + this.minutoReloj 
        this.userObj.push(data.data)
        this.showMessage('Usuario encontrado exitosamente!');
      })
      .catch(function (error) {
        this.loaderBoolean = false;
        this.showMessage('Usuario No Fue Encontrado!');
        console.log(error);
      });
  }
}
