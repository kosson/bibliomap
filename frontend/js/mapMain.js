// CREARE LAYERE
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    osm = new L.TileLayer(osmUrl, {
      minZoom: 6,
      attribution: osmAttrib,
      detectRetina: true
    }),
    googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
    }),
    googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
    })
    ;
// var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
//     maxZoom: 20,
//     subdomains:['mt0','mt1','mt2','mt3']
// });
// var googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
//     maxZoom: 20,
//     subdomains:['mt0','mt1','mt2','mt3']
// });
// Note the difference in the "lyrs" parameter in the URL:
// Hybrid: s,h; Satellite: s; Streets: m; Terrain: p;

var liblayers = new L.LayerGroup(), // grup de markeri din straturile generate programatic
    overlayMaps = {
      'Biblioteci românești' : liblayers
    },
    baseMaps = {
      'Google Streets': googleStreets,
      // 'Google Hybrid': googleHybrid,
      // 'Google Terain': googleTerrain,
      'Google Sat': googleSat,
      'Open Street Maps': osm
    },
    map = L.map('map', {  // adauga layerele de initierea hartii
        center: [45.924, 25.466],
        zoom: 7,
        layers: [osm, liblayers, googleStreets]
    });

// adaugă la hartă layerele de bază și overlay-urile
L.control.layers(baseMaps).addTo(map);
// poți adăuga și overlay-urile la switching.

// TODO: un mecanism care să preia selecțiile făcute în pagină și să le transforme în date afișate

/**
 * TABULEAZA DATELE
 */

// funcție cu rolul de a transforma conținutul unui array într-un form
// Cazuri de array: array de valori, array de obiecte, array de array
var objDeTest = {
    "_id" : "56dabb268fcd207c7557e7a5",
    "type" : "Feature",
    "properties" : {
        "connectors" : [
            {
                "connector" : ""
            }
        ],
        "budget" : [
            {
                "year" : "2011",
                "amount" : "12322.45"
            }
        ],
        "services" : {
            "opening_hours" : "",
            "webpage_url" : "http://www.bjastrasibiu.ro",
            "social" : {
                "twitter" : [
                    ""
                ],
                "instagram" : [
                    ""
                ],
                "youtube" : [
                    ""
                ],
                "facebook" : [
                    ""
                ],
                "blogspot" : [
                    ""
                ],
                "wordpress" : [
                    ""
                ]
            },
            "syndication_feeds" : [
                {
                    "name_feed" : "",
                    "url_feed" : "",
                    "_id" : "56dabb268fcd207c7557e7a6"
                }
            ],
            "repository" : [
                {
                    "name" : "",
                    "url" : "",
                    "query_url" : "",
                    "api_url" : ""
                }
            ],
            "catalog" : {
                "url" : "http://www.bjastrasibiu.ro/Liberty3/gateway/gateway.exe?application=Liberty3&amp;displayform=opac/main",
                "query_url" : "",
                "api_url" : ""
            }
        },
        "identifiers" : {
            "code_zone" : 7,
            "code_county" : 32,
            "code_siruta" : 143450,
            "LMI" : ""
        },
        "address" : [
            {
                "loc" : "Sibiu",
                "street" : "George Barițiu, Nr. 5-7",
                "postal_code" : "",
                "obs" : "",
                "date" : "2016-03-05T10:55:34.175Z"
            }
        ],
        "qualifiers" : {
            "is_branch" : false,
            "is_city" : false,
            "is_county" : true,
            "is_municipal" : false,
            "is_museum" : false,
            "is_national" : false,
            "is_school" : false,
            "is_university" : false,
            "is_village" : false
        },
        "name" : [
            {
                "official_name" : "Biblioteca Județeană „Astra”",
                "name_mark" : "Astra",
                "date" : "2016-03-05T10:55:34.175Z"
            }
        ]
    },
    "geometry" : {
        "type" : "Point",
        "coordinates" : [
            24.14625,
            45.793396
        ]
    },
    "__v" : 0
};
var arraySimpluDeTest = [1, 'altceva', true, false, [1, 20, true, ['din interior', false]]];

