'use strict';

// MODULES
import fs from 'fs';
import crypto from 'node:crypto';
import validator from 'validator';

// INTERFACES
import { Document, InsertOneResult, ObjectId } from 'mongodb';

// CONFIG
import config from '../config';

// UTILS
import UTILS_SERVICES from '../utils/services';
import UTILS_COMMON from '../utils/common';

class service_settings_init {
  private options: any;
  private validator: any;

  constructor(options: any) {
    this.options = options;
    this.validator = new UTILS_SERVICES.validator_settings_init(options);
  }

  async get_settings(credentials: any): Promise<any | null> {
    const settings: string = await this.options.redis.get('settings');
    const result = JSON.parse(settings);
    return result;
  }

  async get_total_supply(credentials: any): Promise<any> {
    const settings: string = await this.options.redis.get('settings');
    const result = JSON.parse(settings);
    return result.total_supply;
  }

  async get_max_supply(credentials: any): Promise<any> {
    const settings: string = await this.options.redis.get('settings');
    const result = JSON.parse(settings);
    return result.max_supply;
  }

  async get_circulating_supply(credentials: any): Promise<any> {
    const settings: string = await this.options.redis.get('settings');
    const result = JSON.parse(settings);
    return result.circulating_supply;
  }
}

export default service_settings_init;
