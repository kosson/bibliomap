var mongoose = require('mongoose');

var floatValue = function(coord){
  return parseFloat(coord);
};


var Countyro = new mongoose.Schema({
  type: {type: String, default: "Feature"},
  properties: {
    name: String,
    cod_siruta: Number,
    cod_judet: Number
  },
  geometry: {
    type: {type: String, default: "Polygon"},
    // coordinates: [{ array: [{array: [{array: [{type: Number, set: floatValue}]}]}]}]
  }
});

module.exports = mongoose.model('Countyro', Countyro);
