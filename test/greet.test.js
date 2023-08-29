// import assert from 'assert';
// // import Greet from '../greet-factory.js';
// import namesQuery from '../service/query.js';
// import pgPromise from 'pg-promise';
// import { beforeEach } from 'mocha';
// import 'dotenv/config';



// const pgp = pgPromise({})
// const connectionString = process.env.DATABASE_URL;
// const db = pgp(connectionString);


// // describe("Greet function", function () {
// //     describe("Inputs", function () {

// //         it("if the name Amy is entered into the textbox and the language Xhosa is selected at the radio button return the message Molo, Amy", function () {
// //             var greetTests = Greet();
// //             assert.equal("", greetTests.getGreeting('amy', 'xhosa'));
// //         });

// //         it('if the name Bob is entered into the textbox and the language English is selected at the radio button return the message Hello, Bob', function () {
// //             var greetTests = Greet();
// //             assert.equal("", greetTests.getGreeting("bob", "english"));

// //         });
// //         it('if the name Peter is entered into the textbox and the language Afrikaans is selected at the radio button return the message Hallo, Peter', function () {
// //             var greetTests = Greet();
// //             assert.equal("", greetTests.getGreeting("peter", "afrikaans",));

// //         });
// //     });



// //     describe("Errors", function () {
// //         it('if no name and no languge is selected return message : Please enter a name & select a language', function () {
// //             var greetTests = Greet();
// //             assert.equal("Please enter a name & select a language", greetTests.setErrors("", ""));
// //         });
// //         it("if no name is entered but only a language is selected return message : Please enter a name", function () {
// //             var greetTests = Greet();
// //             assert.equal("Please enter a name", greetTests.setErrors("", !""));
// //         });
// //         it("if no language is selected but name is entered return the message : Please select a language", function () {
// //             var greetTests = Greet();
// //             assert.equal("Please select a language", greetTests.setErrors(!"", ""));
// //         });

// //     });

// //     describe("Return the right class for each error message", function () {
// //         it("should return a class name of 'red' if there is an no/invalid data is entered", function () {
// //             let greetTests = Greet();

// //             assert.equal("red", greetTests.addRed())
// //         });
// //         it("should return a class name of 'green' if the counter has successfully reset", function () {
// //             let greetTests = Greet();
// //             assert.equal("green", greetTests.addGreen());
// //         });

// //     });
// // });


// describe('namesQuery', () => {

    
//     beforeEach(async function(){
//         await db.none("DELETE FROM greeting_table")
//     })


//     it('updates and inserts a name', async () => {

//         const updateNames = await query.updateAndInsertName(name);

//         assert.equal(updateNames.name, 'saffah')
//     });

//     it('retrieves greeted names', async () => {
//         const query = namesQuery(db);
//         const greetedNames = await query.getGreetedNames();
//     });

//     it('returns the total counter', async () => {
//         const query = namesQuery(db);
//         const totalCount = await query.counter();
//     });

//     it("should not update or insert for an invalid name", async function () {
//         // Call the function with an invalid name
//         await query.updateAndInsertName("123", dbStub);

//         // Assert that no database methods were called
//         assert.isTrue(dbStub.oneOrNone.notCalled);
//         assert.isTrue(dbStub.none.notCalled);
//     });

// });