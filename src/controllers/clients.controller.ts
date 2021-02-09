import {
  Filter,
  FilterExcludingWhere,
  repository,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Clients, Providers} from '../models';
import { ClientsRepository } from '../repositories';

export class ClientsController {
  constructor(
    @repository(ClientsRepository)
    public clientsRepository : ClientsRepository,
  ) {}

  @post('/clients')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clients, {
            title: 'NewClients',
            exclude: ['id'],
          }),
        },
      },
    })
    clients: Omit<Clients, 'id'>,
  ){
    return this.clientsRepository.modelClass.create(clients);
  }

  @get('/clients')
  @response(200, {
    description: 'Array of Clients model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Clients, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Clients) filter?: Filter<Clients>,
  ) {
    // console.log(this.clientsRepository.modelClass);
    return await this.clientsRepository.modelClass.find(filter);
  }

  @get('/clients/{id}')
  @response(200, {
    description: 'Providers model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Clients, {includeRelations: true}),
      },
    },
  })
  async findById(
      @param.path.string('id') id: string,
      @param.filter(Clients, {exclude: 'where'}) filter?: FilterExcludingWhere<Providers>
  ) {
    console.log(this.clientsRepository.modelClass);
    return await this.clientsRepository.modelClass.findById(id, filter);
  }

  @patch('/clients/{id}')
  @response(204, {
    description: 'Providers PATCH success',
  })
  async updateById(
      @param.path.string('id') id: string,
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Clients, {partial: true}),
          },
        },
      })
      clients: Clients,
  ){
    const ClientData = new Clients(clients);
    return await this.clientsRepository.modelClass.updateAll({id}, ClientData );
  }

  @del('/clients/{id}')
  @response(204, {
    description: 'Client DELETED successful',
  })
  async deleteById(@param.path.string('id') id: string){
    await this.clientsRepository.modelClass.deleteById(id);
  }
}
