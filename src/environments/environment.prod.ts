import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  apiBaseUrl: 'https://api.restaurant.axetechsolutions.com/api/admin', // Base URL for API endpoints
  pusher: {
    key: '54fd449f6275a062159f',
    cluster: 'ap2'
  }
};
