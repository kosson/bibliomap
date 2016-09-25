var mongoose = require('mongoose'),
    Georef = require('../models/feature'),
    Countyro = require('../models/countyro');

module.exports = function (io) {

  mongoose.set('debug', function(coll, method, query, doc) {
    console.log(coll + " " + method + " " + JSON.stringify(query) + " " + JSON.stringify(doc));
  });


  /**
   * VARIANTA SOCKETS
   */

  io.on('connect', function(socket){

    // Socket -- coropleth județe
    socket.on('county_ro_corplt', function(data){
      if(data === true){
        Countyro.find({}, function(err, features){
          if(err) throw err;
          socket.emit('county_ro_corplt', features);
        });
      } else if(data){
        Countyro.find({'cod_judet': data}, function(err, features){
          if(err) throw err;
          socket.emit('county_ro_corplt', features);
        });
      };
    });

    // Socket -- is_county_ro
    socket.on('is_county_ro', function(data){
      if(data === true){
        Georef.find({'properties.qualifiers.is_county': true}, function(err, features){
          if(err) throw err;
          socket.emit('is_county_ro', features);
        });
      } else {
        socket.emit('mesaje', `Ceva nu funcționează cu județele`);
      };
    });

    // Socket -- is_municipal_ro
    socket.on('is_municipal_ro', function(data){
      if(data === true){
        Georef.find({'properties.qualifiers.is_municipal': true}, function(err, features){
          if(err) throw err;
          socket.emit('is_municipal_ro', features);
        });
      } else if (data){ // typeof data === 'number'
        Georef.find({
          'properties.identifiers.code_county': data,
          'properties.qualifiers.is_municipal': true
        }, function(err, features){
          if(err) throw err;
          socket.emit('is_municipal_ro', features);
        });
      } else {
        socket.emit('mesaje', `Ceva nu funcționează cu municipiile`);
      };
    });

    // Socket -- is_city_ro
    socket.on('is_city_ro', function(data){
      if(data === true){
        Georef.find({'properties.qualifiers.is_city': true}, function(err, features){
          if(err) throw err;
          socket.emit('is_city_ro', features);
        });
      } else if (data){ // typeof data === 'number'
        Georef.find({
          'properties.identifiers.code_county': data,
          'properties.qualifiers.is_city': true
        }, function(err, features){
          if(err) throw err;
          socket.emit('is_city_ro', features);
        });
      } else {
        socket.emit('mesaje', `Ceva nu funcționează cu orașele`);
      };
    });

    // Socket -- is_university_ro
    socket.on('is_university_ro', function(data){
      if(data === true){
        Georef.find({'properties.qualifiers.is_university': true}, function(err, features){
          if(err) throw err;
          socket.emit('is_university_ro', features);
        });
      } else if (data){ // typeof data === 'number'
        Georef.find({
          'properties.identifiers.code_county': data,
          'properties.qualifiers.is_university': true
        }, function(err, features){
          if(err) throw err;
          socket.emit('is_university_ro', features);
        });
      } else {
        socket.emit('mesaje', `Ceva nu funcționează cu universitarele`);
      };
    });

    // Socket -- is_village_ro
    socket.on('is_village_ro', function(data){
      if(data === true){
        Georef.find({'properties.qualifiers.is_village': true}, function(err, features){
          if(err) throw err;
          socket.emit('is_village_ro', features);
        });
      } else if (data){ // typeof data === 'number'
        Georef.find({
          'properties.identifiers.code_county': data,
          'properties.qualifiers.is_village': true
        }, function(err, features){
          if(err) throw err;
          socket.emit('is_village_ro', features);
        });
      } else {
        socket.emit('mesaje', `Ceva nu funcționează cu bibliotecile comunale`);
      };
    });

    // Socket -- is_branch_ro
    socket.on('is_branch_ro', function(data){
      if(data === true){
        Georef.find({'properties.qualifiers.is_branch': true}, function(err, features){
          if(err) throw err;
          socket.emit('is_branch_ro', features);
        });
      } else if (data){ // typeof data === 'number'
        Georef.find({
          'properties.identifiers.code_county': data,
          'properties.qualifiers.is_branch': true
        }, function(err, features){
          if(err) throw err;
          socket.emit('is_branch_ro', features);
        });
      } else {
        socket.emit('mesaje', `Ceva nu funcționează cu filialele`);
      };
    });

    // Socket -- is_museum_ro
    socket.on('is_museum_ro', function(data){
      if(data === true){
        Georef.find({'properties.qualifiers.is_museum': true}, function(err, features){
          if(err) throw err;
          socket.emit('is_museum_ro', features);
        });
      } else if (data){ // typeof data === 'number'
        Georef.find({
          'properties.identifiers.code_county': data,
          'properties.qualifiers.is_museum': true
        }, function(err, features){
          if(err) throw err;
          socket.emit('is_museum_ro', features);
        });
      } else {
        socket.emit('mesaje', `Ceva nu funcționează cu bibliotecile muzeelor`);
      };
    });

    // Socket -- is_national_ro
    socket.on('is_national_ro', function(data){
      if(data === true){
        Georef.find({'properties.qualifiers.is_national': true}, function(err, features){
          if(err) throw err;
          socket.emit('is_national_ro', features);
        });
      } else if (data){ // typeof data === 'number'
        Georef.find({
          'properties.identifiers.code_county': data,
          'properties.qualifiers.is_national': true
        }, function(err, features){
          if(err) throw err;
          socket.emit('is_national_ro', features);
        });
      } else {
        socket.emit('mesaje', `Ceva nu funcționează cu bibliotecile naționale`);
      };
    });

    // Socket -- is_school_ro
    socket.on('is_school_ro', function(data){
      if(data === true){
        Georef.find({'properties.qualifiers.is_school': true}, function(err, features){
          if(err) throw err;
          socket.emit('is_school_ro', features);
        });
      } else if (data){ // typeof data === 'number'
        Georef.find({
          'properties.identifiers.code_county': data,
          'properties.qualifiers.is_school': true
        }, function(err, features){
          if(err) throw err;
          socket.emit('is_school_ro', features);
        });
      } else {
        socket.emit('mesaje', `Ceva nu funcționează cu bibliotecile școlare`);
      };
    });

    // Socket -- is_part_of_ro
    socket.on('is_part_of_ro', function(data){
      if(data === true){
        Georef.find({'properties.qualifiers.is_part_of': true}, function(err, features){
          if(err) throw err;
          socket.emit('is_part_of_ro', features);
        });
      } else if (data){ // typeof data === 'number'
        Georef.find({
          'properties.identifiers.code_county': data,
          'properties.qualifiers.is_part_of': true
        }, function(err, features){
          if(err) throw err;
          socket.emit('is_part_of_ro', features);
        });
      } else {
        socket.emit('mesaje', `Ceva nu funcționează cu bibliotecile părți ale altor instituții`);
      };
    });

  });

// închidere module.exports
};
