import React from 'react'
import Button from './Button.js'
import { calc } from './calc.js'

function Buttons({ divType, buttonHandler }) {
  var button = [];
  const numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "decimal"]
  const operators = ['add', 'subtract', 'multiply', 'divide', 'equals', 'erase', 'clear'];

  if(divType === "number"){
    for (let number in numbers){
      button.push(<Button key={numbers[number]} idName={numbers[number]} show={calc[numbers[number]]} type="number" buttonHandler={buttonHandler}/>)
    }
  } else {
    for (let operator in operators){
      button.push(<Button key={operators[operator]} idName={operators[operator]} show={calc[operators[operator]]} type="operator" buttonHandler={buttonHandler} />)
    }
  }

  return (
    <div id={divType+"-div"}>
      {button}
    </div>
  )
}

export default Buttons