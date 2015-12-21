'use strict';

angular.module('stickerMarketApp.auth', [
  'stickerMarketApp.constants',
  'stickerMarketApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
