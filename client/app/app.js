'use strict';

angular.module('stickerMarketApp', [
  'stickerMarketApp.auth',
  'stickerMarketApp.admin',
  'stickerMarketApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
