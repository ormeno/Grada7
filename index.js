const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { AsyncResource } = require('async_hooks')
let exphbs = require('express-handlebars')
//-----------------------------------------------------


// -------------------------------------------------------------------
const port = process.env.PORT || 4001;

app.set('port',port);
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.engine('.hbs',exphbs.engine({
    defaultLayout: 'main',
    partialsDir: path.join(app.get('views'), 'partials'),
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    console.log('get /');
    res.render('index', {layout: 'main'});
});

app.get("/firmar", (req, res) => {
  console.log('get /firmar');
  let titulo = req.query.titulo;
  let descri = req.query.descri;
  let min = req.query.min;
  let eqA = req.query.eqA;
  let eqB = req.query.eqB;
  let porcentaje = req.query.porcentaje;
  let idTelegram = req.query.idTelegram; 
  if (titulo != null && descri!=null && min!=null && eqA!=null && eqB!=null && porcentaje!=null && idTelegram!=null){
    parametrosExisten=true;
  }  
  res.render("index", {layout: 'main', tituloBet: titulo, descripcion: descri, betMin: min, equipoA: eqA, equipoB: eqB, porcen: porcentaje, idTlg: idTelegram, paramAltaExists: parametrosExisten});
});

app.get("/apostar", (req, res) => {
  console.log('get /apostar');
  let id = req.query.id;
  let win = req.query.win;
  let titulo = req.query.titulo;
  let min = req.query.min;
  if (id != null && win!=null && titulo != null && min != null){
    parametrosExisten=true;
  }  
  res.render("index", {layout: 'main', idBet: id, eqWin: win,  tituloBet: titulo, min: min, paramApostarExists: parametrosExisten});
});

app.get("/cerrar", (req, res) => {
  console.log('get /cerrar');
  let id = req.query.id;
  let titulo = req.query.titulo;
  if (id != null && titulo != null){
    parametrosExisten=true;
  }  
  res.render("index", {layout: 'main', idBet: id, tituloBet: titulo, paramCerrarExists: parametrosExisten});
});

app.get("/distribuir", (req, res) => {
  console.log('get /distribuir');
  let id = req.query.id;
  let winner = req.query.winner;
  let titulo = req.query.titulo;
  if (id != null && winner != null && titulo != null){
    parametrosExisten=true;
  }  
  res.render("index", {layout: 'main', idBet: id, winnerBet: winner, tituloBet: titulo, paramDistribuirExists: parametrosExisten});
});

app.listen(app.get('port'), () => {
  console.log('Servidor en puerto ', port);
});
