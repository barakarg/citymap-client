'use strict';

/* App Module */

angular.module('otaba', ['leaflet-directive']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/', {templateUrl: 'partials/map-overview.html',   controller: MapOverviewCtrl}).
      when('/gush/:gushId', {templateUrl: 'partials/gush.html', controller: GushCtrl}).
      otherwise({redirectTo: '/'});
}]);
