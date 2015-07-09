Proximity.directive('ibeaconLog', ['ibeaconDelegate', function(ibeaconDelegate) {
  return {
    restrict: "E",
    scope: false,
    controller: function($scope) {
      ibeacon = ibeaconDelegate.beaconConfiguration;
      console.log(ibeacon.beaconRegion(ibeacon.uuid, ibeacon.identifier, ibeacon.minor, ibeacon.major));
    }
  }
}]);