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
        zoom: "=zoom",
        gushId: "=gushid"
      },
      template: '<div class="map"></div>',

      link: function (scope, element, attrs, ctrl) {

        var $el = element[0],
            map = new L.Map($el),

            tile_url = 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png',
            gushim_url = 'data/gushim.min.json',
            default_center_coords = [31.765, 35.17],
            default_zoom = 13,
            max_zoom = 18,

            map_center = scope.center || default_center_coords;
            // map_latlng = new L.LatLng(parseFloat(map_center[0]), parseFloat(map_center[1]));
            // console.log(window.x = map_center);

        L.tileLayer(tile_url, { maxZoom: max_zoom }).addTo(map);
        map_center = scope.center || default_center_coords;

        // default center of the map
        map.setView(map_center, default_zoom);

        // add 'gushim' layer
        $http.get(gushim_url).success(function(data) {
            var onEachFeature = function(feature, layer) {
                    // layer.bindPopup(feature.properties.Name + " גוש ");
                    layer.on({
                        'mouseover': highlightFeature,
                        'mouseout': resetHighlight,
                        'click': function() {
                            var coords = feature.geometry.coordinates[0][0];
                            location.hash = "#/gush/" + feature.properties.Name + "/"+coords[1]+","+coords[0];
                        }
                    });
                },

                style = function(feature) {
                    return {
                        "color": (feature.properties.Name == scope.gushId) ? "blue" : "#777",
                        "weight": 1,
                        "opacity": 0.9
                    };
                },

                highlightFeature = function(e) {
                    var layer = e.target;
                    layer.setStyle({ opacity: 0, color: "red" });
                },

                resetHighlight = function(e) {
                    geojson.resetStyle(e.target);
                },

                geojson = L.geoJson(data, {
                    onEachFeature: onEachFeature,
                    style: style
                }).addTo(map);
        });

      }

    };
  });

}());