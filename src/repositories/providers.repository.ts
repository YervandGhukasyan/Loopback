import {inject} from '@loopback/core';
import {RemoteMgDataSource} from '../datasources';
import { Providers} from '../models';
import {juggler} from "@loopback/repository/src/repositories/legacy-juggler-bridge";

export class ProvidersRepository{
  modelClass: any;
  constructor(
    @inject('datasources.RemoteMG') dataSource: RemoteMgDataSource,
  ) {
    const definition = Providers.definition;
    console.log('definition.name');
    console.log(definition.name);
    console.log(definition.settings);
    this.modelClass = dataSource.createModel<juggler.PersistedModelClass>(
        definition.name,
        {},
        Object.assign(
            // settings that users can override
            {strict: false},
            // user-defined settings
            definition.settings,
            // settings enforced by the framework
            {strictDelete: false},
        ),
    );
    console.log('this.modelClass');
    // console.log(this.modelClass);
    this.modelClass.attachTo(dataSource);
  }
}
