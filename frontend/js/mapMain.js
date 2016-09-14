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

var liblayers = new L.LayerGroup(); // grup de markeri din straturile generate programatic
var overlayMaps = {
  'Biblioteci românești' : liblayers
};
var baseMaps = {
  'Google Streets': googleStreets,
  // 'Google Hybrid': googleHybrid,
  // // 'Google Terain': googleTerrain,
  'Google Sat': googleSat,
  'Open Street Maps': osm
};

// adauga layerele de initierea hartii
var map = L.map('map', {
    center: [45.924, 25.466],
    zoom: 7,
    layers: [osm, liblayers, googleStreets]
});

// adaugă la hartă layerele de bază și overlay-urile
L.control.layers(baseMaps).addTo(map);
// poți adăuga și overlay-urile la switching.



// TODO: un mecanism care să preia selecțiile făcute în pagină și să le transforme în date afișate

// LEGENDA FUNCȚIILOR DE MANIPULARE A LAYERELOR
// addROcounties();                      // aduce coroplethurile județelor
addROlibs('is_county');               // aduce doar bibliotecile județene

// addROlibs('is_municipal', 5);         // aduce bibliotecile municiplale pentru un județ
// addROlibs('is_municipal', 'RO');      // aduce biliotecile municipale pentru întreaga țară

// addROlibs('is_city', 5);              // aduce bibliotecile orășenești dintr-un județ
// addROlibs('is_city', 'RO');        // aduce bibliotecile orășenești din toată țara

// addROlibs('is_university', 5);        // aduce bibliotecile universitare dintr-un județ
// addROlibs('is_university', 'RO');  // aduce bibliotecile universitare din toată țara

// addROlibs('is_village', 5);           // aduce bibliotecile sătești și comunale dintr-un județ
// addROlibs('is_village', 'RO');     // aduce bibliotecile sătești și comunale din țară

// addROlibs('is_branch', 5);            // aduce bibliotecile sătești și comunale dintr-un județ
// addROlibs('is_branch', 'RO');         // aduce bibliotecile sătești și comunale dintr-un județ

// addROlibs('is_museum', 40);
// addROlibs('is_museum', 'RO');

// addROlibs('is_national', 5);
// addROlibs('is_national', 'RO');

// addROlibs('is_school', 5);
// addROlibs('is_school', 'RO');

// addROlibs('is_part_of', 5);
// addROlibs('is_part_of', 'RO');


