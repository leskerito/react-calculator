import {useState, React} from 'react'
import Buttons from './Buttons';

export default function Calculator() {
    const [currentExpression, setCurrentExpression] = useState("0");

    const evaluate = (expression) => {
        if(expression === undefined) return '0'
        try {
            console.log(expression)
            return eval(expression)
        } catch (error) {
            alert(error);
            return "0"
        }
    }

    const handleButton = (entry, arithmArray = []) => {
        
        switch(entry){
            case 'E':
                currentExpression.length > 1 
                ? setCurrentExpression(prevExpression => prevExpression.slice(0, -1))
                : setCurrentExpression('0');
                break;
            case 'C':
                setCurrentExpression('0');
                arithmArray = [];
                break;
            case '=':
                console.log(arithmArray)
                break;
            case '/':
            case '*':
            case '-':
            case '+':
                arithmArray.push(currentExpression)
                console.log(arithmArray)
                setCurrentExpression(prevExpression => prevExpression+entry)
                break;
            default:
                if(currentExpression === "0")
                    setCurrentExpression(entry)
                else
                    setCurrentExpression(prevExpression => prevExpression + entry)
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
