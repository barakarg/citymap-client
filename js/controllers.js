'use strict';

/* Controllers */

function MapOverviewCtrl($scope, $http) {
  $(window).on('resize , load', function(){
    $('#overviewMap').height($(window).height()-40);
  });
}

function GushCtrl($scope, $routeParams) {
  // $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
  //   $scope.mainImageUrl = phone.images[0];
  // });

  // $scope.setImage = function(imageUrl) {
  //   $scope.mainImageUrl = imageUrl;
  // }
}