/**
 * arrToForm o funcție care generează input-uri și checkbox-uri pentru boolean
 * @param  {array} arr  array cu mix de valori
 * @param  {string} name un string care va constitui prefixul unei valori care va sta la name-uri
 */
function arrToForm(arr){

  var targetInDOM = document.getElementById('inputDataTable'),
      frm         = document.createElement('form');

  for(var i = 0, y = arr.length; i < y; i++){

    if(typeof arr[i] === 'number'){
      var fInputTxt   = document.createElement('input');
      fInputTxt.type  = 'text';
      fInputTxt.id    = arr[i];                 // pune id
      fInputTxt.setAttribute('name', arr[i]);   // pune name
      fInputTxt.setAttribute('value', arr[i]);  // pune value
      // fInputTxt.className = 'recDynInputTxt';
      frm.appendChild(fInputTxt);
      targetInDOM.appendChild(frm);
    }

    if(typeof arr[i] === 'string'){
      var fInputTxt   = document.createElement('input');
      fInputTxt.type  = 'text';
      fInputTxt.id    = arr[i];                    // pune id
      fInputTxt.setAttribute('name', arr[i]);   // pune name
      fInputTxt.setAttribute('value', arr[i]);  // pune value
      // fInputTxt.className = 'recDynInputTxt';
      frm.appendChild(fInputTxt);
      targetInDOM.appendChild(frm);
    }

    if(arr[i] === true){
      var fInputChkBx  = document.createElement('input');
      fInputChkBx.type = 'checkbox'
      fInputChkBx.setAttribute('checked', 'checked');
      fInputChkBx.setAttribute('value', 'true');
      // fInputTxt.className = 'recDynInputTxt';
      frm.appendChild(fInputChkBx);
      targetInDOM.appendChild(frm);
    }

    if(arr[i] === false){
      var fInputChkBx  = document.createElement('input');
      fInputChkBx.type = 'checkbox';
      fInputChkBx.setAttribute('value', 'false');
      frm.appendChild(fInputChkBx);
      targetInDOM.appendChild(frm);
    }

    if(arr[i] === undefined){
      var fInputChkBx  = document.createElement('input');
      fInputChkBx.type = 'text';
      fInputChkBx.setAttribute('value', 'false');
      frm.appendChild(fInputTxt);
      targetInDOM.appendChild(frm);
    }

    if(Array.isArray(arr[i])){
      arrToForm(arr[i]);
    }

    //TODO: introdu si cazul in care membrul este un obiect
    if(typeof arr[i] === 'object'){
      objToForm((arr[i]));
    }
  };
};

