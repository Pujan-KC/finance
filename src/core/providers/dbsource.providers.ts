import dbSource from '../database/dbsource';

export const DbSourceProviders = [
  {
    provide: 'DB_SOURCE',
    useFactory: () => {
      return dbSource.initialize();
    },
  },
];
