/**
 * BeaconController
 *
 * @description :: Server-side logic for managing beacons
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var MSG_ERRO_PARAM = "Please, insert all parameters"
module.exports = {

  createbeacon: function (req, res) {
    var r = {};
    try {
      if (req.param('id') === undefined) {
        r.status = false;
        r.msg = MSG_ERRO_PARAM;
        return res.json(r);
      }
      Beacon.create({
        id: req.param('id')
      }).exec(
        function (err, user) {

          if (err) {
            r.status = false;
            r.msg = err;
          } else {
            r.status = true;
            r.data = user;
          }
          return res.json(r);
        });
    } catch (e) {
      r.status = false;
      r.msg = e.message;
      return res.json(r, 500);
    }
  },

  createuser: function (req, res) {
    var r = {};
    try {
      if (req.param('number') === undefined) {
        r.status = false;
        r.msg = MSG_ERRO_PARAM;
        return res.json(r);
      }
      User.create({
        id: req.param('number')
      }).exec(
        function (err, user) {
          var r = {};
          if (err) {
            r.status = false;
            r.msg = err;
          } else {
            r.status = true;
            r.data = user;
          }
          return res.json(r);
        });
    } catch (e) {
      r.status = false;
      r.msg = e.message;
      return res.json(r, 500);
    }
  },

  receivebeacon: function (req, res) {
    var r = {};
    try {

      if (req.param('iduser') === undefined || req.param('idbeacon') === undefined) {
        r.status = false;
        r.msg = MSG_ERRO_PARAM;
        return res.json(r);
      }

      Beaconuser.create({
        iduser: req.param('iduser'),
        idbeacon: req.param('idbeacon')
      }).exec(
        function (err, user) {
          var r = {};
          if (err) {
            r.status = false;
            r.msg = err;
          } else {
            r.status = true;
            r.data = user;
          }
          return res.json(r);
        });
    } catch (e) {
      r.status = false;
      r.msg = e.message;
      return res.json(r, 500);
    }
  },

  userstatus: function (req, res) {
    var r = {};
    try {
      if (req.param('iduser') === undefined || req.param('status') === undefined) {
        r.status = false;
        r.msg = MSG_ERRO_PARAM;
        return res.json(r);
      }

      Userstatus.create({
        iduser: req.param('iduser'),
        status: req.param('status')
      }).exec(
        function (err, user) {
          var r = {};
          if (err) {
            r.status = false;
            r.msg = err;
          } else {
            r.status = true;
            r.data = user;
          }
          return res.json(r);
        });
    } catch (e) {
      r.status = false;
      r.msg = e.message;
      return res.json(r, 500);
    }
  },
  notifyuser: function (req, res) {

  },
  users: function (req, res) {

    var r = {};
    try {

      User.find().exec(function (err, r) {
        return res.json(r);
      });
    } catch (e) {
      r.status = false;
      r.msg = e.message;
      return res.json(r, 500);
    }
  },
  usersbeacons: function (req, res) {
    var r = {};
    try {
      User.find().populate('beaconusers').exec(function (err, r) {
        return res.json(r);
      });
    } catch (e) {
      r.status = false;
      r.msg = e.message;
      return res.json(r, 500);
    }
  },
  userstatus: function (req, res) {
    var r = {};
    try {
      User.find().populate('userstatus').exec(function (err, r) {
        return res.json(r);
      });
    } catch (e) {
      r.status = false;
      r.msg = e.message;
      return res.json(r, 500);
    }
  },
  beacons: function (req, res) {
    var r = {};
    try {
      Beacon.find().exec(function (err, r) {
        return res.json(r);
      });
    } catch (e) {
      r.status = false;
      r.msg = e.message;
      return res.json(r, 500);
    }
  },
  validationFields: function () {
    var r = {};
    if (r.msg === undefined) {
      r.msg = []
    }
    for (s in arguments) {
      console.log(s, arguments[s]);
      if (arguments[s] === undefined) {
        r.status = false;
        r.msg.push("");
      }
    }
  },
  /**
     * `UserController.create()`
     */
     create: function (req, res) {
        var client = req.body.client || 'api';
        delete req.body.client;
        var beacon = req.body;
        Beacon.create(beacon).exec(function createCB(err, b) {
            if (err) {
                return flash500(req, res, {
                    error: true,
                    message: 'There was an error processing your request: \n' + err
                });
            } else {
                return res.clientAwareResponse(client, '/admin/beacons', {
                    error: false,
                    status: true,
                    message: "Beacon Created",
                    beacon: b
                });
            }
        });
    },
        /**
     * `UserController.delete()`
     */
     delete: function (req, res) {
        var beacon_id = req.param("beacon_id");
        var client = req.param("client") || 'dashboard';
        Beacon.destroy({
            id: beacon_id
        }).exec(function (err) {
            if (err) {
                return flash500(req, res, {
                    error: true,
                    message: 'There was an error processing your request: \n' + err
                });
            } else {
                return res.clientAwareResponse(client, '/admin/beacons', {status: true, message: "Beacon Deleted"});
            }
        });
    },
    /**
     * `UserController.index()`
     */
     index: function (req, res) {
        App.find({}).exec(function (err, apps) {
            if (err) {
                return flash500({error: true, message: 'There was an error processing your request: \n' + err});
            }
            Beacon.find({}).exec(function (err, beacons) {
                if (err) return flash500(req, res, {
                    error: true,
                    message: 'There was an error processing your request: \n' + err
                });
                    return res.view('beacon/beacon_index', {
                        beacons: beacons,
                        apps: apps,
                        error: false,
                        page: 'beacon_index'
                    });
                });
        });
    },
};
