import assert from 'assert';
import namesQuery from '../service/query.js';
import pgPromise from 'pg-promise';
import 'dotenv/config';

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
        
            const success = await query.updateAndInsertName(name);
        
            assert.isTrue(success);
        
            const updatedRecord = await db.oneOrNone(
                "SELECT * FROM greeting_table WHERE LOWER(names) = $1",
                ['saffah']
            );
        
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
    
        const success = await query.updateAndInsertName(invalidName);
    
        assert.strictEqual(success, false);
    
        const updatedRecord = await db.oneOrNone(
            "SELECT * FROM greeting_table WHERE LOWER(names) = $1",
            ['123HI']
        );
    
        assert.strictEqual(updatedRecord, null);
    });


    it("should clear the counter when the reset button is clicked", async function(){
        await query.updateAndInsertName('saffah');
        let initialResults = await query.counter();
        assert.equal(initialResults, 1);
        await query.clearDbTable()
        let resetResults = await query.counter();
        assert.equal(resetResults, 0);
    });
});