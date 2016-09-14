var socket = io.connect('//localhost:3000');
var dialog = io.connect('//localhost:3000/dialog')

// stabileste conexiunea pe namespace-ul general /
socket.on('connect', function (data) {

  // emite pe canalul mesaje un salut (canalul este construi de server anterior)
  socket.emit('mesaje', `[client -->] Clientul a trimis: Salut server! Sunt eu clientul ${socket.id}`);

  // ascultare pe canalul mesaje
  socket.on('mesaje', function(data){
    console.log(`[client <--] Clientul primește pe 'mesaje': ${data}`);
  });

  socket.on('is_county_ro', function(data){
    console.log(`[client -->] Clientul a trimis: Pe 'is_county_ro' circulă următoarele date --> ${data}`);
  });

});

// NAMESPACE dedicat
dialog.on('connect', function(){
  dialog.emit('echo', `[client -->] Clientul a trimis: Te salută clientul identificat cu ${socket.id} de pe namespace-ul /dialog`);
});

// funcție de redirectare după verificarea credențialelor
function redirect(path){
  window.location = path;
};
