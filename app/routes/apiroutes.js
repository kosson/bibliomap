var mongoose = require('mongoose'),
    Georef = require('../models/feature'),
    Countyro = require('../models/countyro');

module.exports = function (app) {

  mongoose.set('debug', function(coll, method, query, doc) {
    console.log(coll + " " + method + " " + JSON.stringify(query) + " " + JSON.stringify(doc));
  });

  // constructie API pentru ROMANIA

  // ADU TOATE geolocațiile pentru toate teritoriile
  app.get('/api/geodata/features', function(req, res){
    Georef.find({}, function(err, features){
      if(err) return done(err);
      res.json(features);
    });
  });

  // TODO: Fă o rută și modifica datele pentru a coda georef-urile și după țară.

  // ADU O SINGURĂ BIBLIOTECĂ - atenție, ID-ul este cel generat la intrarea în bază
  app.get('/api/geodata/features/:id', function(req, res){
    Georef.findById({'_id': mongoose.Types.ObjectId(req.params.id)}, function(err, features){
      if(err) throw err;
      res.json(features);
    });
  });


/**
 * ADU JUDEȚE - ROMANIA
 */

   // TOATE Coropleth-urile județelor
  app.get('/api/geodata/nuts3ro', function(req, res){
    Countyro.find({}, function(err, features){
      if(err) return done(err);
      res.json(features);
    });
  });

  // CHOROPLETH-ul pentru un județ specificat
  app.get('/api/geodata/countyro/:county', function(req, res){
    if(req.params.county){
      Countyro.find({"properties.cod_judet": req.params.county}, function(err, features){
        if(err) return done(err);
        res.json(features);
      });
    };
  });

  // ADU FEATURES PENTRU CAPITALELE DE JUDEȚ
  app.get('/api/geodata/features/romania/capitals', function(req, res){
    Georef.find({'properties.qualifiers.is_county': true}, function(err, features){
      if(err) throw err;
      res.json(features);
    });
  });

  /**
   * ADU MUNICIPIILE - ROMANIA
   */
  // adu ##TOATE## bibliotecile municipale din țară
  app.get('/api/geodata/features/romania/municipal', function(req, res){
   Georef.find({'properties.qualifiers.is_municipal': true}, function(err, features){
     if(err) throw err;
     res.json(features);
   });
  });
  // aduc municipiile pentru un ##JUDEȚ SPECIFICAT##
  app.get('/api/geodata/features/romania/municipal/:county', function(req, res){
   Georef.find({
     'properties.identifiers.code_county':req.params.county,
     'properties.qualifiers.is_municipal': true
   }, function(err, features){
     if(err) throw err;
     res.json(features);
   });
  });
  // aduc municipiile pentru o ##REGIUNE DE DEZVOLTARE##
  app.get('/api/geodata/features/romania/municipal/region/:region', function(req, res){
   Georef.find({
     'properties.identifiers.code_zone':req.params.county,
     'properties.qualifiers.is_municipal': true
   }, function(err, features){
     if(err) throw err;
     res.json(features);
   });
  });

  /**
   * ADU ORAȘELE - ROMANIA
   */
   // adu ##TOATE## bibliotecile orășeneștile din țară
   app.get('/api/geodata/features/romania/city', function(req, res){
    Georef.find({'properties.qualifiers.is_city': true}, function(err, features){
      if(err) throw err;
      res.json(features);
    });
   });
   // aduc orășeneștile pentru un ##JUDEȚ SPECIFICAT##
   app.get('/api/geodata/features/romania/city/:county', function(req, res){
    Georef.find({
      'properties.identifiers.code_county':req.params.county,
      'properties.qualifiers.is_city': true
    }, function(err, features){
      if(err) throw err;
      res.json(features);
    });
   });
   // aduc municipiile pentru o ##REGIUNE DE DEZVOLTARE##
   app.get('/api/geodata/features/romania/city/region/:region', function(req, res){
    Georef.find({
      'properties.identifiers.code_zone':req.params.county,
      'properties.qualifiers.is_city': true
    }, function(err, features){
      if(err) throw err;
      res.json(features);
    });
   });

   /**
    * ADU UNIVERSITARELE - ROMANIA
    */
   // adu ##TOATE## bibliotecile universitare din țară
   app.get('/api/geodata/features/romania/university', function(req, res){
    Georef.find({'properties.qualifiers.is_university': true}, function(err, features){
      if(err) throw err;
      res.json(features);
    });
   });
   // aduc universitățile pentru un ##JUDEȚ SPECIFICAT##
   app.get('/api/geodata/features/romania/university/:county', function(req, res){
    Georef.find({
      'properties.identifiers.code_county':req.params.county,
      'properties.qualifiers.is_university': true
    }, function(err, features){
      if(err) throw err;
      res.json(features);
    });
   });
   // aduc universitățile pentru o ##REGIUNE DE DEZVOLTARE##
   app.get('/api/geodata/features/romania/university/region/:region', function(req, res){
    Georef.find({
      'properties.identifiers.code_zone':req.params.county,
      'properties.qualifiers.is_university': true
    }, function(err, features){
      if(err) throw err;
      res.json(features);
    });
   });

   /**
    * ADU SĂTEȘTILE - ROMANIA
    */
   // adu ##TOATE## bibliotecile sătești și comunale din țară
   app.get('/api/geodata/features/romania/village', function(req, res){
    Georef.find({'properties.qualifiers.is_village': true}, function(err, features){
      if(err) throw err;
      res.json(features);
    });
   });
   // aduc sătești și comunale pentru un ##JUDEȚ SPECIFICAT##
   app.get('/api/geodata/features/romania/village/:county', function(req, res){
    Georef.find({
      'properties.identifiers.code_county':req.params.county,
      'properties.qualifiers.is_village': true
    }, function(err, features){
      if(err) throw err;
      res.json(features);
    });
   });
   // aduc sătești și comunale pentru o ##REGIUNE DE DEZVOLTARE##
   app.get('/api/geodata/features/romania/village/region/:region', function(req, res){
    Georef.find({
      'properties.identifiers.code_zone':req.params.county,
      'properties.qualifiers.is_village': true
    }, function(err, features){
      if(err) throw err;
      res.json(features);
    });
   });

   /**
    * ADU FILIALELE - ROMANIA
    */
   // adu ##TOATE## bibliotecile filiale din țară
   app.get('/api/geodata/features/romania/branch', function(req, res){
    Georef.find({'properties.qualifiers.is_branch': true}, function(err, features){
      if(err) throw err;
      res.json(features);
    });
   });
   // aduc filiale pentru un ##JUDEȚ SPECIFICAT##
   app.get('/api/geodata/features/romania/branch/:county', function(req, res){
    Georef.find({
      'properties.identifiers.code_county':req.params.county,
      'properties.qualifiers.is_branch': true
    }, function(err, features){
      if(err) throw err;
      res.json(features);
    });
   });
   // aduc filiale pentru o ##REGIUNE DE DEZVOLTARE##
   app.get('/api/geodata/features/romania/branch/region/:region', function(req, res){
    Georef.find({
      'properties.identifiers.code_zone':req.params.county,
      'properties.qualifiers.is_branch': true
    }, function(err, features){
      if(err) throw err;
      res.json(features);
    });
   });

   /**
    * ADU MUZEELE - ROMANIA
    */
   // adu ##TOATE## bibliotecile muzeale din țară
   app.get('/api/geodata/features/romania/museum', function(req, res){
    Georef.find({'properties.qualifiers.is_museum': true}, function(err, features){
      if(err) throw err;
      res.json(features);
    });
   });
   // aduc muzeale pentru un ##JUDEȚ SPECIFICAT##
   app.get('/api/geodata/features/romania/museum/:county', function(req, res){
    Georef.find({
      'properties.identifiers.code_county':req.params.county,
      'properties.qualifiers.is_museum': true
    }, function(err, features){
      if(err) throw err;
      res.json(features);
    });
   });
   // aduc muzeale pentru o ##REGIUNE DE DEZVOLTARE##
   app.get('/api/geodata/features/romania/museum/region/:region', function(req, res){
    Georef.find({
      'properties.identifiers.code_zone':req.params.county,
      'properties.qualifiers.is_museum': true
    }, function(err, features){
      if(err) throw err;
      res.json(features);
    });
   });

   /**
    * ADU BIBLIOTECILE DE NIVEL NAȚIONAL - ROMANIA
    */
   // adu ##TOATE## bibliotecile naționale din țară
   app.get('/api/geodata/features/romania/national', function(req, res){
    Georef.find({'properties.qualifiers.is_national': true}, function(err, features){
      if(err) throw err;
      res.json(features);
    });
   });
   // aduc naționalele pentru un ##JUDEȚ SPECIFICAT##
   app.get('/api/geodata/features/romania/national/:county', function(req, res){
    Georef.find({
      'properties.identifiers.code_county':req.params.county,
      'properties.qualifiers.is_national': true
    }, function(err, features){
      if(err) throw err;
      res.json(features);
    });
   });
   // aduc naționalele pentru o ##REGIUNE DE DEZVOLTARE##
   app.get('/api/geodata/features/romania/national/region/:region', function(req, res){
    Georef.find({
      'properties.identifiers.code_zone':req.params.county,
      'properties.qualifiers.is_national': true
    }, function(err, features){
      if(err) throw err;
      res.json(features);
    });
   });

   /**
    * ADU BIBLIOTECILE ȘCOLARE - ROMANIA
    */
   // adu ##TOATE## bibliotecile școlarele din țară
   app.get('/api/geodata/features/romania/school', function(req, res){
    Georef.find({'properties.qualifiers.is_school': true}, function(err, features){
      if(err) throw err;
      res.json(features);
    });
   });
   // aduc școlarele pentru un ##JUDEȚ SPECIFICAT##
   app.get('/api/geodata/features/romania/school/:county', function(req, res){
    Georef.find({
      'properties.identifiers.code_county':req.params.county,
      'properties.qualifiers.is_school': true
    }, function(err, features){
      if(err) throw err;
      res.json(features);
    });
   });
   // aduc scolarele pentru o ##REGIUNE DE DEZVOLTARE##
   app.get('/api/geodata/features/romania/school/region/:region', function(req, res){
    Georef.find({
      'properties.identifiers.code_zone':req.params.county,
      'properties.qualifiers.is_school': true
    }, function(err, features){
      if(err) throw err;
      res.json(features);
    });
   });

   /**
    * ADU BIBLIOTECILE parte a altora - ROMANIA
    */
   // adu ##TOATE## bibliotecile părți din țară
   app.get('/api/geodata/features/romania/partof', function(req, res){
    Georef.find({'properties.qualifiers.is_part_of': true}, function(err, features){
      if(err) throw err;
      res.json(features);
    });
   });
   // aduc părțile pentru un ##JUDEȚ SPECIFICAT##
   app.get('/api/geodata/features/romania/partof/:county', function(req, res){
    Georef.find({
      'properties.identifiers.code_county':req.params.county,
      'properties.qualifiers.is_part_of': true
    }, function(err, features){
      if(err) throw err;
      res.json(features);
    });
   });
   // aduc părțile pentru o ##REGIUNE DE DEZVOLTARE##
   app.get('/api/geodata/features/romania/partof/region/:region', function(req, res){
    Georef.find({
      'properties.identifiers.code_zone':req.params.county,
      'properties.qualifiers.is_part_of': true
    }, function(err, features){
      if(err) throw err;
      res.json(features);
    });
   });

/**
 * OPERAȚIUNI PE REGIUNI
 */

  // ADU după regiuni de dezvoltare - NUTS II
  app.get('/api/geodata/features/nuts2ro/:region', function(req, res){
    Georef.find({'properties.identifiers.code_zone':req.params.region }, function(err, features){
      if(err) throw err;
      res.json(features);
    });
  });

};