// COROPHETH-urile județelor
function addROcounties (option){
  if (!option){

    // TODO: adu toate judetele si feature-urile pentru județene
    $.getJSON("http://localhost:3000/api/geodata/nuts3ro", function (data) {
      var addROcounties;

      // definirea stilului general al coropleth-ului
      var style = {
        // fillColor: 'getColor(feature.properties.density)',
        // fillColor: function(feature){
        //   switch(feature.properties.name){
        //     case 40: return {color: "#ff0000"};
        //   }
        // },
        fillColor: 'orange',
        weight: 0.5,
        opacity: 1,
        color: 'white',
        // dashArray: '2',
        fillOpacity: 0.2,
      };

      // event pentru mouseover
      function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
          fillColor: 'orange',
          weight: 4,
          color: 'orange',
          // dashArray: '5',
          // fillOpacity: 0.5
        });
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
      };

      // ce se intampla pe mouseout
      function resetHighlight(e) {
        addROcounties.resetStyle(e.target);
      };

      // CE SE ÎNTÂMPLĂ CÎND DAI CLIC PE JUDEȚ
      function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
      };

      // integreaza comportamentele definite pentru tooate elementele
      function onEachFeature(feature, layer) {
        layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
        });
      };

      // integreaza in harta
      addROcounties = L.geoJson(data, {
          style: style,
          onEachFeature: onEachFeature
      });

      layers.addLayer(addROcounties);
    });
  };
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

    /**
     * ÎNLOCUIRE CU SOCKETURI
     */
    socket.emit('mesaje', `[client -->] Adu-mi bibliotecile județene fără filiale`);
    socket.emit('is_county_ro', true);
    socket.on('is_county_ro', function(data){

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
  			},
      });
      // adaugă layerul bibliotecilor județene la grupul layerelor
      liblayers.addLayer(addROcountyLibsCentral);
    });


    // $.getJSON("http://localhost:3000/api/geodata/features/romania/capitals", function(data){

      // var style = {
      //   // fillColor: 'orange'
      // };
      //
      // // Iconuri construite cu pluginul Leaflet.awesome-markers
      // var countyLibIcon = L.AwesomeMarkers.icon({
      //   icon: 'star',
      //   markerColor: 'red'
      // });
      //
      // // construiește layerul bibliotecilor județene
      // var addROcountyLibsCentral = L.geoJson(data, {
      //   style: style,
      //   onEachFeature: onEachFeature,
      //   filter: function(feature, layer) {
      //     return feature.properties.qualifiers.is_county && !feature.properties.qualifiers.is_branch;
      //   },
      //   pointToLayer: function (feature, latlng) {
  		// 		return L.marker(latlng, {icon: countyLibIcon});
  		// 	},
      // });
      // // adaugă layerul bibliotecilor județene la grupul layerelor
      // liblayers.addLayer(addROcountyLibsCentral);
    // });
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

    // Dacă este pasat ca al doilea parametru 'RO', atunci adu markerele specificate pentru toată țara
    if(noCounty === 'RO'){
      $.getJSON("http://localhost:3000/api/geodata/features/romania/municipal", function(data){
        var addROmunicipalLibs = L.geoJson(data, {
          style: style,
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: municipalLibsIcon});
          }
        });
        layers.addLayer(addROmunicipalLibs);
      });
    } else {
      $.getJSON("http://localhost:3000/api/geodata/features/romania/municipal/" + noCounty, function(data){
        var addROmunicipalLibs = L.geoJson(data, {
          style: style,
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: municipalLibsIcon});
          }
        });
        layers.addLayer(addROmunicipalLibs);
      });
    };
  }

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

    // Dacă este pasat ca al doilea parametru 'RO', atunci adu markerele specificate pentru toată țara
    if(noCounty === 'RO'){
      $.getJSON("http://localhost:3000/api/geodata/features/romania/city", function(data){
        var addROcityLibs = L.geoJson(data, {
          style: style,
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: cityROLibsIcon});
          },
        });
        layers.addLayer(addROcityLibs);
      });
    } else {
      $.getJSON("http://localhost:3000/api/geodata/features/romania/city/" + noCounty, function(data){
        var addROcityLibs = L.geoJson(data, {
          style: style,
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: cityROLibsIcon});
          },
        });
        liblayers.addLayer(addROcityLibs);
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

    if(noCounty === 'RO'){
      $.getJSON("http://localhost:3000/api/geodata/features/romania/university", function(data){
        var addROuniversityLibs = L.geoJson(data, {
          style: style,
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: universityROLibsIcon});
          },
        });
        layers.addLayer(addROuniversityLibs);
      });
    } else {
      $.getJSON("http://localhost:3000/api/geodata/features/romania/university/" + noCounty, function(data){
        var addROuniversityLibs = L.geoJson(data, {
          style: style,
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: universityROLibsIcon});
          },
        });
        liblayers.addLayer(addROuniversityLibs);
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

    if(noCounty === 'RO'){
      $.getJSON("http://localhost:3000/api/geodata/features/romania/village", function(data){
        var addROvillageLibs = L.geoJson(data, {
          style: style,
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: villageLibsIcon});
          },
        });

        layers.addLayer(addROvillageLibs);
      });
    } else {
      $.getJSON("http://localhost:3000/api/geodata/features/romania/village/" + noCounty, function(data){
        var addROvillageLibs = L.geoJson(data, {
          style: style,
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: villageLibsIcon});
          },
        });
        liblayers.addLayer(addROvillageLibs);
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

    if(noCounty === 'RO'){
      $.getJSON("http://localhost:3000/api/geodata/features/romania/branch", function(data){
        var addROBranchesLibs = L.geoJson(data, {
          style: style,
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: branchLibsIcon});
          },
        });

        layers.addLayer(addROBranchesLibs);
      });
    } else {
      $.getJSON("http://localhost:3000/api/geodata/features/romania/branch/" + noCounty, function(data){
        var addROBranchesLibs = L.geoJson(data, {
          style: style,
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: branchLibsIcon});
          },
        });
        liblayers.addLayer(addROBranchesLibs);
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

    if(noCounty === 'RO'){
      $.getJSON("http://localhost:3000/api/geodata/features/romania/museum", function(data){
        var addROmuseumLibs = L.geoJson(data, {
          style: style,
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: museumLibsIcon});
          },
        });

        layers.addLayer(addROmuseumLibs);
      });
    } else {
      $.getJSON("http://localhost:3000/api/geodata/features/romania/museum/" + noCounty, function(data){
        var addROmuseumLibs = L.geoJson(data, {
          style: style,
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: museumLibsIcon});
          },
        });

        liblayers.addLayer(addROmuseumLibs);
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

    if(noCounty === 'RO'){
      $.getJSON("http://localhost:3000/api/geodata/features/romania/national", function(data){
        var addROnationalLibs = L.geoJson(data, {
          style: style,
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: nationalLibsIcon});
          },
        });
        layers.addLayer(addROnationalLibs);
      });
    } else {
      $.getJSON("http://localhost:3000/api/geodata/features/romania/national/" + noCounty, function(data){
        var addROnationalLibs = L.geoJson(data, {
          style: style,
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: nationalLibsIcon});
          },
        });
        liblayers.addLayer(addROnationalLibs);
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

    if(noCounty === 'RO'){
      $.getJSON("http://localhost:3000/api/geodata/features/romania/school", function(data){
        var addROschoolLibs = L.geoJson(data, {
          style: style,
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: schoolLibsIcon});
          },
        });
        layers.addLayer(addROschoolLibs);
      });
    } else {
      $.getJSON("http://localhost:3000/api/geodata/features/romania/school/" + noCounty, function(data){
        var addROschoolLibs = L.geoJson(data, {
          style: style,
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: schoolLibsIcon});
          },
        });
        liblayers.addLayer(addROschoolLibs);
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

    if(noCounty === 'RO'){
      $.getJSON("http://localhost:3000/api/geodata/features/romania/partof", function(data){
        var addROpartOfLibs = L.geoJson(data, {
          style: style,
          onEachFeature: onEachFeature,
          // filter: function(feature, layer) {
          //     return feature.properties.qualifiers.is_national &&
          //     !feature.properties.qualifiers.is_branch &&
          //     !feature.properties.qualifiers.is_city &&
          //     !feature.properties.qualifiers.is_county &&
          //     !feature.properties.qualifiers.is_municipal &&
          //     !feature.properties.qualifiers.is_village &&
          //     !feature.properties.qualifiers.is_museum &&
          //     !feature.properties.qualifiers.is_part_of &&
          //     !feature.properties.qualifiers.is_school &&
          //     !feature.properties.qualifiers.is_university;
          // },
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: partOfLibsIcon});
          },
        });
        layers.addLayer(addROpartOfLibs);
      });
    } else {
      $.getJSON("http://localhost:3000/api/geodata/features/romania/partof/" + noCounty, function(data){
        var addROpartOfLibs = L.geoJson(data, {
          style: style,
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: partOfLibsIcon});
          },
        });
        liblayers.addLayer(addROpartOfLibs);
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
