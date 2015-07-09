Proximity.factory('ibeaconDelegate', ['$ionicPlatform', function($ionicPlatform) {
  var ibeaconDelegate = {};
	ibeaconDelegate.bluetoothle = {};
  

	ibeaconDelegate.setBluetoothle = function(bluetoothle) {
		ibeaconDelegate.bluetoothle = bluetoothle;
	}
  ibeaconDelegate.getBluetoothle = function() {
    return ibeaconDelegate.bluetoothle;
  }
  ibeaconDelegate.initializeBluetoothle = function(initializeSuccess, initializeError, params) {
    ibeaconDelegate.bluetoothle.initialize(initializeSuccess, initializeError, params);
  }
  return ibeaconDelegate;
	// var getBeaconUuid = function() {
	// 	return angular.copy(beaconConfiguration.uuid);
	// };
	// var getBeaconIdentifier = function() {
	// 	return angular.copy(beaconConfiguration.identifier);
	// };
	// var getBeaconMinor = function() {
	// 	return angular.copy(beaconConfiguration.minor);
	// };
	// var getBeaconMajor = function() {
	// 	return angular.copy(beaconConfiguration.major);
	// };
	// var getActualBeacon  = function() {
	// 	return angular.copy(beaconConfiguration.actualBeacon);
	// };
	// var getLastBeacon  = function() {
	// 	return angular.copy(beaconConfiguration.lastBeacon);
	// };

}]);