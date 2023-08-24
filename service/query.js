export default function namesQuery(db) {

    //this function adds the name to the table
    async function addName(name) { 

        if(name) {
            await db.none("insert into greeting_table (names, amount_greeted) values ($1,$2)", [name, 1])
        }
    }

    //getGreetedNames select names from the table in order to get all the names that have been greated
    async function getGreetedNames() {
        let results = await db.any("SELECT names FROM greeting_table");
        return results.rows
    }

    //this function is for the big counter 
    async function counter() {

            let results = await db.any("SELECT COUNT(*) from greeting_table");
            return results[0].count; // Access the count value from the result
        
        // return results.rows
    }


    // async function counter() {
    //     let results = await db.any("SELECT COUNT(*) from greeting_table WHERE amount_greeted > 0");
    //     return results[0].count; // Access the count value from the result
    // }

    //this function is for the counter of each user
    async function userCounter(name) {
        let results = await db.any("SELECT amount_greeted from greeting_table where names = $1", [name]);
        return results.rows
    }

    //everytime a user is greeted the table gets updated
    async function updateCounter(name) {
        await db.none("UPDATE amount_greeted SET amount_greeted + 1 WHERE names = $1 ", [name])
    }

    // async function updateCounter(name) {
    //     await db.none("UPDATE greeting_table SET amount_greeted = amount_greeted + 1 WHERE names = $1", [name]);
    // }
    


    //tnis function should clear the table if the reset button is clickec
    async function clearDbTable() {
        await db.none("DELETE FROM greeting_table")
    }


    return {
        addName,
        getGreetedNames,
        counter,
        userCounter,
        updateCounter,
        clearDbTable

    }
}