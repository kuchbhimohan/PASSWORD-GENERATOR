const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");

const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");


const numbersCheck= document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator= document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");

const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


let password ="";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
// set strength circle color to grey


// sets password length
function handleSlider() {

    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;

}



function setIndicator(color) {
    indicator.style.backgroundColor = color;

    // set shadow
} 


function getRndInteger(min, max) {
    return Math.floor(Math.random() *  (max-min )) + min; 

}

function generateRandomNumber() {
    return getRndInteger(0,9);
}

function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65,91));
}

function generatesymbol() {
    const randNum = getRndInteger(0,symbols.length);
    return symbols.charAt[randNum];
}



function calcStrength() {

    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;


    if(uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum || hasSym ) && passwordLength >= 8){
        setIndicator("#0f0");
    } else if(
        (hasLower || hasUpper) && 
        (hasNum || hasSym) &&
        passwordLength >= 6

    ) {
        setIndicator("#ff0");
    } else{
        setIndicator("#f00");
    }

}

async function copyContent() {
    try{
        navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";

    }
    catch(e){
        copyMsg.innerText = "FAILED";
    }

    // TO MAKE COPY VALA SPAN VISIBLE
    copyMsg.classList.add("active");

    setTimeout(  () => {
        copyMsg.classList.remove("active");
    },2000);

}

function shufflePassowrd(array){
    // Fisher yates mehtod to shuffle 
    for(let i = array.length - 1 ; i > 0 ;i--){
        const j = Math.floor(Math.random() * (i+1));

        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    let str ="";
    array.forEach((el) => (str += el));
    return str;

}

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked) { checkCount++};

    });

    // special condition
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange)
})


inputSlider.addEventListener('input',(e) => {
    passwordLength = e.target.value;
    handleSlider();
})




copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value){
        copyContent();
    }
})



generateBtn.addEventListener('click', () => {

    // none of the checlkboxes are selected\
    if(checkCount == 0) 
        return;

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }


    // now making the new password



    // remove old password
    password = "";


    // now put all things mentioned by checkboxes
    // if(uppercaseCheck.checked){
    //     password += generateUpperCase();
    // }

    // if(lowercaseCheck.checked){
    //     password += generateLowerCase();
    // }

    // if(numbersCheck.checked){
    //     password += generateRandomNumber();
    // }

    // if(symbolsCheck.checked){
    //     password += generatesymbol();
    // }


    let funcArr =[];

    if(uppercaseCheck.checked){
        funcArr.push(generateUpperCase);
    }

    if(lowercaseCheck.checked){
        funcArr.push(generateLowerCase);
    }

    if(numbersCheck.checked){
        funcArr.push(generateRandomNumber);
    }

    if(symbolsCheck.checked){
        funcArr.push(generatesymbol);
    }
    // Compulsory additon
    for(let i = 0 ; i < funcArr.length ; i++ ){
        password += funcArr[i]();
    }
    console.log("compulsory addn done");


    // remaining addition

    for(let i = 0 ; i < passwordLength - funcArr.length ;i++){
        let randIndex = getRndInteger(0, funcArr.length);
        console.log("randIndex " + randIndex);
        password += funcArr[randIndex]();
    }

    console.log("remaining addition done");

    // shuffling of password 

    password = shufflePassowrd(Array.from(password));
    console.log("shuffling done");

    // showing in UI
    passwordDisplay.value = password;
    console.log("ui addn done");

    // strength calculation
    calcStrength();
})




















