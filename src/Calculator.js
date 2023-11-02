import {useState, React} from 'react'
import Buttons from './Buttons';

export default function Calculator() {
    const [currentExpression, setCurrentExpression] = useState("0");

    const evaluate = (expression) => {
        try {
            return eval(expression)
        } catch (error) {
            alert(error);
        }
    }

    const handleButton = (entry) => {
        switch(entry){
            case '.':
                if(currentExpression.includes('.')){
                    alert("What would that even mean? No double '.' please!");
                    return
                }
                currentExpression === "0" ? setCurrentExpression(entry) : setCurrentExpression(currentExpression+entry);
                break;
            case '=':
                setCurrentExpression(String(evaluate(currentExpression)));
                break;
            case 'C':
                setCurrentExpression("0");
                break;
            case "E":
                if(currentExpression !== "0") setCurrentExpression(currentExpression.slice(0, -1));
                break;
            case "0":
                if(currentExpression !== '0') setCurrentExpression(currentExpression+entry);
                break;
            default:
                currentExpression === "0" ? setCurrentExpression(entry) : setCurrentExpression(currentExpression+entry);
                break;
        }
    }
    

  return (
    <div>
        Calculator
        <br />
        <div id="display">
            <h1>{currentExpression}</h1>
        </div>
        <Buttons divType="number" buttonHandler={handleButton} />
        <Buttons divType="operators" buttonHandler={handleButton} />
        <br />
        Calculator end
    </div>
  )
}
