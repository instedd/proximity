module.exports = {
  attributes: {
    timestamp: {
      type: 'datetime',
      defaultsTo: function () {
        return new Date();
      }
    },
    iduser: {
      model: 'User'
    }
  }
}
