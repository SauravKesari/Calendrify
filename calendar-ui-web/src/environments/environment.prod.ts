// Enums
import { EnvName } from './environment.enum';

// Packages

const scheme = 'https://';
const host = 'd3psfdhg4pvg.cloudfront.net';
const path = '/api/';
const baseUrl = scheme + host + path;

export const environment = {
  production: true,
  appName: 'Calendrify',
  envName: EnvName.PROD,
  defaultLanguage: 'en',
  apiBaseUrl: baseUrl,
};
