/**
 * o funcție care transformă datele într-un tabel
 * @param  {object} colection un JSON
 * @param  {string} id        id-ul elementului unde se atașează
 * @return {}           [description]
 */
function tableGen (colection, id, idTable){


  var colNames = ['nume', 'catalog'],
      targetInDOM = document.getElementById(id),
      table = document.createElement('table'),
      thead = document.createElement('thead'),
      tr = document.createElement('tr'),
      td = document.createElement('td'),
      tbody = document.createElement('tbody');

  table.setAttribute('id', idTable);
  table.setAttribute("border", "1");

  /**
   * THEAD
   */
  // pentru fiecare elment din array-ul conNames, generează un th
  for(var i = 0; i < colNames.length; ++i){
    var th = document.createElement('th');
    var thIn = document.createTextNode(`${colNames[i]}`);
    th.appendChild(thIn);
    tr.appendChild(th);
  };
  thead.appendChild(tr);
  table.appendChild(thead);

  // TODO: verifica dacă există deja un tabel în elementul al carui id a fost primit, daca da, fă append la rows
  // var table = document.getElementById(idTable);
  // var rowCount = table.rows.length;
  // console.log(table);


  /**
   * TBODY
   */
  // pentru fiecare element-obiect din array-ul de obiect
  // generează câte un row doar cu informațiile necesare
  for(let prop in colection) {
    table.appendChild(rowGen(colection[prop], tbody));
  };

  targetInDOM.appendChild(table);
};


function rowGen (obj, tbody){
  // console.log(obj);

  // construiește un tr care sa-l bagi în tbody
  var tds = [];
      trow = document.createElement('tr'),
      tdata = document.createElement('td'),
      // anchor = document.createElement('a'),
      lastRec = obj.properties.name.pop();

  /**
   * <a href="56dabb268fcd207c7557e7a5">Biblioteca Județeană „Astra”</a>
   * construiește un anchor pentru numele bibliotecii prin care sa deschizi o fișă
   */
  var a = document.createElement('a');
  a.appendChild(document.createTextNode(lastRec.official_name));
  a.setAttribute('href', `${obj._id}`);
  var adata = document.createElement('td');
  adata.appendChild(a);
  tds.push(adata);

  /**
   * construiește un anchor pentru catalog
   */
  var b = document.createElement('a');
  b.appendChild(document.createTextNode('link'));
  b.setAttribute('href', `${obj.properties.services.catalog.url}`);
  var bdata = document.createElement('td');
  bdata.appendChild(b);
  tds.push(bdata);

  // asamblarea row-urilor și introducere în tbody
  for(let prop in tds) {
    // console.log(tds[prop]);
    trow.appendChild(tds[prop]);
  }

  // injectează rândul în tbody
  tbody.appendChild(trow);
  return tbody;
};
