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
app.use(bodyParser.json())

app.get('/', function (req, res) {

    res.render('index', {
        greeting: greetFunction.getGreeting(),
        count: greetFunction.counter()
    });

});

app.post('/greetings', function (req, res) {
    greetFunction.makeGreet(req.body.userName, req.body.radioLanguage);
    greetFunction.getNameCounter(req.body.userName);
    console.log(greetFunction.counter());
    console.log(greetFunction.getCounter(req.body.userName));
    res.redirect('/');
  
});

app.get('/greeted', function (req, res) {
    res.render('greeted',{
        names_greeted : greetFunction.objectListNames(),
    }
    );
    console.log(greetFunction.getGreetedNames());

});
app.get('/counter', function (req, res) {

    res.render('counter',{
        nameCounter : greetFunction.getGreetedNames(),
    }
    );


});

const PORT = process.env.PORT || 3015;

app.listen(PORT, function () {
    console.log("App started at port", PORT);
});
