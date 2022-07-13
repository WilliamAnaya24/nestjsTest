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
    migrations: [],
  };
}
