const previousAnswer = document.querySelector('.previous-answer');
const currentAnswer = document.querySelector('.current-answer');
const temporaryResult = document.querySelector('.temporary-result');
const numbers = document.querySelectorAll('.numbers');
const operation = document.querySelectorAll('.operation');
const equalE = document.querySelector('.equal');
const clear = document.querySelector('.clear');
const allClear = document.querySelector('.all-clear');

let previousAnsNum = '';
let currentAnsNum = '';
let result = null;
let lastOperation = '';
let haveDot = false;

numbers.forEach(number => {
    number.addEventListener('click',(e)=>{
        if (e.target.innerText === '.' && !haveDot){
            haveDot = true;
        } else if (e.target.innerText === '.' && haveDot){
            return;
        }
        currentAnsNum += e.target.innerText;
        currentAnswer.innerText =  currentAnsNum;
    })
})

operation.forEach(operation => {
    operation.addEventListener('click', (e)=>{
        if (!currentAnsNum) return;
        haveDot = false;
        const operationName = e.target.innerText;
        if (previousAnsNum && currentAnsNum && lastOperation){
            mathOperation();
        } else {
            result = parseFloat(currentAnsNum);
        }
        clearNum(operationName);
        lastOperation = operationName;
    })
})

function clearNum(name = ''){
    previousAnsNum += currentAnsNum + ' ' + name + ' ';
    previousAnswer.innerText = previousAnsNum;
    currentAnswer.innerText = '';
    currentAnsNum = '';
    temporaryResult.innerText = result;
}

function mathOperation(){
    if(lastOperation === 'X'){
        result = parseFloat(result) * parseFloat(currentAnsNum);
    } else if (lastOperation === '+'){
        result = parseFloat(result) + parseFloat(currentAnsNum);
    } else if (lastOperation === '-'){
        result = parseFloat(result) - parseFloat(currentAnsNum);
    } else if (lastOperation === '÷'){
        if (currentAnsNum === '0'){
            alert("Don't divide by 0");
            clearNum('÷');
            currentAnsNum = '';
            currentAnswer.innerText = '';
            previousAnsNum = '';
            previousAnswer.innerText = '0';
        } else {
            result = parseFloat(result) / parseFloat(currentAnsNum);
        }
    } else if (lastOperation === '%'){
        result = parseFloat(result) % parseFloat(currentAnsNum);
    }
}

equalE.addEventListener('click', (e) => {
    if (!previousAnsNum || !currentAnsNum) return;
    haveDot = false;
    mathOperation();
    clearNum();
    currentAnswer.innerText = result;
    temporaryResult.innerText = '';
    currentAnsNum = result;
    previousAnsNum = '';
})

allClear.addEventListener('click', (e) => {
    previousAnswer.innerText = '0';
    currentAnswer.innerText = '0';
    currentAnsNum = '';
    previousAnsNum = '';
    temporaryResult.innerText = '0';
})

clear.addEventListener('click',  (e) => {
        currentAnswer.innerText = '';
        currentAnsNum = '';
})

document.addEventListener('keydown', (e) => {
    if (
        e.key === '0' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9' ||
        e.key === '.' 
        ){
            clickButton(e.key);
        } else if (
            e.key === '+' ||
            e.key === '-' ||
            e.key === '%' 
        ) {
            clickOperation(e.key);
        } else if (e.key === '*') {
            clickOperation('X');
        } else if (e.key === '/'){
            clickOperation('÷');
        } else if (e.key === '=' || e.key === 'Enter'){
            clickEqual();
        }
});

function clickButton(key){
    numbers.forEach(button => {
        if(button.innerText === key){
            button.click();
        }
    })
}

function clickOperation(key){
    operation.forEach(button => {
        if(button.innerText === key){
            button.click();
        }
    })
}

function clickEqual(){
    equalE.click();
}