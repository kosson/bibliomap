var mongoose = require('mongoose');

var floatValue = function(coord){
  return parseFloat(coord);
};

var geoschema = new mongoose.Schema({
  geometry: {
    coordinates: [{type: Number, set: floatValue}],
    type: {type: String, default: "Point"}
  },
  properties: {
    name: [
      {
        date: { type: Date, default: Date.now },
        official_name: {type: String, trim: true},
        name_mark: {type: String},
        _id: false
      }
    ],
    qualifiers: {
      is_branch: Boolean,
      is_city: Boolean,
      is_county: Boolean,
      is_municipal: Boolean,
      is_museum: Boolean,
      is_national: Boolean,
      is_part_of: Boolean,
      is_school: Boolean,
      is_university: Boolean,
      is_village: Boolean
    },
    address: [
      {
        date: { type: Date, default: Date.now },
        loc: {type: String},
        street: {type: String},
        postal_code: {type: String},
        obs: {type: String},
        _id: false
      }
    ],
    identifiers: {
      code_zone: Number,
      code_county: Number,
      code_siruta: Number,
      LMI: String,
      _id: false
    },
    services: {
      opening_hours: String,
      webpage_url: String,
      catalog: {
        url: String,
        query_url: String,
        api_url: String,
        _id: false
      },
      repository: [
        {
          url: String,
          query_url: String,
          api_url: String,
          _id: false
        }
      ],
      syndication_feeds: [String],
      social: {
        wordpress: [String],
        blogspot: [String],
        facebook: [String],
        youtube: [String],
        instagram: [String],
        twitter: [String],
        _id: false
      }
    },
    budget: [{year: String, amount: String, _id: false}],
    connectors: [{connector: String, _id: false}]
  },
  type: {type: String, default: "Feature"}
});

module.exports = mongoose.model('Georef', geoschema);
