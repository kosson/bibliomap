var mongoose = require('mongoose'),
    Georef = require('../models/feature'),
    Countyro = require('../models/countyro');

module.exports = function (app) {

  mongoose.set('debug', function(coll, method, query, doc) {
    console.log(coll + " " + method + " " + JSON.stringify(query) + " " + JSON.stringify(doc));
  });

  // constructie API

   // TOATE Coropleth-urile județelor
  app.get('/api/geodata/nuts3ro', function(req, res){
    Countyro.find({}, function(err, features){
      if(err) return done(err);
      res.json(features);
    });
  });

  // ADU CHOROPLETH-ul pentru un județ specificat
  app.get('/api/geodata/countyro/:county', function(req, res){
    if(req.params.county){
      Countyro.find({"properties.cod_judet": req.params.county}, function(err, features){
        if(err) return done(err);
        res.json(features);
      });
    };
  });

  // ADU TOATE geolocațiile pentru toate teritoriile
  app.get('/api/geodata/features', function(req, res){
    Georef.find({}, function(err, features){
      if(err) return done(err);
      res.json(features);
    });
  });

  // ADU O SINGURĂ BIBLIOTECĂ - atenție, ID-ul este cel generat la intrarea în bază
  app.get('/api/geodata/features/:id', function(req, res){
    Georef.findById({'_id': mongoose.Types.ObjectId(req.params.id)}, function(err, features){
      if(err) throw err;
      res.json(features);
    });
  });

  // ADU features dupa județul menționat - NUTS III
  app.get('/api/geodata/features/nuts3ro/:county', function(req, res){
    Georef.find({'properties.identifiers.code_county':req.params.county }, function(err, features){
      if(err) throw err;
      res.json(features);
    });
  });

  // ADU TOATE JUDEȚENELE
  app.get('/api/geodata/judetene', function(req, res){
    Georef.find({'properties.qualifiers.is_county': true}, function(err, features){
      if(err) throw err;
      res.json(features);
    });
  });

  // ADU după regiuni de dezvoltare - NUTS II
  app.get('/api/geodata/features/nuts2ro/:region', function(req, res){
    Georef.find({'properties.identifiers.code_zone':req.params.region }, function(err, features){
      if(err) throw err;
      res.json(features);
    });
  });
};
