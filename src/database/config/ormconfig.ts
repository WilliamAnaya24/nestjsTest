import { URL } from 'url';

export function ormConfig(): any {
  const dbUrl = new URL(process.env.DATABASE_URL);
  const routingId = dbUrl.searchParams.get('options');
  dbUrl.searchParams.delete('options');

  return {
    type: 'cockroachdb',
    url: dbUrl.toString(),
    ssl: true,
    extra: {
      options: routingId,
    },
    synchronize: true, //This parameter should always in false, only when you work locally can turn to true
    entities: ['dist/components/**/entities/*.entity.js'],
    migrations: ['dist/database/migrations/*{.ts,.js}'],
    cli: {
      migrationsDir: 'src/database/migrations',
    },
  };
}
