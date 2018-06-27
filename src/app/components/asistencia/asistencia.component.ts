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
  rolesObjec: Object[];
  id: any;
  role: any;
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
    this.rolesObjec = [
      { name: 'Cocinaero', id: 1 },
      { name: 'Mesero', id: 2 },
      { name: 'Administrador', id: 3 }
    ];
    this.id = 46;
    console.log('this.userObj', this.userObj)
    setInterval(() => {         //replaced function() by ()=>
      this.myDate = new Date();
      this.horaReloj = this.myDate.getHours();
      this.minutoReloj = this.myDate.getMinutes();
      this.segundoReloj = this.myDate.getSeconds();
      if ((this.minutoReloj / 10) < 1) {
        this.minutoReloj = '0' + this.minutoReloj
      }
      if ((this.segundoReloj / 10) < 1) {
        this.segundoReloj = '0' + this.segundoReloj
      }
    }, 1000);

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
      "Detalle": "Marca de Asistencia",
      "idUsuario": this.userObj[0]['idUsuario'],
      "idReferencia": this.userObj[0]['idReferencia'],
      "idLocal": 1
    })
      .then(({ data }) => {
        this.showMessage('Asistencia registrada exitosamente!');
        console.log('asistencia ok')
        this.loaderBoolean = false;
      })
      .catch((error) => {
        this.loaderBoolean = false;
        this.showMessage('Encontro un error!');
      });

  }

  marcarSalida(idValue) {
    this.menssage = '';
    this.loaderBoolean = true;
    this.dataFake = true;
    this.idName = '1';
    this.userObj = [];
    axios.get(`http://localhost:8000/users/${idValue}`)
      .then(({ data }) => {
        this.loaderBoolean = false;
        this.myDate = new Date();
        this.horaReloj = this.myDate.getHours();
        this.minutoReloj = this.myDate.getMinutes();
        data.data.hSalida = this.horaReloj + ':' + this.minutoReloj
        data.data.idReferencia = 2
        data.data.rolName = this.getRole(data.data.idRol)
        this.userObj.push(data.data)
        this.showMessage('Usuario encontrado exitosamente!');
      })
      .catch(function (error) {
        this.loaderBoolean = false;
        this.showMessage('Usuario No Fue Encontrado!');
        console.log(error);
      });
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
        data.data.hInicio = this.horaReloj + ':' + this.minutoReloj
        data.data.idReferencia = 1
        data.data.rolName = this.getRole(data.data.idRol)
        this.getRole(data.data.idRol);
        this.userObj.push(data.data)
        this.showMessage('Usuario encontrado exitosamente!');
      })
      .catch(function (error) {
        this.loaderBoolean = false;
        this.showMessage('Usuario No Fue Encontrado!');
        console.log(error);
      });
  }

  private getRole(idRole) {
    this.role = null
    this.role = Object.keys(this.rolesObjec).find(k => this.rolesObjec[k].id === idRole)
    ∫
  }
}
