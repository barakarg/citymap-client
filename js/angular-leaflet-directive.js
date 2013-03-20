(function () {

  var leafletDirective = angular.module("leaflet-directive", []);

  leafletDirective.directive("leaflet", function ($http, $log) {
    return {
      restrict: "E",
      replace: true,
      transclude: true,
      scope: {
        center: "=center",
        marker: "=marker",
        message: "=message",
        zoom: "=zoom"
      },
      template: '<div class="map"></div>',

      link: function (scope, element, attrs, ctrl) {

        var $el = element[0],
            map = new L.Map($el),

            tile_url = 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png',
            gushim_url = 'data/gushim.min.json',
            default_center_coords = [31.765, 35.17],
            default_zoom = 13,
            max_zoom = 18;

        L.tileLayer(tile_url, { maxZoom: max_zoom }).addTo(map);
        map_center = scope.center || default_center_coords;

        // default center of the map
        map.setView(map_center, default_zoom);

        // add 'gushim' layer
        $http.get(gushim_url).success(function(data) {
            L.geoJson(data,
                {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup(feature.properties.Name + " גוש ");
                        layer.on({
                            'mouseover': function() {
                                this.setStyle({ opacity: 0, color: "red" });
                            },
                            'mouseout': function() {
                                this.setStyle({ opacity: 0.95, color: "#777" });
                            },
                            'click': function() {
                                // $("#info").html("עוד מעט..."); 
                                var coords = feature.geometry.coordinates[0][0];
                                location.hash = "#/gush/" + feature.properties.Name + "/"+coords[0]+","+coords[1];
                                // // get_gush(feature.properties.Name);
                            }
                        });
                    },
                    style : {
                        "color": "#777",
                        "weight": 1,
                        "opacity": 0.9
                    }
                }
            ).addTo(map);
        });

      }

    };
  });

}());