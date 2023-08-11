import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import Greet from './greet-factory.js';

const app = express();
const greetFunction = Greet();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', function(req, res){
    res.render('index', {
        greeting : greetFunction.selectedLanguage()});
        
});

app.post('/greetings', function(req, res){
    greetFunction.selectedLanguage({
        userName: req.body.names
    })
     console.log(req.body);
    // res.redirect('/');
});
app.post('/action', function(req, res){
    // console.log(req.body.radioLanguage);
    greetFunction.selectedLanguage(req.body.radioLanguage)
    res.redirect('/');
});
app.post('/actions', function(req, res){

});
//get route to display names
app.post('/actions/:type', function(req, res){

});

const PORT = process.env.PORT || 3015;

app.listen(PORT, function () {
    console.log("App started at port", PORT);
});
// app.listen(3015, function () {
//     console.log("App started at port");
// });