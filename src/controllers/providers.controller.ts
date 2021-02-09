import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Clients, Providers} from '../models';
import {ProvidersRepository} from '../repositories';

export class ProvidersController {
  constructor(
    @repository(ProvidersRepository)
    public providersRepository : ProvidersRepository,
  ) {}

  @post('/providers')
  @response(200, {
    description: 'Providers model instance',
    content: {'application/json': {schema: getModelSchemaRef(Providers)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Providers, {
            title: 'NewProviders',
            exclude: ['id'],
          }),
        },
      },
    })
    providers: Providers,
  ){
    return this.providersRepository.modelClass.create(providers);
  }

  @get('/providers')
  @response(200, {
    description: 'Array of Providers model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Providers, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Providers) filter?: Filter<Providers>,
  ): Promise<Providers[]> {
    console.log(filter);
    return this.providersRepository.modelClass.find(filter);
  }

  @get('/providers/{id}')
  @response(200, {
    description: 'Providers model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Providers, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Providers, {exclude: 'where'}) filter?: FilterExcludingWhere<Providers>
  ): Promise<Providers> {
    return this.providersRepository.modelClass.findById(id, filter);
  }

  @patch('/providers/{id}')
  @response(204, {
    description: 'Providers PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Providers, {partial: true}),
        },
      },
    })
    provider: Providers,
  ): Promise<void> {
    const ProviderData = new Providers(provider);
    return await this.providersRepository.modelClass.updateAll({id}, ProviderData );
  }

  @del('/providers/{id}')
  @response(204, {
    description: 'Providers DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.providersRepository.modelClass.deleteById(id);
  }
}
