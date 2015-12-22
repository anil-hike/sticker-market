'use strict';

angular.module('stickerMarketApp.designer')
  .config(function($stateProvider) {
    $stateProvider
      .state('designer', {
        url: '/designer',
        templateUrl: 'app/designer/designer.html',
        controller: 'DesignerController',
        controllerAs: 'designer',
        authenticate: 'designer'
      });
  });
