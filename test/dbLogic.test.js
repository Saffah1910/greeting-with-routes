import assert from 'assert';
// import Greet from '../greet-factory.js';
import namesQuery from '../service/query.js';
import pgPromise from 'pg-promise';
import 'dotenv/config';
import { after } from 'mocha';



const pgp = pgPromise({})
const connectionString = process.env.DATABASE_URL;
const db = pgp(connectionString);

const query = namesQuery(db);

describe('namesQuery', function () {
    this.timeout(20000);

    beforeEach(async function () {
        await db.none("DELETE FROM greeting_table")
    })


    it('updates and inserts a name', async () => {
  
        it('updates and inserts a name', async () => {
            const name = 'saffah'
        
            // Assuming query.updateAndInsertName returns a Promise indicating success or failure
            const success = await query.updateAndInsertName(name);
        
            // Assert that the update operation was successful
            assert.isTrue(success);
        
            // Now, you could query the database to check if the update has been applied
            const updatedRecord = await db.oneOrNone(
                "SELECT * FROM greeting_table WHERE LOWER(names) = $1",
                ['saffah']
            );
        
            // Assert that the record was updated as expected
            assert.strictEqual(updatedRecord.amount_greeted, expectedNewAmount);
        });
        
    });

    it('gets all greeted names', async () => {
        const query = namesQuery(db);
        const greetedNames = await query.getGreetedNames();
    });

    it('returns the total counter', async () => {
        const query = namesQuery(db);
        const totalCount = await query.counter();
    });


    it("should not update or insert for an invalid name", async function () {
        const invalidName = '123HI';
    
        // Assuming query.updateAndInsertName returns a Promise indicating success or failure
        const success = await query.updateAndInsertName(invalidName);
    
        // Assert that the update operation was not successful
        assert.strictEqual(success, false);
    
        // Now, query the database to check if any changes were made
        const updatedRecord = await db.oneOrNone(
            "SELECT * FROM greeting_table WHERE LOWER(names) = $1",
            ['123HI']
        );
    
        // Assert that no record exists for the invalid name
        assert.strictEqual(updatedRecord, null);
    });


    it("should clear the counter when the reset button is clicked", async function(){
        // Insert names and get initial user counts
        await query.updateAndInsertName('asiphe');
        await query.updateAndInsertName('saffah');
        
        const initialResults = await query.getGreetedNames();
    
        const initialUsers = 
        {
          asiphe: 1,
          saffah: 1
        };
        
        assert.deepEqual(initialResults, initialUsers);
    
        // Clear the database table
        await query.clearDbTable();
    
        // Call updateAndInsertName again and expect an empty object
        const resetResults = await query.updateAndInsertName();
    
        const resetUsers = {};
        
        assert.deepEqual(resetResults, resetUsers);
    });
    
    
    
    

    // after(function(){
    //     debugPort.$pool.end;
    // });

});