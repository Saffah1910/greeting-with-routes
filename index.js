import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import Greet from './greet-factory.js';
import flash from 'express-flash';
import session from 'express-session';
import pgPromise from 'pg-promise';
import 'dotenv/config';
import namesQuery from './service/query.js';

import HomeRoute from './routes/indexRoutes.js';
import greetingRoute from './routes/greetingRoutes.js';
import CounterRoutes from './routes/counterRoutes.js';


const pgp = pgPromise({})
const connectionString = process.env.DATABASE_URL;
const db = pgp(connectionString);

const app = express();
const greetFunction = Greet(db);
const dbLogic = namesQuery(db);

const indexRoutes = HomeRoute(dbLogic);
const greetRoute = greetingRoute(dbLogic, greetFunction);
const counter = CounterRoutes(dbLogic,greetFunction);


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


app.get('/', indexRoutes.get);

app.post('/greetings', greetRoute.addName);

app.get('/greeted', greetRoute.getNameList);

app.get('/counter', counter.total,);

app.get('/counter/:user_name', counter.userTotal);

app.post('/reset',counter.resetCounter)


const PORT = process.env.PORT || 3012;

app.listen(PORT, function () {
    console.log("App started at port", PORT);
});
