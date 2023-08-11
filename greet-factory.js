export default function Greet() {

    // var tempStorageOfNames = namesIn || {};

    // let greetNames = "";
    // function selectedLanguage(lang, names) {
    //     var userNames = names;

    //     if (lang === "english" && names !== "") {

    //         return "Hello, " + userNames.charAt(0).toUpperCase() + userNames.slice(1).toLowerCase();
    //     }

    //     if (lang === "afrikaans" && names !== "") {

    //         return "Hallo, " + userNames.charAt(0).toUpperCase() + userNames.slice(1).toLowerCase();
    //     }

    //     if (lang === "xhosa" && names !== "") {

    //         return "Molo, " + userNames.charAt(0).toUpperCase() + userNames.slice(1).toLowerCase();
    //     }

    // }
    // function selectedLanguage(lang, names) {
    //     // if (names !== '') {
    //         if (lang == "english") {
    //             // var userNames = names.charAt(0).toUpperCase() + names.slice(1).toLowerCase();
    //             greetNames = "Hello, " + names

    //         }
    //         if (lang == "afrikaans") {
    //             greetNames = "Hallo, " + names

    //         }
    //         if (lang == "xhosa") {
    //             greetNames = "Molo, " + names

    //         // }
    //     }
    // }
    // function getSelectedLanguages() {
    //     return greetNames
    // }

let greeting = "";
let name = "";

    function makeGreet(name1, language) {
        if (name1.match(/^[a-zA-Z]+$/)) {
            name = name1.charAt(0).toUpperCase() + name1.slice(1).toLocaleLowerCase()
            if (language == 'english') {
                greeting = 'Hello, ' + name
            }
            if (language == 'swahili') {
                greeting = 'Jambo, ' + name
            }
            if (language == 'isiXhosa') {
                greeting = 'Molo, ' + name
            }
        }
    }
    function getGreeting() {
        return greeting
    }





    function getNameCounter(name) {
        name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        if (tempStorageOfNames[name] === undefined) {
            tempStorageOfNames[name] = 1
        }
    }

    function counter() {
        var newList = Object.keys(tempStorageOfNames)
        console.log(newList);
        return newList.length;
    };

    function getGeetedNames() {
        return tempStorageOfNames
    };


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
        getGeetedNames,
        setErrors,
        alertForResetBtn,
        addGreen,
        clearRadioButtons,
        validData,
        invalidMessage,
        addRed,
        makeGreet,
        getGreeting


        // getSelectedLanguages
    };
}



