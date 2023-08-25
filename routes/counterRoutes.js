export default function CounterRoutes(dbLogic,greetFunction) {
    async function total(req, res) {


        res.render('counter', {
            nameCounter: await dbLogic.updateAndInsertName(),
        }
        );
    }

    async function userTotal (req, res) {

        const user_name = req.params.user_name;
        const userCount = await dbLogic.userCounter(user_name);
        let counter = await dbLogic.updateAndInsertName();
        console.log(user_name);
        console.log(userCount);


        res.render('counter', {
            userCount,
            user_name,
            counter
        });
    }
    async function resetCounter(req, res) {

        req.flash('resetMessage', greetFunction.alertForResetBtn());
    
        await dbLogic.clearDbTable()
    
        res.redirect('/');
    
    }

    return {
        total,
        userTotal,
        resetCounter
    }
}