function objToForm(obj){

  /**
   * Funcția generează câmpuri de formular pentru fiecare string sau nr identificat de
   * o proprietate dintr-un JSON. Pentru fiecare dintre acestea face un fildset în care
   * este pus numele proprietății și un câmp input type='text' pentru valoare. Acest input
   * are drept id chiar valoarea string în sine.
   * Funcția este folosită ca bloc constructiv pentru transformarea GeoJSON-urilor într-o
   * formă tabelară care pentru fiecare bloc de informație este generat un formular ce va fi
   * ușor de folosit pentru modificarea bazei de date.
   * @param  {string} val   valoarea string sau numar
   * @param  {string} nProp este stringul care numește proprietatea din obiect afișată
   */
  function valToField(val, nProp){
    var fInputTxt   = document.createElement('input'),
        fLabel      = document.createElement('label'),
        fLabelTxt   = document.createTextNode(val),
        fFieldset   = document.createElement('fieldset'),
        fLegend     = document.createElement('legend'),
        fLegendTxt  = document.createTextNode(nProp);

    fLabel.setAttribute('for', val);
    fLabel.appendChild(fLabelTxt);

    fInputTxt.type  = 'text';
    fInputTxt.id    = val;                 // pune id
    fInputTxt.setAttribute('name', val);   // pune name
    fInputTxt.setAttribute('value', val);  // pune value
    fInputTxt.className = 'dynInputsFrm';

    // bagi in fFieldset --> fInputTxt
    fLegend.appendChild(fLegendTxt);
    fFieldset.appendChild(fLegend);
    fFieldset.appendChild(fLabel);
    fFieldset.appendChild(fInputTxt);

    frm.appendChild(fFieldset);
    targetInDOM.appendChild(frm);
  };

  function propToFieldset(property, name){
    var fInputTxt   = document.createElement('input'),
        fFieldset   = document.createElement('fieldset'),
        fLegend     = document.createElement('legend'),
        fLegendTxt  = document.createTextNode(name);

    fInputTxt.type  = 'text';
    fInputTxt.id    = property                  // pune id
    fInputTxt.setAttribute('name', property);   // pune name
    fInputTxt.setAttribute('value', property);  // pune value
    fInputTxt.className = 'dynInputsFrm';

    // bagi in fFieldset --> fInputTxt
    fLegend.appendChild(fLegendTxt);
    fFieldset.appendChild(fLegend);

    frm.appendChild(fFieldset);
    targetInDOM.appendChild(frm);

    if(typeof property === 'object'){
      objToForm(property);
    };
  };

  /**
   * PRELUCRAREA FIECĂREI PROPRIETĂȚI
   */
  for (var prop in obj) {

    // console.log(prop); // _id, type, properties, geometry, __v
    // console.log(JSON.stringify(obj[prop]));

    // proprietățile aparțin obiectului?
    if (obj.hasOwnProperty(prop)) {

      var targetInDOM = document.getElementById('inputDataTable'),
          frm         = document.createElement('form');

      // ARRAY SIMPLU DE VALORI
      if(Array.isArray(obj[prop])){
        arrToForm(obj[prop]);
        objToForm(obj[prop]);
      };

      // STRING
      if(typeof obj[prop] === 'string'){
        valToField(obj[prop], prop);
      };

      // NUMBER
      if(typeof obj[prop] === 'number'){
        valToField(obj[prop], prop);
      };

      // OBJECT
      if(typeof obj[prop] === 'object'){

        propToFieldset(obj[prop], prop);

      };
    };
  };
};

objToForm(objDeTest);


/**
 * LEGENDA FUNCȚIILOR DE MANIPULARE A LAYERELOR
 */
addROcounties();                       // aduce coroplethurile județelor
// addROcounties(5);                      // aduce coropleth județ menționat --> NEFUNCTIONAL

addROlibs('is_county');               // aduce doar bibliotecile județene

addROlibs('is_municipal', 5);         // aduce bibliotecile municiplale pentru un județ
// addROlibs('is_municipal', 'RO');      // aduce biliotecile municipale pentru întreaga țară

// addROlibs('is_city', 5);              // aduce bibliotecile orășenești dintr-un județ
// addROlibs('is_city', 'RO');        // aduce bibliotecile orășenești din toată țara

// addROlibs('is_university', 5);        // aduce bibliotecile universitare dintr-un județ
// addROlibs('is_university', 'RO');  // aduce bibliotecile universitare din toată țara

addROlibs('is_village', 25);           // aduce bibliotecile sătești și comunale dintr-un județ
// addROlibs('is_village', 'RO');     // aduce bibliotecile sătești și comunale din țară

addROlibs('is_branch', 5);            // aduce bibliotecile sătești și comunale dintr-un județ
// addROlibs('is_branch', 'RO');         // aduce bibliotecile sătești și comunale dintr-un județ

// addROlibs('is_museum', 40);
// addROlibs('is_museum', 'RO');

// addROlibs('is_national', 40);
// addROlibs('is_national', 'RO');

// addROlibs('is_school', 5);
// addROlibs('is_school', 'RO');

// addROlibs('is_part_of', 5);
// addROlibs('is_part_of', 'RO');


// COROPHETH-urile județelor
function addROcounties (option){

  // este nevoie de referinta pentru a face resetul functional
  var addROcounties;

  function style(feature){
    return {
      fillColor: 'orange',
      weight: 0.5,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.2,
    };
  };

  // event listener pentru mouseover
  function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
      // fillColor: 'orange',
      weight: 4,
      // color: 'orange'
    });

    if (!L.Browser.ie && !L.Browser.opera) {
      layer.bringToFront();
    }
  };

  // ce se intampla pe mouseout
  function resetHighlight(e) {
    addROcounties.resetStyle(e.target);
  };

  // click pe județ și se încadrează în limite
  function zoomToFeature(e) {
    // TODO: apeleaza o functie care sa aduca datele despre judet

    var limite = e.target.getBounds();
    map.fitBounds(limite);
  };

  // integreaza comportamentele definite pentru tooate elementele
  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
    });
  };

  // Pune cap la cap style și onEachFeature
  addROcounties = {
      style: style,
      onEachFeature: onEachFeature
  };

  socket.emit('mesaje', `[client -->] Adu-mi coropleth-urile județelor`);
  socket.emit('county_ro_corplt', true);
  socket.on('county_ro_corplt', function(data){
    addROcounties = L.geoJson(data, addROcounties); // este cum va apărea layerul fără evenimente setate(la ce revine resetStyle)
    liblayers.addLayer(addROcounties);
  });
};

