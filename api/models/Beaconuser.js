module.exports = {
  attributes: {
    iduser: {
      model: 'User'
    },
    idbeacon: {
      model: 'Beacon'
    },
    timestamp: {
      type: 'datetime',
      defaultsTo: function () {
        return new Date();
      }
    }
  },
  // Lifecycle Callbacks
  beforeCreate: function (values, next) {
    next();
  }
};
