'use strict';

// MODULES
import Fastify, { FastifyInstance } from 'fastify';
import fastify_cookie from '@fastify/cookie';
import fastify_cors from '@fastify/cors';
import fastify_helmet from '@fastify/helmet';
import fastify_rate_limit from '@fastify/rate-limit';
import fastify_static from '@fastify/static';

// API
import bind_routes from '../api';

// CONFIG
import config from '../config';

async function load_fastify(options: any): Promise<FastifyInstance> {
  // FASTIFY SERVER INSTANCE CONFIGURATIONS

  const server: FastifyInstance = Fastify({
    maxParamLength: 256, // url param length
    trustProxy: true, // for NGINX or any other proxy server
    bodyLimit: 2097152, // no data more than 2mb is allowed in one request
    logger: {
      // pino logger module by default
      level: 'info',
      file: process.cwd() + '/logs.log',
    },
  });

  await server.register(fastify_helmet, { global: true });

  await server.register(fastify_static, {
    root: process.cwd(),
    prefix: '/', // optional: default '/'
    constraints: { host: config.env.URL_UI }, // optional: default {}
  });

  await server.register(fastify_cors, { origin: '*' });

  await server.register(fastify_cookie, {
    secret: config.env.SESSION_SECRET,
    parseOptions: {},
  });

  await server.register(fastify_rate_limit, {
    max: 100,
    timeWindow: '1 minute',
  });

  // server.addHook('onRequest', async (request, reply) => {});

  bind_routes(server, options);

  return server;
}

export default load_fastify;