// MARKERI BIBLIOTECI
function addROlibs(option, noCounty){

  // FUNCȚIE PARTAJATĂ CARE ADUCE INFORMAȚIILE PENTRU FIECARE MARKER
  function onEachFeature(feature, layer) {
    // console.log(feature.properties.name[0].official_name);
    var webpage = '', catalog = '';
    // verifică dacă există valoare pentru pagină de web proprie
    if(feature.properties.services.webpage_url) {
      webpage = '<a href="'
                + feature.properties.services.webpage_url
                + '">'
                + feature.properties.services.webpage_url
                + '</a>'
    } else {
      webpage = 'Nu are pagină pe domeniul propriu.'
    };
    // verifică dacă există valoare pentru catalog
    if(feature.properties.services.catalog.url) {
      catalog = '<a href="'
            + feature.properties.services.catalog.url
            + '">'
            + feature.properties.services.catalog.url
            + '</a>'
    } else {
      catalog = 'Nu are catalog propriu.'
    };

    // configurarea conținutului care apare în popup
    var popupText = feature.properties.name[0].official_name + ', ' + feature.properties.address[0].loc +
                    '<br>Adresă: ' + feature.properties.address[0].loc + ', '
                                   + feature.properties.address[0].street + ', '
                                   + feature.properties.address[0].postal_code +
                    '<br>Site: ' + webpage +
                    '<br>Catalog: ' + catalog;

    layer.bindPopup(popupText);
  };

  // ALTERNATIVA CLASICA la AwesomeMarkers
  // var countyLibIcon = L.icon({
  //   iconUrl: 'images/baseball-marker.png',
  //   // shadowUrl: 'leaf-shadow.png',
  //   //
  //   // iconSize:     [38, 95], // size of the icon
  //   // shadowSize:   [50, 64], // size of the shadow
  //    function onEachFeature(feature, layer) {
 // iconAnchor:   [22, 9api/geodata/features/nuts3ro4], // point of the icon which will correspond to marker's location
  //   // shadowAnchor: [4, 62],  // the same for the shadow
  //   // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  // });

  // BIBLIOTECI JUDEȚENE FĂRĂ FILIALE
  if(option === 'is_county'){
    socket.emit('mesaje', `[client -->] Adu-mi bibliotecile județene fără filiale`);
    socket.emit('is_county_ro', true);
    socket.on('is_county_ro', function(data){

      // TODO: cheamă o funcție care transformă datele într-un tabel

      // document.body.appendChild(buildHTMLDataTable(data));
      // jsonMultiDimParser(data);

      var style = {
        // fillColor: 'orange'
      };

      // Iconuri construite cu pluginul Leaflet.awesome-markers
      var countyLibIcon = L.AwesomeMarkers.icon({
        icon: 'star',
        markerColor: 'red'
      });

      // construiește layerul bibliotecilor județene
      var addROcountyLibsCentral = L.geoJson(data, {
        style: style,
        onEachFeature: onEachFeature,
        filter: function(feature, layer) {
          return feature.properties.qualifiers.is_county && !feature.properties.qualifiers.is_branch;
        },
        pointToLayer: function (feature, latlng) {
  				return L.marker(latlng, {icon: countyLibIcon});
  			}
      });
      // adaugă layerul bibliotecilor județene la grupul layerelor
      liblayers.addLayer(addROcountyLibsCentral);
    });
  };

  // BIBLIOTECILE MUNICIPALE
  if(option === 'is_municipal'){

    // definirea unui posibil stil pentru municipale
    var style = {
      // fillColor: 'orange'
    };

    // Iconuri construite cu pluginul Leaflet.awesome-markers
    var municipalLibsIcon = L.AwesomeMarkers.icon({
      icon: 'book',
      markerColor: 'blue'
    });

    var addROmunicipalLibsSet = {
      style: style,
      onEachFeature: onEachFeature,
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: municipalLibsIcon});
      }
    };

    // Dacă este pasat ca al doilea parametru 'RO', atunci adu markerele specificate pentru toată țara
    if(noCounty === 'RO'){
      // indică că dorești markere pentru toate municipiile prin true
      socket.emit('mesaje', `[client -->] Adu-mi bibliotecile municipale din toată țara`);
      socket.emit('is_municipal_ro', true);
      socket.on('is_municipal_ro', function(data){
        liblayers.addLayer(L.geoJson(data, addROmunicipalLibsSet));
      });
    } else {
      // indică că dorești markere pentru municipiile dintr-un județ
      socket.emit('mesaje', `[client -->] Adu-mi bibliotecile municipale din județul ${noCounty}`);
      socket.emit('is_municipal_ro', noCounty);
      socket.on('is_municipal_ro', function(data){
        liblayers.addLayer(L.geoJson(data, addROmunicipalLibsSet));
      });
    };
  };

  // BIBLIOTECI ORĂȘENEȘTI
  if(option === 'is_city'){

    // definirea unui posibil stil pentru orășenești
    var style = {
      // fillColor: 'orange'
    };

    // Iconuri construite cu pluginul Leaflet.awesome-markers
    var cityROLibsIcon = L.AwesomeMarkers.icon({
      icon: 'cog',
      markerColor: 'red'
    });

    var addROcityLibs = {
      style: style,
      onEachFeature: onEachFeature,
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: cityROLibsIcon});
      }
    };

    if(noCounty === 'RO'){
      // indică că dorești markere pentru toate municipiile prin true
      socket.emit('mesaje', `[client -->] Adu-mi bibliotecile orășenești din toată țara`);
      socket.emit('is_city_ro', true);
      socket.on('is_city_ro', function(data){
        liblayers.addLayer(L.geoJson(data, addROcityLibs));
      });
    } else {
      // indică că dorești markere pentru municipiile dintr-un județ
      socket.emit('mesaje', `[client -->] Adu-mi bibliotecile orășenești din județul ${noCounty}`);
      socket.emit('is_city_ro', noCounty);
      socket.on('is_city_ro', function(data){
        liblayers.addLayer(L.geoJson(data, addROcityLibs));
      });
    };
  };

  // BIBLIOTECILE UNIVERSITARE
  if(option === 'is_university'){

    var style ={
      // fillColor: 'orange'
    };

    // Iconuri construite cu pluginul Leaflet.awesome-markers
    var universityROLibsIcon = L.AwesomeMarkers.icon({
      icon: 'cog',
      markerColor: 'green'
    });

    var addROuniversityLibs = {
      style: style,
      onEachFeature: onEachFeature,
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: universityROLibsIcon});
      }
    };

    if(noCounty === 'RO'){
      // indică că dorești markere pentru toate universitarele prin true
      socket.emit('mesaje', `[client -->] Adu-mi bibliotecile universitare din toată țara`);
      socket.emit('is_university_ro', true);
      socket.on('is_university_ro', function(data){
        liblayers.addLayer(L.geoJson(data,addROuniversityLibs));
      });
    } else {
      // indică că dorești markere pentru universitarele dintr-un județ
      socket.emit('mesaje', `[client -->] Adu-mi bibliotecile universitare din județul ${noCounty}`);
      socket.emit('is_university_ro', noCounty);
      socket.on('is_university_ro', function(data){
        liblayers.addLayer(L.geoJson(data,addROuniversityLibs));
      });
    };
  };

  // BIBLOTECILE SATEȘTI
  if(option === 'is_village'){
    var style ={
      // fillColor: 'orange'
    };

    // Iconuri construite cu pluginul Leaflet.awesome-markers
    var villageLibsIcon = L.AwesomeMarkers.icon({
      icon: 'bookmark',
      markerColor: 'orange'
    });

    var addROvillageLibs = {
      style: style,
      onEachFeature: onEachFeature,
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: villageLibsIcon});
      }
    };

    if(noCounty === 'RO'){
      // indică că dorești markere pentru toate universitarele prin true
      socket.emit('mesaje', `[client -->] Adu-mi bibliotecile sătești din toată țara`);
      socket.emit('is_village_ro', true);
      socket.on('is_village_ro', function(data){
        liblayers.addLayer(L.geoJson(data, addROvillageLibs));
      });
    } else {
      // indică că dorești markere pentru universitarele dintr-un județ
      socket.emit('mesaje', `[client -->] Adu-mi bibliotecile sătești din județul ${noCounty}`);
      socket.emit('is_village_ro', noCounty);
      socket.on('is_village_ro', function(data){
        liblayers.addLayer(L.geoJson(data, addROvillageLibs));
      });
    };
  };

  // FILIALE
  if(option === 'is_branch'){
    var style ={
      // fillColor: 'orange'
    };

    // Iconuri construite cu pluginul Leaflet.awesome-markers
    var branchLibsIcon = L.AwesomeMarkers.icon({
      icon: 'spinner',
      prefix: 'fa',
      markerColor: 'red',
      spin: true
    });

    var addROBranchesLibs = {
      style: style,
      onEachFeature: onEachFeature,
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: branchLibsIcon});
      }
    };

    if(noCounty === 'RO'){
      // indică că dorești markere pentru toate universitarele prin true
      socket.emit('mesaje', `[client -->] Adu-mi bibliotecile filiale din toată țara`);
      socket.emit('is_branch_ro', true);
      socket.on('is_branch_ro', function(data){
        liblayers.addLayer(L.geoJson(data, addROBranchesLibs));
      });
    } else {
      // indică că dorești markere pentru universitarele dintr-un județ
      socket.emit('mesaje', `[client -->] Adu-mi filialele din județul ${noCounty}`);
      socket.emit('is_branch_ro', noCounty);
      socket.on('is_branch_ro', function(data){
        liblayers.addLayer(L.geoJson(data, addROBranchesLibs));
      });
    };
  };

  // BIBLOTECILE MUZEELOR
  if(option === 'is_museum'){
    var style = {
      // fillColor: 'orange'
    };

    // Iconuri construite cu pluginul Leaflet.awesome-markers
    var museumLibsIcon = L.AwesomeMarkers.icon({
      icon: 'certificate',
      prefix: 'fa',
      markerColor: 'cadeblue'
    });

    var addROmuseumLibs = {
      style: style,
      onEachFeature: onEachFeature,
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: museumLibsIcon});
      }
    };

    if(noCounty === 'RO'){
      // indică că dorești markere pentru toate universitarele prin true
      socket.emit('mesaje', `[client -->] Adu-mi bibliotecile muzeelor din toată țara`);
      socket.emit('is_museum_ro', true);
      socket.on('is_museum_ro', function(data){
        liblayers.addLayer(L.geoJson(data, addROmuseumLibs));
      });
    } else {
      // indică că dorești markere pentru universitarele dintr-un județ
      socket.emit('mesaje', `[client -->] Adu-mi bibliotecile muzeelor din județul ${noCounty}`);
      socket.emit('is_museum_ro', noCounty);
      socket.on('is_museum_ro', function(data){
        liblayers.addLayer(L.geoJson(data, addROmuseumLibs));
      });
    };
  };

  // BIBLIOTECI NATIONALE
  if(option === 'is_national'){
    var style ={
      // fillColor: 'orange'
    };

    // Iconuri construite cu pluginul Leaflet.awesome-markers
    var nationalLibsIcon = L.AwesomeMarkers.icon({
      icon: 'globe',
      prefix: 'fa',
      markerColor: 'purple',
      iconColor: '#6b1d5c'
      // markerColor: 'cadeblue'
    });

    var addROnationalLibs = {
      style: style,
      onEachFeature: onEachFeature,
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: nationalLibsIcon});
      }
    };

    if(noCounty === 'RO'){
      // indică că dorești markere pentru toate universitarele prin true
      socket.emit('mesaje', `[client -->] Adu-mi bibliotecile naționale toată țara`);
      socket.emit('is_national_ro', true);
      socket.on('is_national_ro', function(data){
        liblayers.addLayer(L.geoJson(data, addROnationalLibs));
      });
    } else {
      // indică că dorești markere pentru universitarele dintr-un județ
      socket.emit('mesaje', `[client -->] Adu-mi bibliotecile naționale din județul ${noCounty}`);
      socket.emit('is_national_ro', noCounty);
      socket.on('is_national_ro', function(data){
        liblayers.addLayer(L.geoJson(data, addROnationalLibs));
      });
    };
  };

  // BIBLIOTECI ȘCOLARE
  if(option === 'is_school'){
    var style ={
      // fillColor: 'orange'
    };

    // Iconuri construite cu pluginul Leaflet.awesome-markers
    var schoolLibsIcon = L.AwesomeMarkers.icon({
      icon: 'graduation-cap',
      prefix: 'fa',
      markerColor: 'vanilla',
      iconColor: '#f3e5ab'
    });

    var addROschoolLibs = {
      style: style,
      onEachFeature: onEachFeature,
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: schoolLibsIcon});
      }
    };

    if(noCounty === 'RO'){
      // indică că dorești markere pentru toate universitarele prin true
      socket.emit('mesaje', `[client -->] Adu-mi bibliotecile școlare toată țara`);
      socket.emit('is_school_ro', true);
      socket.on('is_school_ro', function(data){
        liblayers.addLayer(L.geoJson(data, addROschoolLibs));
      });
    } else {
      // indică că dorești markere pentru universitarele dintr-un județ
      socket.emit('mesaje', `[client -->] Adu-mi bibliotecile școlare din județul ${noCounty}`);
      socket.emit('is_school_ro', noCounty);
      socket.on('is_school_ro', function(data){
        liblayers.addLayer(L.geoJson(data, addROschoolLibs));
      });
    };
  };

  // BIBLIOTECI COMPONENTE ALE ALTOR INSTITUȚII
  if(option === 'is_part_of'){
    var style ={
      // fillColor: 'orange'
    };

    // Iconuri construite cu pluginul Leaflet.awesome-markers
    var partOfLibsIcon = L.AwesomeMarkers.icon({
      icon: 'puzzle-piece',
      prefix: 'fa',
      markerColor: 'coral',
      iconColor: '#ff7f50'
    });

    var addROpartOfLibs = {
      style: style,
      onEachFeature: onEachFeature,
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: partOfLibsIcon});
      },
    };

    if(noCounty === 'RO'){
      // indică că dorești markere pentru toate universitarele prin true
      socket.emit('mesaje', `[client -->] Adu-mi bibliotecile părți ale altor instituții toată țara`);
      socket.emit('is_part_of_ro', true);
      socket.on('is_part_of_ro', function(data){
        liblayers.addLayer(L.geoJson(data, addROpartOfLibs));
      });
    } else {
      // indică că dorești markere pentru universitarele dintr-un județ
      socket.emit('mesaje', `[client -->] Adu-mi bibliotecile părți ale altor instituții din județul ${noCounty}`);
      socket.emit('is_part_of_ro', noCounty);
      socket.on('is_part_of_ro', function(data){
        liblayers.addLayer(L.geoJson(data, addROpartOfLibs));
      });
    };
  };
};

