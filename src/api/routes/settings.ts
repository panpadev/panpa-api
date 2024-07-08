'use strict';

// MODULES
import fs from 'fs';

// INTERFACES
import { Document } from 'mongodb';
import { FastifyInstance } from 'fastify';
import { routes_i, services_i } from 'interfaces/api';

// API > MIDDLEWARE
import mw from '../middleware';
import mw_auth from '../middleware/auth';

// API > SCHEMAS
import schemas from '../schemas';

// CONFIG
import config from '../../config';

function bind_settings_routes(
  server: FastifyInstance,
  services: services_i,
  options: any
): FastifyInstance {
  // @ Route Options Area
  const routes: routes_i = {
    // #title: GET PROFILE
    // #state: Public
    // #desc: Check if request has session and user, response: IProfile | null
    settings_get: {
      method: 'GET',
      url: '/v1' + config.endpoints.settings,
      preValidation: mw.prevalidation(null, options),
      handler: async function (request: any, reply: any) {
        const credentials: any = {
          ip: request.ip,
        };

        try {
          const settings = await services.settings.get_settings(credentials);

          reply.send(settings);
        } catch (err: any) {
          reply.status(422).send(err);
        }
      },
    },

    total_supply_get: {
      method: 'GET',
      url: '/v1' + config.endpoints.settings_total_supply,
      preValidation: mw.prevalidation(null, options),
      handler: async function (request: any, reply: any) {
        const credentials: any = {
          ip: request.ip,
        };

        try {
          const total_supply = await services.settings.get_total_supply(
            credentials
          );

          reply.send(total_supply);
        } catch (err: any) {
          reply.status(422).send(err);
        }
      },
    },

    max_supply_get: {
      method: 'GET',
      url: '/v1' + config.endpoints.settings_max_supply,
      preValidation: mw.prevalidation(null, options),
      handler: async function (request: any, reply: any) {
        const credentials: any = {
          ip: request.ip,
        };

        try {
          const max_supply = await services.settings.get_max_supply(
            credentials
          );

          reply.send(max_supply);
        } catch (err: any) {
          reply.status(422).send(err);
        }
      },
    },

    circulating_supply_get: {
      method: 'GET',
      url: '/v1' + config.endpoints.settings_circulating_supply,
      preValidation: mw.prevalidation(null, options),
      handler: async function (request: any, reply: any) {
        const credentials: any = {
          ip: request.ip,
        };

        try {
          const circulating_supply =
            await services.settings.get_circulating_supply(credentials);

          reply.send(circulating_supply);
        } catch (err: any) {
          reply.status(422).send(err);
        }
      },
    },
  };

  // Route them in fastify
  for (const key in routes) {
    server.route(routes[key]);
  }

  return server;
}

export default bind_settings_routes;
