module.exports = {
  attributes: {
    id: {
      type: 'string',
      primaryKey: true
    },
    description: 'string',
    lat: {
      type: 'string'
    },
    lng: {
      type: 'string'
    },
    beaconusers: {
      collection: 'Beaconuser',
      via: 'idbeacon'
    }
  }
};
