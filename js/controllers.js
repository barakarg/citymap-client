'use strict';

/* Controllers */

function MapOverviewCtrl($scope, $http) {
  // dynamically match the map height to fit the window size
  $(window).on('resize , load', function() {
    $('#overviewMap').height($(window).height()-30);
  });
}

function GushCtrl($scope, $routeParams, $http) {
  // dynamically match the modal height to fit the window size
  $(window).on('resize , load', function() {
    $('#docModal').height($(window).height()-90);
  });

  // set modal center coords
  // $http.get('data/gushim.min.json').success(function(data) {

  //   $scope.gush_properties = $.grep(data.features, function(gush) {
  //     return gush.properties.name === $scope.gush_id;
  //   })[0].geometry.coordinates[0][0];
  //   $scope.center = { lat: $scope.gush_properties[0], lng: $scope.gush_properties[1] };

  // });

  $scope.gushId = $routeParams.gushId;
  $scope.center = [$routeParams.gushLat, $routeParams.gushLong];

  $scope.planLink = 'http://www.mmi.gov.il/IturTabot/taba2.asp?Gush=' + $scope.gush_id + '&MisTochnit=';
  $scope.plansAPILink = 'http://opentaba-server.herokuapp.com/gush/' + $scope.gushId + '/plans';

  // load plans data
  $http.get($scope.plansAPILink).success(function(data) {
    $scope.plans = data;
  });

  $scope.modalTemplates = {
    'loading':  { url: 'partials/loading.html' },
    'tasrit':   { url: 'partials/modals/tasrit.html' },
    'takanon':  { url: 'partials/modals/takanon.html' },
    'nispahim': { url: 'partials/modals/nispahim.html' },
    'files':    { url: 'partials/modals/files.html' }
  };

  $scope.setModal = function(temp, link){
    // set template
    $scope.modalTemplate = $scope.modalTemplates[temp];

    // set data
    $scope.modalData = link;
  };

  $scope.showDocModal = function(temp, link) {
    $scope.setModal(temp, link);
    angular.element('#docModal').modal('show');
    new PDFObject({ url: link }).embed("docContainer");
  };

  // set default template
  $scope.setModal('loading');
}


// function DocModalCtrl($scope) {
//   console.log('opened.');
// }