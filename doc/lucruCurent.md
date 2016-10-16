În acest moment există riscul ca parolele care pleacă în socket la logare și la înregistrare să poată fi văzute cu o aplicație care să expună înformația în clar.

Ce este neapărat necesar este verificarea ca acest lucru să nu se întâmple. Dacă se întâmplă, atunci la inițierea socketului să se genereze un socket temporar cu id-ul generat de client. În cazul acesta ar trebui să hecărești browserul ca să ai acces la socket.

# MVM

Pentru a face MVM-ul instalează cu bower suport pentru handlebars

```bash
bower install handlebars
bower handlebars#*              cached https://github.com/components/handlebars.js.git#4.0.5
bower handlebars#*            validate 4.0.5 against https://github.com/components/handlebars.js.git#*
bower handlebars#^4.0.5        install handlebars#4.0.5
```

## În client

leagă biblioteca de cod în șablonul handlebars

```html
<script src="../frontend/libs/handlebars/handlebars.min.js" charset="utf-8"></script>
```

### Problemă

Din server șablonul pleacă precompilat.

### Întrebări

1. Cum să trimiți în client un șablon necompilat, care să se compileze local cu datele locale
