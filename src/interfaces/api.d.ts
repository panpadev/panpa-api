// TYPES
import { http_methods_t } from 'types/config';

// CLASS TYPES
import service_auth_init from 'services/auth';
import service_mail_init from 'services/mail';
import service_settings_init from 'services/settings';
import service_blockchain_init from 'services/blockchain';

export interface services_i {
  auth: service_auth_init;
  mail: service_mail_init;
  settings: service_settings_init;
  blockchain: service_blockchain_init;
}

export interface routes_i {
  [key: string]: {
    method: http_methods_t;
    url: string;
    handler: (request: any, reply: any) => {};
    schema?: any;
    preValidation?: (request: any, reply: any) => Promise<void>;
  };
}
