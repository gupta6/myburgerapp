export const checkValidity = (value, rules) => {
    let isValid = false;
    let check1, check2, check3 = false;
    
    if(rules.required){
        check1 = value.trim() !== '';
    }

    if(rules.lengthCheck){
        if(rules.lengthCheck.length){
            check2 = value.length === rules.lengthCheck.length;
        }
        else if(rules.lengthCheck.maxLength){
            check2 = value.length < rules.lengthCheck.maxLength && value.length > rules.lengthCheck.minLength
        }        
    }

    if(rules.regexCheck){
        let regex = new RegExp(rules.regexCheck.regex);
        check3 = regex.test(value);
    }

    if(rules.required && rules.lengthCheck && rules.regexCheck){
        isValid = check1 && check2 && check3;
    }
    else if(rules.lengthCheck){
        isValid = check1 && check2;
    }
    else if(rules.regexCheck){
        isValid = check1 && check3;
    }
    else{
        isValid = check1;
    }

    return isValid;
    
}