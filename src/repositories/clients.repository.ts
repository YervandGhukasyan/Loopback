import {inject} from '@loopback/core';
import {RemoteMgDataSource,} from '../datasources';
import { Clients } from '../models';
import {juggler} from "@loopback/repository/src/repositories/legacy-juggler-bridge";

export class ClientsRepository {
  modelClass: any;
  constructor(
    @inject('datasources.RemoteMG') dataSource: RemoteMgDataSource,
  ) {
    const definition = Clients.definition;
    this.modelClass = dataSource.createModel<juggler.PersistedModelClass>(
        definition.name,
        {},
        Object.assign(
            // settings that users can override
            {strict: true},
            // user-defined settings
            definition.settings,
            // settings enforced by the framework
            {strictDelete: false},
        ),
    );
    this.modelClass.attachTo(dataSource);
  }
}

