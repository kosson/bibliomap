var mongoose = require('mongoose'),
    Georef = require('../models/feature'),
    Countyro = require('../models/countyro');

module.exports = function (io) {

  mongoose.set('debug', function(coll, method, query, doc) {
    console.log(coll + " " + method + " " + JSON.stringify(query) + " " + JSON.stringify(doc));
  });


  /**
   * VARIANTA SOCKETS PENTRU CAPITALELE DE JUDEȚ
   */

  io.on('connect', function(socket){

    socket.on('is_county_ro', function(data){

      console.log(data);

      if(data === true){
        Georef.find({'properties.qualifiers.is_county': true}, function(err, features){
          if(err) throw err;
          socket.emit('is_county_ro', features);
        });
      } else {
        socket.emit('mesaje', `Ceva nu funcționează cu județele`);
      };

    });
  });




};
