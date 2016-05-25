(function (angular) {
    'use strict';

    var mapDataDirective = angular.module('impacApp.salesflow', []);

    mapDataDirective.directive('salesFlow', [ function () {
        return {
            restrict: 'A',
            replace: false,
            templateUrl: 'app/shared/salesflow/salestemplate.html',
            link: function (scope, element, attributes) {

                function updateMap() {
                  // this callback will be called asynchronously
                  // when the response is available
                  if (scope.salesPoints) {
                    var map = L.mapbox.map(attributes.id, 'mapbox.streets').setView([-25, 133], 4);
                    var geojson = {
                        type: 'FeatureCollection',
                        features: []
                    };

                    var markerlayer = L.mapbox.featureLayer().addTo(map);

                    for (var i = 0; i < scope.salesPoints.length; i++) {
                         var point = scope.salesPoints[i];
                         // Relative size based on order in the collection
                         var size = 'small';
                         if (i > scope.salesPoints.length * (1/3)){
                            size = 'medium';
                         }
                         if (i > scope.salesPoints.length * (2/3)){
                            size = 'large';
                         }
                         var feature = {
                           type: 'Feature',
                           properties: {
                              title: point[3],
                              description: 'Location: ' + point[2] + '<br/>Invoices: $' + point[4],
                              'marker-color': '#7ec9b1',
                              'marker-size': size,
                              'marker-symbol': 'bank',
                           },
                           geometry: {
                             type: 'Point',
                             coordinates: [point[1], point[0]]
                           }
                         };
                         geojson.features.push(feature);
                     }

                     // Set the data for the marker layer
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
                 scope.$watch('salesPoints', updateMap);
            }
        };
    }]);
}(angular));