// L.Control.search({
//   // container: 'search-map',
//   layer: liblayers,
//   propertyName: 'official_name',
//   initial: false,
//   collapsed: false,
//   // moveToLocation: function(latlng, title, map) {
// 	// 		//map.fitBounds( latlng.layer.getBounds() );
// 	// 		var zoom = map.getBoundsZoom(latlng.layer.getBounds());
//   // 			map.setView(latlng, zoom); // access the zoom
// 	// 	}
// }).addTo(map);

// adu datele și prelucrează datele adăugând un layer
// Atenție, datele vin ca un array și nu ca un obiect
// $.getJSON("http://localhost:3000/api/geodata?features=all", function(data){
//
//   // SETAREA CLUSTER SI CARACTERISTICI
//   var clusters = L.markerClusterGroup({                       // Creezi clusterii
//     maxClusterRadius: 50,
//     chunkedLoading: true,
//     singleMarkerMode: true
//   });
//
//   // L.geoJson creează un layer și acceptă un obiect GeoJSON
//   // obiectul GeoJSON (un factory) poate fi adăugat mai târziu cu metoda addData
//   var libraries = L.geoJson(data, {                           // Creezi layerul de date. Acesta este un grup de grupuri, fiecare conținând un singur punct pe hartă (un marker)
//     /*
//     poinToLayer este o opțiune a obiectului GeoJSON
//     este o funcție pentru crearea de layere pentru punctele GeoJSON
//     */
//     pointToLayer: function(feature, latlng) {                 // Funcție pentru crearea de layere pentru punctele geoJson.
//       var marker = L.marker(latlng);                          // Instanțiază un obiect Marker date fiind coordonatele. Poate primi un obiect de configurare
//       // Afișare selectivă în funcție de existența sau nu a valorii
//       var webpage = '', catalog = '';
//       // verifică dacă există valoare pentru pagină de web proprie
//       if(feature.properties.services.webpage_url) {
//         webpage = '<a href="'
//                   + feature.properties.services.webpage_url
//                   + '"">'
//                   + feature.properties.services.webpage_url
//                   + '</a>'
//       } else {
//         webpage = 'Nu are pagină pe domeniul propriu.'
//       };
//       // verifică dacă există valoare pentru catalog
//       if(feature.properties.services.catalog.url) {
//         catalog = '<a href="'
//               + feature.properties.services.catalog.url
//               + '"">'
//               + feature.properties.services.catalog.url
//               + '</a>'
//       } else {
//         catalog = 'Nu are catalog propriu.'
//       };
//       // configurarea conținutului care apare în popup
//       var popupText = feature.properties.name[0].official_name + ', ' + feature.properties.address[0].loc +
//                       '<br>Adresă: ' + feature.properties.address[0].loc +
//                       '<br>Site: ' + webpage +
//                       '<br>Catalog: ' + catalog;
//       marker.bindPopup(popupText);                            // pentru fiecare marker creat fă binding cu popup
//       return marker;                                          // returnează fiecare dintre markerii creați
//     },
//
//     /*
//     onEachFeature este o funcție
//     este invocată pentru fiecare layer care aparține unui feature
//     folosește la atașarea de evenimente și popup-uri
//     */
//     onEachFeature: function (feature, layer) {                // pentru fiecare feature din setul de date, adaugă clusterul creat de acesta
//       layer.addTo(clusters);
//     }
//   });
//   // adaugă layerul clusterilor
//   // pluginul MarkerCluster vede că libraries este un grup și extrage primul nivel de copii
//   map.addLayer(clusters);
// });
//

