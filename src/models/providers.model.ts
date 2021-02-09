import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Providers extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
  })
  name?: string;


  constructor(data: Providers) {
    super(data);
  }
}

export type ProvidersWithRelations = Providers;
