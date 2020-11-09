import { Moment } from 'moment';

export interface IContact {
  id?: number;
  nom?: string;
 // prenom?: string;
  email?: string;
  adresse?: string;
  organisme?: string;
  codeDouane?: string;
  codePostal?: string;
  datePContact?: Moment;
  fax?: string;
  matriculeFiscale?: string;
  secteurDactivite?: string;
  profession?: string;
  domaineDactivite?: string;
  siteWeb?: string;
  telBureau?: string;
  ville?: string;
  contactType?: string;
  authors?: string;
  readers?: string;
  comment?: string;
  isTest?: Boolean;
  isActive?: Boolean;
}

export class Contact implements IContact {
  constructor(
    public id?: number,
    public nom?: string,
   // public prenom?: string,
    public email?: string,
    public adresse?: string,
    public organisme?: string,
    public codeDouane?: string,
    public codePostal?: string,
    public datePContact?: Moment,
    public fax?: string,
    public matriculeFiscale?: string,
    public profession?: string,
    public domaineDactivite?: string,
    public secteurDactivite?: string,
    public siteWeb?: string,
    public telBureau?: string,
    public contactType?: string,
    public ville?: string,
    public authors?: string,
    public readers?: string,
    public comment?: string,
    public isTest?: Boolean,
    public isActive?: Boolean,
  ) {}
}
