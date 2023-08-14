export default function Greet() {

    var tempStorageOfNames = {};

    let greeting = "";
    let name = "";
    let amountGreeted = 0;

    function makeGreet(name1, language) {
        if (name1.match(/^[a-zA-Z]+$/)) {
            name = name1.charAt(0).toUpperCase() + name1.slice(1).toLocaleLowerCase()
            if (language == 'english') {
                greeting = 'Hello, ' + name
            }
            if (language == 'afrikaans') {
                greeting = 'Hallo, ' + name
            }
            if (language == 'xhosa') {
                greeting = 'Molo, ' + name
            }
        }
    }
    function getGreeting() {
        return greeting
    }



    function getNameCounter(name) {
        // name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        if (tempStorageOfNames[name] === undefined) {
            tempStorageOfNames[name] = 0;
            amountGreeted++
        }
        tempStorageOfNames[name] += 1;
        // return amountGreeted;

        // else{
        //     amountGreeted += 0;
        //     return amountGreeted
        // }

    };
    function objectListNames() {
        var newList = Object.keys(tempStorageOfNames)
        // console.log(newList);
        return newList;
    }

    function counter() {

        return amountGreeted
    };
    function getCounter(nameOfUser) {
        let namesCounter = tempStorageOfNames[nameOfUser]
        return namesCounter;
        // console.log(amountGreeted);
        // return amountGreeted
    }

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
        else if (!name && checkedBtn) {
            message = "Please select a language"
        }
        else if (!checkedBtn && name) {
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
        counter,
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



