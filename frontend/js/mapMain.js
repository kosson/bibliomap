// CREARE LAYERE
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
var osm = new L.TileLayer(osmUrl, {minZoom: 6, attribution: osmAttrib});

var map = L.map('map', {
    center: [45.924, 25.466],
    zoom: 7,
    layers: [osm]             // adauga layerele de initierea hartii
});

// TODO: un mecanism care să preia selecțiile făcute în pagină și să le transforme în date afișate

var layers = new L.LayerGroup().addTo(map);

addROcounties();
addROlibs('is_county'); //TODO: adu doar centralele, nu și filialele.

// construiește un layer cu toate județele ca și coropleth-uri
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

function addROlibs(option){
  if(option === 'is_county'){
    $.getJSON("http://localhost:3000/api/geodata/judetene", function(data){

      var style ={
        // fillColor: 'orange'
      };

      function onEachFeature(feature, layer) {

        var webpage = '', catalog = '';
        // verifică dacă există valoare pentru pagină de web proprie
        if(feature.properties.services.webpage_url) {
          webpage = '<a href=\"http://'
                    + feature.properties.services.webpage_url
                    + '\">'
                    + feature.properties.services.webpage_url
                    + '</a>'
        } else {
          webpage = 'Nu are pagină pe domeniul propriu.'
        };
        // verifică dacă există valoare pentru catalog
        if(feature.properties.services.catalog.url) {
          catalog = '<a href=\"http://'
                + feature.properties.services.catalog.url
                + '\">'
                + feature.properties.services.catalog.url
                + '</a>'
        } else {
          catalog = 'Nu are catalog propriu.'
        };

        // configurarea conținutului care apare în popup
        var popupText = feature.properties.name[0].official_name + ', ' + feature.properties.address[0].loc +
                        '<br>Adresă: ' + feature.properties.address[0].loc +
                        '<br>Site: ' + webpage +
                        '<br>Catalog: ' + catalog;

        layer.bindPopup(popupText);
      };

      // var countyLibIcon = L.icon({
      //   iconUrl: 'images/baseball-marker.png',
      //   // shadowUrl: 'leaf-shadow.png',
      //   //
      //   // iconSize:     [38, 95], // size of the icon
      //   // shadowSize:   [50, 64], // size of the shadow
      //   // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      //   // shadowAnchor: [4, 62],  // the same for the shadow
      //   // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      // });
      var countyLibIcon = L.AwesomeMarkers.icon({
        icon: 'star',
        markerColor: 'red'
      });

      var addROcountyLibs = L.geoJson(data, {
        style: style,
        onEachFeature: onEachFeature,
        filter: function(feature, layer) {
            return feature.properties.qualifiers.is_county && !feature.properties.qualifiers.is_branch;
        },
        pointToLayer: function (feature, latlng) {
  				return L.marker(latlng, {icon: countyLibIcon});
  			},
      });

      layers.addLayer(addROcountyLibs);
    });
  }
}

// TODO: Adu features pe o cerere parametrizată
// 1. per regiune de dezvoltare
// 2. per județ



//
// var controlSearch = new L.Control.Search({
//   position:'topright',
//   layer: markersLayer,
//   initial: false,
//   zoom: 12,
//   marker: false
// });
// map.addControl( controlSearch );



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