// CEMETERY CODE

// if(noCounty === 'RO'){
//   $.getJSON("http://localhost:3000/api/geodata/features/romania/partof", function(data){
//     var addROpartOfLibs = L.geoJson(data, {
//       style: style,
//       onEachFeature: onEachFeature,
//       filter: function(feature, layer) {
//           return feature.properties.qualifiers.is_national &&
//           !feature.properties.qualifiers.is_branch &&
//           !feature.properties.qualifiers.is_city &&
//           !feature.properties.qualifiers.is_county &&
//           !feature.properties.qualifiers.is_municipal &&
//           !feature.properties.qualifiers.is_village &&
//           !feature.properties.qualifiers.is_museum &&
//           !feature.properties.qualifiers.is_part_of &&
//           !feature.properties.qualifiers.is_school &&
//           !feature.properties.qualifiers.is_university;
//       },
//       pointToLayer: function (feature, latlng) {
//         return L.marker(latlng, {icon: partOfLibsIcon});
//       },
//     });
//     layers.addLayer(addROpartOfLibs);
//   });
// } else {
//   $.getJSON("http://localhost:3000/api/geodata/features/romania/partof/" + noCounty, function(data){
//     var addROpartOfLibs = L.geoJson(data, {
//       style: style,
//       onEachFeature: onEachFeature,
//       pointToLayer: function (feature, latlng) {
//         return L.marker(latlng, {icon: partOfLibsIcon});
//       },
//     });
//     liblayers.addLayer(addROpartOfLibs);
//   });
// };
