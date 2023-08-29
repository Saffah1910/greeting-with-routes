export default function namesQuery(db) {


    async function updateAndInsertName(username) {
        if (!username || !/^[A-Za-z]+$/.test(username)) {
            return false; // Return if the username is empty or contains non-alphabet characters
        }

        // Convert the username to lowercase to handle case-insensitivity
        const name = username.toLowerCase();

        // Check if the lowercase name exists in the database
        const existingName = await db.oneOrNone(
            "SELECT names FROM greeting_table WHERE LOWER(names) = $1",
            [name]
        );

        if (existingName) {
            // Update count for existing name
            await db.none(
                "UPDATE greeting_table SET amount_greeted = amount_greeted + 1 WHERE LOWER(names) = $1",
                [name]
            );
        } else {
            // Insert new name with count 1
            await db.none(
                "INSERT INTO greeting_table (names, amount_greeted) VALUES ($1, $2)",
                [name, 1]
            );
        }
    }



    async function getGreetedNames() {

        try {
            let results = await db.any("SELECT names FROM greeting_table WHERE amount_greeted > 0");
            // console.log(results);
            return results;
        } catch (error) {
            console.error("Error fetching greeted names:", error);
            return []; // Return an empty array or handle the error as appropriate
        }
    }


    //this function is for the big counter 
    async function counter() {

        let results = await db.any("SELECT COUNT(*) from greeting_table");
        return results[0].count; // Access the count value from the result

    }

    //this function is for the counter of each user
    async function userCounter(name) {
        let results = await db.oneOrNone("SELECT amount_greeted FROM greeting_table WHERE names = $1", [name]);
     
    console.log(results);
     return results;
    }

    //everytime a user is greeted the table gets updated
    async function updateCounter(name) {
        await db.none("UPDATE amount_greeted SET amount_greeted + 1 WHERE names = $1 ", [name])
    }

    //tnis function should clear the table if the reset button is clickec
    async function clearDbTable() {
        await db.none("DELETE FROM greeting_table")
    }


    return {
        // addName,
        updateAndInsertName,
        getGreetedNames,
        counter,
        userCounter,
        updateCounter,
        clearDbTable
        // updateName


    }
}