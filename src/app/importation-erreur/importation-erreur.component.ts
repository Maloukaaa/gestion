import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-importation-erreur',
  templateUrl: './importation-erreur.component.html',
  styleUrls: ['./importation-erreur.component.scss']
})
export class ImportationErreurComponent implements OnInit {
  headerVal: string;
  headerErreurVal: string;
  headerErreurMSG: string;

  constructor() { }

  ngOnInit() {
    this.headerVal="nom,adresse,organismes";
    this.headerErreurVal="z,,pico,fff";
    this.headerErreurMSG="Le nombre des valeurs entrée est supérieur à celui des champs";

  }  
  public display='none';
  openModal(){

          this.display='block';
   
       }
  
}
