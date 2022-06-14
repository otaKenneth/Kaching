var states = [];

function validation(data, key) {
    var validations = data.validation.split("|").reverse();
    validations.map((validateData) => {

        var result = data.result;
        if (validateData.indexOf("(") > -1) {
            var compareVal = /\(([^)]+)\)/.exec(validateData)[1];
            validateData = validateData.substr(0, validateData.indexOf("("));
            switch (validateData) {
                case "pregMatch":
                    result = pregMatch(data.value, compareVal)
                    break;
                case "equalTo":
                    result = equalTo(data.value, compareVal)
                default:
                    result = true;
                    break;
            }
        } else {
            switch (validateData) {
                case "required":
                    result = required(data.value)
                    break;
                case "email":
                    result = email(data.value)
                    break;
                case "password":
                    result = password(data.value)
                    break;
                case "number":
                    result = number(data.value)
                    break;
                case "selection":
                    result = selection(data.value)
                    break;
                default:
                    result = true;
                    break;
            }
        }
        if (!result) {
            var error_str = validation_arr[validateData];
            error_str = error_str.replace("$input", data.fieldName);
            error_str = error_str.replace("$compare", compareVal);
            data.error = error_str;
            data.result = false;
        } else {
            if (data.result == null) {
                data.result = true;
            }
        }
    })
    return data;
}

function required(val) {
    return val == "" ? false:true;
}

function pregMatch(val, compare) {
    var compare = new RegExp(compare);
    return val.match(compare);
}

function equalTo(val, compare) {
    return states[compare].value == val;
}

function email (val) {
    return val.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
}

function password (val) {
    return val.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm);
}

function number (val) {
    return val.match(/[0-9]/);
}

function selection (val) {
    return val.toLowerCase().match("select") ? false:true;
}

export default function validate (validate_arr) {
    states = validate_arr; var results = {};
    
    for (const key in states) {
        if (Object.hasOwnProperty.call(states, key) && typeof(states[key]) == 'object') {
            const data = states[key];
            data.result = null;
            validation(data, key);
            results = {...validate_arr};
        }
    }
    
    return results;
}

const validation_arr = {
    'required': "$input is required.",
    'pregMatch': "$input did not meet the requirements.",
    'password': "$input did not meet the requirements.",
    'equalTo': "$input is not equal to $compare.",
    'email': "Invalid $input.",
    'number': "$input must only contain a number.",
    'selection': "$input is required.",
}