var express    = require("express");
var login = require('./routes/loginroutes');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var api = express.Router();
var game = express.Router();
// test route will trigger on /api
api.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});

game.get('/', function(req, res) {
    res.sendFile('./index.html', {root: __dirname });
    //res.append('./login.js', {root: __dirname });
});

//route to handle user registration
api.post('/register',login.register);
api.post('/login',login.login)
app.use('/api', api);
app.use('/', game);
app.listen(5000);