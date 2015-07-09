// Ionic Starter App
var bluetoothle;
var Proximity = angular.module('Proximity', ['ionic'])

.run(function($ionicPlatform, ibeaconDelegate) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    ibeaconDelegate.setBluetoothle(bluetoothle);

  });
});
