# react-calculator
freeCodeCamp React project about creating a calculator.


## how to run

after cloning the repo, run `npm install` to install needed stuff. then you can either `npm run build` and serve in on a static server, or `npm start` then open up a browser page to `localhost:3000`.

## how to use

either click on the buttons with a mouse/finger or enter them directly from the keyboard. "Delete" and "Backspace" are used to respectively, clear everything or erase one. "Enter" is used to evaluate your expression. 

## how it was made

#### framework

+ react
+ css for styling (sass precompiler)

#### components

+ **Calculator**: Includes the display of the calculator, both button groups as well as the actual calculation (__more later__) and the necessary states.
+ **Buttons**: Divides the two types of buttons we can have: operators or numbers then creates them using an array of both types of button and iterating through it.
+ **Button**: Singular button component. Contains the value of the button as well as what it displays and the onClick behavior (check **functions**)

#### states

+ **currentExpression**: Displays the expression input by the user. Resets when an operator is entered.
+ **expElements**: Array of String separating each component of an expression (number and operators).

#### functions 

+ `**sanitize(dirtyArry: array)**`: Cleans an array of expression according to the rules of the exercise.
+ `**evaluate(dirtyArray: array)**`: Evaluates the full array and returns the evaluated expression. To do so, it joins each cells of the array together and calls `eval` on the result.
+ `**isOperator(entry: String)**`: Returns true if the string is *ONLY* an operator and does so using Regex. __Regex expression:__ `entry.match(/(^\+$)|(^-$)|(^\*$)|(^\/$)/)`
+ `**isNumber(entry: String)**`: Returns true if the `entry` is a number, whether `int` or `float`, and does so using Regex. __Regex expression:__ `/^[-]{0,1}[0-9]+([.]+[0-9]+)*$/.test(entry)`
+ `**typeHandler(event: String)**`: Calls `handleButton` according to the key (`event`) pressed by the user.
+ `**handleButton(entry: String)**`: `onClick` behavior for all buttons. Handles any button pressed on the calculator. Updates the states `currentExpression` as well as the array of expression `expElements`.