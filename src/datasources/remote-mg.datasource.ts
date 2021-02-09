import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'RemoteMG',
  connector: 'mongodb',
  url: 'mongodb+srv://root:root@cluster0.z0anp.mongodb.net/LoopBack?retryWrites=true&w=majority',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

@lifeCycleObserver('datasource')
export class RemoteMgDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'RemoteMG';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.RemoteMG', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
