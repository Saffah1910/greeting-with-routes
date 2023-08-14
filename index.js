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
        count: greetFunction.counter(),
        // errors :greetFunction.setErrors()
    });

});

app.post('/greetings', function (req, res) {
    greetFunction.makeGreet(req.body.userName, req.body.radioLanguage);
    greetFunction.getNameCounter(req.body.userName);
    // console.log(greetFunction.setErrors(req.body.userName, req.body.radioLanguage));
    greetFunction.counter();
    console.log(greetFunction.getCounter(req.body.userName));
    res.redirect('/');

});

app.get('/greeted', function (req, res) {
    res.render('greeted', {
        names_greeted: greetFunction.objectListNames(),
    }
    );
    console.log(greetFunction.getGreetedNames());

});
app.get('/counter', function (req, res) {

    res.render('counter', {
        nameCounter: greetFunction.getGreetedNames(),
    }
    );
});
app.get('/counter/:user_name', function (req, res) {
    const user_name = req.params.user_name;
   let userCount = greetFunction.userCount(user_name)
    res.render('counter',
        {
            userCount,
            user_name,
            counter: greetFunction.getGreetedNames(user_name)
        });

});

const PORT = process.env.PORT || 3015;

app.listen(PORT, function () {
    console.log("App started at port", PORT);
});
