'use strict';

// MODULES
import { createClient } from 'redis';

async function load_redis(options: any) {
  const client = createClient();

  client.on('error', (err: any) => {
    throw err;
  });

  await client.connect();

  /*
  await client.flushAll();
  await client.flushDb();
  */

  // SETTINGS
  let settings = await client.get('settings');

  await client.set(
    'settings',
    JSON.stringify({
      total_supply: 369369369,
      max_supply: 369369369,
      circulating_supply: 313963963,
    })
  );

  if (!settings) {
    settings = JSON.stringify({
      test: '1',
    });

    await client.set('settings', settings);
  }

  options.redis = client;

  return client;
}

export default load_redis;
