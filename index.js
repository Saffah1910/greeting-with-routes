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

app.get('/', function (req, res) {
    // console.log( greetFunction.getGreeting());

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
    console.log(greetFunction.getGreetedNames());
    res.redirect('/');
    // console.log(req.body.userName);
    // console.log(req.body.radioLanguage);
});
// app.post('/action', function (req, res) {
//     //  console.log(req.body.radioLanguage);
//     greetFunction.makeGreet(req.body.radioLanguage)
//     res.redirect('/');
// });
app.post('/greeted', function (req, res) {

    greetFunction.objectListNames();
    res.redirect('/');

});
app.post('/actions', function (req, res) {

    // console.log("ACIONS.....",time());

    // res.render('greeted',
        
            greetFunction.getGreetedNames()

    // );

});


// app.post('/actions', function (req, res) {

// });
//get route to display names
// app.post('/actions/:type', function (req, res) {
//     console.log(greetFunction.getCounter(req.body.userName));

// });

const PORT = process.env.PORT || 3015;

app.listen(PORT, function () {
    console.log("App started at port", PORT);
});
// app.listen(3015, function () {
//     console.log("App started at port");
// });