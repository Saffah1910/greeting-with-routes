export default function GreetingRoute(dbLogic,greetFunction){
    async function addName (req, res) {


        if (req.body.userName !== "" && req.body.radioLanguage) {
            dbLogic.updateAndInsertName(req.body.userName);
        }
    
        await greetFunction.makeGreet(req.body.userName, req.body.radioLanguage);
        req.flash('error', greetFunction.setErrors(req.body.userName, req.body.radioLanguage));
        req.flash('info', greetFunction.getGreeting());
        
    
        res.redirect('/');
    }
    async function getNameList(req, res) {

        const names_greeted = await dbLogic.getGreetedNames();
        console.log(names_greeted);
    
        res.render('greeted', {
            names_greeted: names_greeted
        });
    }



    return {
        addName,
        getNameList
    }
}
