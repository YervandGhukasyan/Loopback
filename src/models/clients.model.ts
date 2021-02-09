import {Entity, model, property, hasMany} from '@loopback/repository';
import { Providers } from './providers.model'

@model({settings: {strict: false}})
export class Clients extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  phone?: string;

  @property({
    type: 'object',
  })
  patients: object[];

  [prop: string]: any;

  constructor(data?: Partial<Clients>) {
    super(data);
  }
}

export type ClientsWithRelations = Clients;
