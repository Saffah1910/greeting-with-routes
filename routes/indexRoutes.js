export default function HomeRoute(dbLogic) {
    async function get (req, res) {
        let greetName = req.flash('info')[0];
        let errorMessage = req.flash('error')[0];
        let reset = req.flash('resetMessage')[0];
        let count = await dbLogic.counter(req.body.userName);

        let people = !errorMessage;

        res.render('index', {
            greeting: people ? greetName : "",
            count,
            errors: errorMessage,
            reset
        });
    };
    return {
        get
    }
    

}

