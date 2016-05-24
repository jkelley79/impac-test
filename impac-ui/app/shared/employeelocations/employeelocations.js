(function (angular) {
    'use strict';

    var mapDataDirective = angular.module('impacApp.employeelocations', []);

    mapDataDirective.directive('employeeLocations', [ function () {
        return {
            restrict: 'A',
            replace: false,
            link: function (scope, element, attributes) {

                function updateMap() {
                  // this callback will be called asynchronously
                  // when the response is available
                  if (scope.employeePoints) {
                    var map = L.mapbox.map(attributes.id, 'mapbox.outdoors').setView([-25, 133], 4);
                    var geojson = {
                        type: 'FeatureCollection',
                        features: []
                    };
                    var markerlayer = L.mapbox.featureLayer().addTo(map);

                    for (var i = 0; i < scope.employeePoints.length; i++) {
                         var point = scope.employeePoints[i];

                         // Relative size based on order in the collection
                         var size = 'small';
                         if (i > scope.employeePoints.length * (1/3)){
                            size = 'medium';
                         }
                         if (i > scope.employeePoints.length * (2/3)){
                            size = 'large';
                         }

                         // Populate the marker data and append it to the collection
                         var feature = {
                           type: 'Feature',
                           properties: {
                              title: point[2],
                              description: 'Total employees: ' + point[3],
                              'marker-color': '#7ec9b1',
                              'marker-size': size,
                              'marker-symbol': 'prison',
                           },
                           geometry: {
                             type: 'Point',
                             coordinates: [point[1], point[0]]
                           }
                         };
                         geojson.features.push(feature);
                     }
                     // Set the marker data on the layer
                     markerlayer.setGeoJSON(geojson);

                     // Events to handle when to show the popover or hide it
                     markerlayer.on('mouseover', function(e) {
                         e.layer.openPopup();
                     });
                     markerlayer.on('mouseout', function(e) {
                         e.layer.closePopup();
                     });
                   }
                 };
                 // Watch the parent scope salesPoints to update the map
                 scope.$watch('employeePoints', updateMap);
            }
        };
    }]);
}(angular));
