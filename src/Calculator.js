import React, {useState} from 'react'
import Buttons from './Buttons';

export default function Calculator() {
    const [currentExpression, setCurrentExpression] = useState("0");
    const [expElements, setExpElements] = useState([]);

    const sanitize = (dirtyArray) => {
        let expArray = [...dirtyArray];
        for (let exp in expArray){
            if (isNumber(expArray[exp])){
                expArray[exp].replace(/[^0[1-9]]/, '');
            }
        }
        return expArray;
    }

    const evaluate = (dirtyArray) => {
        if(dirtyArray === undefined) return '0'
        console.log(dirtyArray)
        let cleanArray = sanitize(dirtyArray);
        const expression = cleanArray.join('');
        try {
            return String(eval(expression))
        } catch (error) {
            console.error(error);
            return "0"
        }
    }

    const isOperator = (entry) => {
        return entry.match(/(^\+$)|(^-$)|(^\*$)|(^\/$)/)
    }

    const isNumber = (entry) => {
        return entry.match(/[0-9]+/g);
    }

    const handleButton = (entry) => {
        
        /*
        switch(entry){
            case '.':
                if(currentExpression[currentExpression.length-1] !== '.') setCurrentExpression(prevExpression => prevExpression+entry)

                break;
            case 'E':
                currentExpression.length > 1 
                ? setCurrentExpression(prevExpression => prevExpression.slice(0, -1))
                : setCurrentExpression('0');
                break;
            case 'C':
                setCurrentExpression('0');
                break;
            case '=':
                setCurrentExpression(() => evaluate(currentExpression));
                break;
            case '/':
            case '*':
            case '-':
            case '+':
                setExpElements(expElements => expElements.push(currentExpression))
                setCurrentExpression(prevExpression => prevExpression+entry)
                break;
            case '0':
                currentExpression === '0' ? setCurrentExpression('0') : setCurrentExpression(prevExpression => prevExpression+entry)
                break;
            default:
                if(currentExpression === "0")
                    setCurrentExpression(entry)
                else
                    setCurrentExpression(prevExpression => prevExpression + entry)
                break;
        }
        */

        switch(entry){
            case 'E':
                currentExpression.length > 1 ? setCurrentExpression(currentExpression.slice(0, -1)) : setCurrentExpression('0');
                break;
            case 'C':
                setCurrentExpression('0');
                setExpElements([]);
                break;
            case '+':
            case '-':
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
                eqExp = [evaluate(eqExp)]
                setExpElements(eqExp)
                setCurrentExpression(eqExp[0]);
                break;
            default:
                if(currentExpression === '0') setCurrentExpression(entry) 
                else if (isOperator(currentExpression)){
                    let opExp = [].concat(expElements);
                    opExp.push(currentExpression);
                    setExpElements(opExp);
                    setCurrentExpression(entry);
                    break;
                } else setCurrentExpression(prevExpression => prevExpression+entry);
                break;
        }
    }
    

  return (
    <div>
        Calculator
        <br />
        <h1 id="display">
            {currentExpression}
        </h1>
        <Buttons divType="number" buttonHandler={handleButton} />
        <Buttons divType="operators" buttonHandler={handleButton} />
        <br />
        Calculator end
    </div>
  )
}
