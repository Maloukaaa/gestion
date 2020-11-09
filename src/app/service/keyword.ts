import { Moment } from 'moment';

export interface IKeyWord {
  id?: number;
  keyword?: string;
 // prenom?: string;
  value?: string;
  authors?: string;
  readers?: string;
  comment?: string;
  isTest?: Boolean;
  isActive?: Boolean;
}

export class KeyWord implements IKeyWord {
  constructor(
    public id?: number,
    public keyword?: string,

    public value?: string,
   

    public authors?: string,
    public readers?: string,
    public comment?: string,
    public isTest?: Boolean,
    public isActive?: Boolean,
  ) {}
}
