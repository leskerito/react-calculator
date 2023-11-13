import React, {useState, useEffect} from 'react'
import Buttons from './Buttons';

export default function Calculator() {
    const [currentExpression, setCurrentExpression] = useState("0");
    const [expElements, setExpElements] = useState([]);

    const sanitize = (dirtyArray) => {
        let expArray = [...dirtyArray];
        for (let i = 0; i < expArray.length; i++){
            if (isNumber(expArray[i])){
                    expArray[i] = expArray[i].replace(/[[.]{2,}/, '.');
                    if(expArray[i][0] === '0' && expArray[i].length > 1) expArray[i] = expArray[i].slice(1);
            } else if(isOperator(expArray[i])){
                if(isOperator(expArray[i+1])){
                    if(expArray[i+1] !== '-') expArray.splice(i, 1);
                    else if(isOperator(expArray[i+2])) expArray.splice(i, 2)
                }
            }
            else 
                return [];
        }
        return expArray;
    }

    const evaluate = (dirtyArray) => {
        if(dirtyArray === undefined) return '0'
        try {
            let cleanArray = sanitize(dirtyArray);
            const expression = cleanArray.join('');
            let result = String(eval(expression))
            if(result === undefined)
                return cleanArray.join('')
            return result
        } catch (TypeError) {
            alert("Are you sure about that expression?")
            return "0"
        }
    }

    const isOperator = (entry) => {
        return entry.match(/(^\+$)|(^-$)|(^\*$)|(^\/$)/)
    }

    const isNumber = (entry) => {
        return /^[-]{0,1}[0-9]+([.]+[0-9]+)*$/.test(entry);
    }

    const typeHandler = (event) => {
        var key = event.key
        if(isOperator(key) || isNumber(key))
            handleButton(key)
        else switch(key){
            case "Enter":
                handleButton("=");
                break;
            case "Backspace":
                handleButton("E");
                break;
            case "Delete":
                handleButton("Clear");
                break;
            case '.':
                handleButton('.');
                break;
            default:
                console.log(":thinkemoji:");
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', typeHandler);

        return () => document.removeEventListener('keydown', typeHandler)
    });

    const handleButton = (entry) => {
        switch(entry){
            case '.':
                if(!currentExpression.includes('.')) setCurrentExpression(prevExpression => prevExpression+entry);
                break;
            case 'E':
                currentExpression.length > 1 ? setCurrentExpression(currentExpression.slice(0, -1)) : setCurrentExpression('0');
                break;
            case 'Clear':
                setCurrentExpression('0');
                setExpElements([]);
                break;
            case '-':
            case '+':
            case '*':
            case '/':
                let opExp = [].concat(expElements);
                opExp.push(currentExpression);
                setExpElements(opExp);
                setCurrentExpression(entry);
                break;
            case '=':
                let eqExp = [].concat(expElements);
                eqExp.push(currentExpression);
                let exp = evaluate(eqExp)
                setExpElements([])
                setCurrentExpression(exp);
                break;
            default:
                if(currentExpression === '0') setCurrentExpression(entry) 
                else if (isOperator(currentExpression)){
                    if(currentExpression === '-') setCurrentExpression(prevExpression => prevExpression+entry);
                    else {
                        let opExp = [].concat(expElements);
                        opExp.push(currentExpression);
                        setExpElements(opExp);
                        setCurrentExpression(entry);
                    }
                    break;
                } else setCurrentExpression(prevExpression => prevExpression+entry);
                break;
        }
    }
    

  return (
    <div id="calculator">
        <br />
        <h1 id="display">
            {currentExpression}
        </h1>
        <div id='buttons-container'>
            <Buttons divType="number" buttonHandler={handleButton} typeHandler={typeHandler}/>
            <Buttons divType="operators" buttonHandler={handleButton} typeHandler={typeHandler}/>
        </div>
    </div>
  )
}
