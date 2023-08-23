import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import Greet from './greet-factory.js';
import flash from 'express-flash';
import session from 'express-session';
import pgPromise from 'pg-promise';
import 'dotenv/config';
import namesQuery from './service/query.js';

const pgp = pgPromise({})

const connectionString = process.env.DATABASE_URL;

const db = pgp(connectionString);

const app = express();
const greetFunction = Greet(db);
const dbLogic = namesQuery(db);


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());


app.get('/', async function (req, res) {
    // let data = await db.any("select * from greeting_table");
    // console.log(data);
    let greetName = req.flash('info')[0];
    let errorMessage = req.flash('error')[0];
    let reset = req.flash('resetMessage')[0];

    let people = !errorMessage
    res.render('index', {

        greeting: people ? greetName : "",

        // greetFunction.makeGreet(req.body.userName, req.body.radioLanguage),
        count: await dbLogic.counter(),
        errors: errorMessage,
        resetCounter: reset
        

    },
    );
});

app.post('/greetings', async function (req, res) {
    console.log(dbLogic.counter())


    greetFunction.getNameCounter(req.body.userName);
    // console.log(greetFunction.setErrors(req.body.userName, req.body.radioLanguage));
    // greetFunction.counter();
    //  console.log(greeted);



    dbLogic.addName(req.body.userName);
    greetFunction.makeGreet(req.body.userName, req.body.radioLanguage);
    req.flash('error', greetFunction.setErrors(req.body.userName, req.body.radioLanguage));
    req.flash('info', greetFunction.getGreeting());

    res.redirect('/');

});

app.get('/greeted', async function (req, res) {
    // console.log(dbLogic.getGreetedNames())
    res.render('greeted', {
        names_greeted: dbLogic.getGreetedNames()
        // greetFunction.objectListNames(),
        // errors: greetFunction.setErrors(req.body.userName, req.body.radioLanguage)
    }
    );


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
app.post('/reset', async function (req, res) {
    const resetCounter = await dbLogic.clearDbTable()
    req, flash('resetMessage', "The counter will now reset")

    res.redirect('/');

})


// app.get('/the-route', function (req, res) {
//     req.flash('info', 'Flash Message Added');
//     res.redirect('/');
// });

const PORT = process.env.PORT || 3015;

app.listen(PORT, function () {
    console.log("App started at port", PORT);
});
