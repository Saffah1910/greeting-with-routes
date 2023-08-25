export default function Greet(db) {

    var tempStorageOfNames = {};

    let greeting = "";
    let name = "";
    // let language = "";
    let amountGreeted = 0;

    async function makeGreet(name1, language) {
        if (name1.match(/^[a-zA-Z]\S+$/)) {
            name = name1.charAt(0).toUpperCase() + name1.slice(1).toLowerCase()
            if (language == 'english' && name !== "") {
                greeting = 'Hello, ' + name
            }
            if (language == 'afrikaans' && name !== "") {
                greeting = 'Hallo, ' + name
            }
            if (language == 'xhosa' && name !== "") {
                greeting = 'Molo, ' + name
            }
        }
        return true;
    }

    function getGreeting() {
        return greeting
    }
    function getNameCounter(name) {
        if (name.trim() !== "") { // Check if the trimmed name is not an empty string
            const lowercaseName = name.toLowerCase(); // Convert the name to lowercase

            if (tempStorageOfNames[lowercaseName] === undefined) {
                tempStorageOfNames[lowercaseName] = 0;
                amountGreeted++;
            }

            tempStorageOfNames[lowercaseName] += 1;
        }
    }

    // function getNameCounter(name) {
    //     const lowercaseName = name.toLowerCase(); // Convert the name to lowercase

    //     if (tempStorageOfNames[lowercaseName] === undefined && lowercaseName !== "") {
    //         tempStorageOfNames[lowercaseName] = 0;
    //         amountGreeted++;
    //     }

    //     tempStorageOfNames[lowercaseName] += 1;
    // }




    function objectListNames() {
        var newList = Object.keys(tempStorageOfNames)
        console.log(newList);
        return newList;
    }

    // function counter() {

    //     return amountGreeted
    // };
    function getCounter(nameOfUser) {
        let namesCounter = tempStorageOfNames[nameOfUser]
        return namesCounter;
        // console.log(amountGreeted);
        // return amountGreeted
    };

    function getGreetedNames() {
        return tempStorageOfNames
    };


    function userCount(name) {
        for (const user in tempStorageOfNames) {
            if (user === name) {
                const element = tempStorageOfNames[user];
                return element;
            }
        }
    }


    function setErrors(name, checkedBtn) {

        let message = "";

        if (!name && !checkedBtn) {
            message = "Please enter a name & select a language"
        }
        else if (name && !checkedBtn) {
            message = "Please select a language"
        }
        else if (checkedBtn && !name) {
            message = "Please enter a name"
        }

        return message;
    };

    function clearRadioButtons() {
        var langChecked = document.querySelectorAll("input[type=radio]");
        for (var i = 0; i < langChecked.length; i++) {
            langChecked[i].checked = false;
        }
    };
    function alertForResetBtn() {

        return "You have successfully reset the counter"
    };

    function addGreen() {
        return "green"
    };
    function validData(name) {
        let regEx = /^[a-zA-Z]\S+$/
        return regEx.test(name)
    };
    function invalidMessage(name) {
        if (validData(name) == false) {
            return "Enter alphabets only"
        }
    };
    function addRed() {
        return "red"
    };
    return {
        // selectedLanguage,
        getNameCounter,
        // counter,
        getCounter,
        getGreetedNames,
        setErrors,
        alertForResetBtn,
        addGreen,
        clearRadioButtons,
        validData,
        invalidMessage,
        addRed,
        makeGreet,
        getGreeting,
        objectListNames,
        userCount


        // getSelectedLanguages
    };
}



