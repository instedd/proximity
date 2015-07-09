Proximity.controller('ProximityController', ['ibeaconDelegate', '$ionicPlatform', function(ibeaconDelegate, $ionicPlatform){
  $ionicPlatform.ready(function() {
    var results = [];
    var rawResults = [];

    var doYourJob = function() {
      // bluetoothle.stopScan(function() {
      //   initializeBluetoothle();
      // }, function() {

      // }, null);

      
      bluetoothle.initialize(function() {
        bluetoothle.startScan(function(scanResult) {
          if (scanResult.status == "scanStarted") {
            setTimeout(function() {
              bluetoothle.stopScan(function() { }, function(error) { console.log("Couldn't stop scanning - " + JSON.stringify(error)) });
              console.log("Found: ", JSON.stringify(results));
              console.log("Counts: ", results.length, " pretty, ", rawResults.length, " raw" );
            }, 20000);
          } else if (scanResult.status == "scanResult") {
            var obj = {};
            obj.name = scanResult.name;
            obj.advertisement = scanResult.advertisement;
            obj.address = scanResult.address;
            obj.rssi = scanResult.rssi;
            scanResult.decoded = bluetoothle.encodedStringToBytes(scanResult.advertisement);
            scanResult.string = bluetoothle.bytesToEncodedString(scanResult.decoded)
            console.log(scanResult);
          }
          rawResults.push(scanResult);
        }, function(error) {
          console.log("Start scan failed - " + error.message);
          if(error.error = "startScan") {
            bluetoothle.stopScan(function() { 
              doYourJob();
            }, function(error) { console.log("Couldn't stop scanning - " + JSON.stringify(error)) });
          }
        }, null);
      }, function(error){
        console.log("Init failed :( - " + error.message);
      });
    }
    doYourJob();
  });
}]);