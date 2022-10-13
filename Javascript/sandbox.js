/*
!=================================
!    JS BASICS
!=================================
*/


let myname = 'giorgos';
let surname = 'zio';

console.log(myname);
console.log(myname[2]);
console.log(myname.length);
console.log(myname.split('r'));
console.log(myname.indexOf('g'));
console.log(myname.slice(0,5)); //from-to
console.log(myname.substring(4,10)); //from 4 to 14
console.log(myname.replace('g','d')); //find the 1st and change it


let radius =10;
const pi = 3.14;

let result = pi * radius**2;


//concat way
let final = "radius equals" +radius+ "and pi" + pi;

//template string way
let final = `radius equals ${radius} and pi ${pi}`;

//html templates
let final = `
<h2>${radius}</h2>
<p> by ${pi}<p>
<span> FUCK YOU ${result}</span>
`;


let ninjas = ['shaun','ryu','chun-li'];
//ninjas[1] = "george";
//console.log(ninjas.length);
//ninjas.join(',');
//ninjas.indexOf('ryu');
ninjas.concat(['shaun','ryu']); //join
console.log(ninjas.concat(['shaun','ryu']));
ninjas.push("pushedit"); //pushes and returns new length
ninjas.pop(); //pops the last value and returns it.



let age = 25;
console.log(age == '25'); //true, transfroms '25' to number before comparision

console.log(age === '25'); //false
// === is strict-comparision , meaning it compares the types also not only the value.



/*
!=================================
!    JS CONTROL FLOW
!=================================
*/

for(let i = 0; i < 5; i++){
    console.log('in loop:', i);
}

while(){

}

if(){

}else if(){

}else{

};

/*
!=================================
!    JS FUNCTIONS
!=================================
*/


function greet(){
console.log('hi');
}
greet();

//funcs expression better way
const speak = function(name="gamisou"){
console.log(`good day ${name}`);
};
speak(); //gamisou
speak('giozio');  //gio zio

//funcs expression even better way
const speak = (name1="gamisou") => {
    console.log(`good day ${name}`);
}

//funcs expression 100iq way 
//(works only with 1 parameter)
const speak = name1 => console.log(`good day ${name}`);
}


//practice arrow funcs

const greet = function(){
    return 'Hello World';
}

//to .....

const greet = () => 'Hello World';


//Passing function in to function
//callback functions
//callbacks and foreach


//In modern JavaScript development, the concepts of functional programming and asynchronous programming become more and more prevalent. When talking about those terms, we usually see something 
//like “callback” or “higher-order function”, for example, the .filter() method accepts a “callback” function and creates a new array for those elements that pass a certain condition
// in the callback function. So what is a callback function and how it can be used, let’s find out.

//Simply put, a callback function is a function that passed as an argument of another function. Later on, it will be involved inside the outer function to complete some kind of action.
//A higher-order function is a function that takes a function as its argument, or returns a function as a result.

//In JavaScript, functions are first-class objects which means functions like any other objects can be passed as an argument of another function. 
//Those functions are not directly executed but rather being executed in latter appropriate time, hence its name “callback” function.

//WHY WE NEED CALLBACK FUNCTIONS?
//OK, I have a basic understanding of the callback concept, so why should I pay my attention to this concept why do I need it? JavaScript is an event-driven language which means
// the flow of the program is determined by events such as a mouse click, reloading the page, etc… When JavaScript code has some events involved, instead of normally line-by-line,
// top-to-bottom execution, and waiting for a line to execute, it just skips the line cannot be executed right away, executes the next lines and moves back in an appropriate time. 
//For better visualization, let’s write our first example:

//document.addEventListener(‘click’,doSomething);

//In this example, we use addEventListiner method to listen to the click event which we pass as a first argument, and the second argument is a callback function named doSomething.
// So, presume this code is on line 40, and when JavaScript encounters this line, the doSomething function isn’t executed right away. But instead, JavaScript will move to the next 
//lines and the doSomething function only being executed when there is a click event.

//When we want to call a function in JavaScript, we just simply write down the function name followed by trailing parentheses (e.g myFunction()). Notice with a callback function, we just
// write a function name without a pair of parenthesis afterward. If we put the pair of parentheses after a callback function, then the function will be executed immediately.


//First off, let’s create a simple function named addition which takes 2 operands and one callback function:

function addition(a, b, callback) {
    let result = callback(a, b);
    console.log("The result is: " + result);
}

//Then we will define a callback function called callback which we later be call in the addition function:

function callback(a, b) {
    return a + b;
}

//Finally we call the addition function:

addition(5, 8, callback);



//or arrowed function expression

let add = (a, b, callback) => {
    let result = callback(a, b);
    console.log("The result is: " + result);
}

//Then we will define a callback function called callback which we later be call in the addition function:

function callback(a, b) {
    return a + b;
}





//What is an Anonymous Function?

//Alternatively, we can define a function directly inside another function, instead of calling it. It will look like this:

setTimeout(function() {  
    console.log("This message is shown after 3 seconds");
}, 3000);

//As we can see, the callback function here has no name and a function definition without a name in JavaScript is called as an “anonymous function”. 
//This does exactly the same task as the example above.


//the above arrowed

setTimeout(() => { 
    console.log("This message is shown after 3 seconds");
}, 3000);






/*
!=================================
!    JS EVENTS
!=================================
*/



//What about Events?
//JavaScript is an event-driven programming language. We also use callback functions for event declarations. For example, let’s say we want users to click on a button:

<button id="callback-btn">Click here</button>

//This time we will see a message on the console only when the user clicks on the button:
document.queryselector("#callback-btn")
    .addEventListener("click", function() {    
      console.log("User has clicked on the button!");
});
//So here we select the button first with its id, and then we add an event listener with the addEventListener method. It takes 2 parameters.
// The first one is its type, “click”, and the second parameter is a callback function, which logs the message when the button is clicked.

//As you can see, callback functions are also used for event declarations in JavaScript.









/*
!=================================
!    JS Promises
!=================================
*/


//alternatives to callbacks , helps readability and conveneienc

//What is a Promise?
//A promise in JavaScript is similar to a promise in real life. When we make a promise in real life, it is a guarantee that we are going to do something in the future.
// Because promises can only be made for the future.

//A promise has 2 possible outcomes: it will either be kept when the time comes, or it won’t.

//This is also the same for promises in JavaScript. When we define a promise in JavaScript, it will be resolved when the time comes, or it will get rejected.

//Promises in JavaScript
//First of all, a Promise is an object. There are 3 states of the Promise object:

//Pending: Initial State, before the Promise succeeds or fails
//Resolved: Completed Promise
//Rejected: Failed Promise


//For example, when we request data from the server by using a Promise, it will be in pending mode until we receive our data.

//If we achieve to get the information from the server, the Promise will be resolved successfully. But if we don’t get the information, then the Promise will be in the rejected state.

//Additionally, if there are multiple requests, then after the first Promise is resolved (or rejected), a new process will start to which we can attach it directly by a method called chaining.


//What is the difference between Callbacks and Promises?
//The main difference between Callback Functions and Promises is that we attach a callback to a Promise rather than passing it. So we still use callback functions with Promises,
// but in a different way (chaining).

//This is one of the greatest advantages of using Promises, but why?

//What is Chaining?

//Callback functions have been used alone for asynchronous operations in JavaScript for many years. But in some cases, using Promises can be a better option.

//If there are multiple async operations to be done and if we try to use good-old Callbacks for them, we’ll find ourselves quickly inside a situation called Callback hell:

firstRequest(function(response) {  
    secondRequest(response, function(nextResponse) {    
        thirdRequest(nextResponse, function(finalResponse) {     
            console.log('Final response: ' + finalResponse);    
        }, failureCallback);  
    }, failureCallback);
}, failureCallback);

//However if we handle the same operation with Promises, since we can attach Callbacks rather than passing them, this time the same code above looks much cleaner and easier to read:

firstRequest()
  .then(function(response) {
    return secondRequest(response);
}).then(function(nextResponse) {  
    return thirdRequest(nextResponse);
}).then(function(finalResponse) {  
    console.log('Final response: ' + finalResponse);
}).catch(failureCallback);

//The code just above shows how multiple callbacks can be chained one after another. Chaining is one of the best features of Promises.



//Creating and Using A Promise Step by Step
//Firstly, we use a constructor to create a Promise object:

const myPromise = new Promise();

//It takes two parameters, one for success (resolve) and one for fail (reject):
const myPromise = new Promise((resolve, reject) => {  
    // condition
});

//Finally, there will be a condition. If the condition is met, the Promise will be resolved, otherwise it will be rejected:
const myPromise = new Promise((resolve, reject) => {  
    let condition;  
    
   if(condition is met) {    
        resolve('Promise is resolved successfully.');  
    } else {    
        reject('Promise is rejected');  
    }
});

//So we have created our first Promise. Now let's use it.

//then( ) for resolved Promises:

//If you revisit the picture at the beginning of this post, you'll see that there are 2 cases: One for resolved promises and one for rejected.
// If the Promise gets resolved (success case), then something will happen next (depends on what we do with the successful Promise).
myPromise.then();
//The then( ) method is called after the Promise is resolved. Then we can decide what to do with the resolved Promise.

//For example, let’s log the message to the console that we got from the Promise:

myPromise.then((message) => {  
    console.log(message);
});



//catch( ) for rejected Promises:
//However, the then( ) method is only for resolved Promises. What if the Promise fails? Then, we need to use the catch( ) method.

//Likewise we attach the then( ) method. We can also directly attach the catch( ) method right after then( ):

myPromise.then((message) => { 
    console.log(message);
}).catch((message) => { 
    console.log(message);
});
//So if the promise gets rejected, it will jump to the catch( ) method and this time we will see a different message on the console.







/*
!=================================
!    JS html Templates
!=================================
*/

const ul = document.querySelector('.people');
const people = ['george','ziozas','sas','gamaw'];
let html = ``;

people.forEach(function(person){
    html+= `<li style="color: purple">${person}</li>`;
});

ul.innerHTML = html;






/*
!=================================
!    JS OBJECTS
!=================================
*/

const blogs = [
    {title:"wtf bro",likes: 30},
    {title:"chill bro",likes: 40}
];
//object literals

let user = {
    name:'george',
    age:30,
    email:"giozio@gm",
    blogs['blog1','toaster'];
    login(){
        console.log("login");
    },
    logout(){
        console.log("logout");
    },
    logblogs(){
        this.blogs.forEach(blog => {
            console.log(`<h1> ${blogs.title} </h1>
                        <h2> ${blogs.likes} </h2>`);
        })
    }

};

console.log(user.name);
user['name'] = 'apateon';
user.logblogs();



//RAND

const random = Math.random();
console.log(Math.round(1 + random * 100));







/*
!=================================
!  JS DOM = DOCUMENT OBJECT MODEL
!=================================
*/


document //see whole doc

document.getElementById('page-banner')
let banner = document.getElementById('page-banner')

titles = document.getElementsByClassName('title') //returns html collection
title_1 = titles[0]

lis = document.getElementsByTagName('li') //returns html collection

for(i=0;i<titles.length;i++){
    console.log(titles[i]);
}

//better way

Array.from(titles).forEach(function(item){
console.log(item);
})



//QUERING

const wrap = document.queryselector('#wrapper');
console.log(wrap);

const wrap = document.queryselector('#book-list li:nth-child(2) .name');
console.log(wrap);


let books = document.querySelectorAll('#book-list li .name');


/*
!=================================
!    JS TEMPLATE LITERALS
!=================================
*/
const me = {
    first: 'George',
    last: 'ziozas',
    age: 30,
    address: '4 private drive',
};

console.log(`${me.first} ${me.last} is ${me.age} and lives at ${me.address}`)

/*
!=================================
!    JS CLOSURES
!=================================
*/

/*A closure is the combination of a function bundled together (enclosed) with 
references to its surrounding state (the lexical environment).
 In other words, a closure gives you access to an outer function's scope
  from an inner function.*/

const buttons = document.querySelectorAll('li.pick-one > button');

buttons.forEach( (button,i) =>{
    button.addEventListener('click', (e) => {
        console.log(e.target.alt);
        console.log(i);
    })
});


/*
!=================================
!    JS DEBUGGING TIPS
!=================================
*/

//use console.dir instead of console.log when working with dom elements
// gives you a much better represantation on the console

//use console.table to have an output of an array as a table in the console

//use console.log({variable}) to have a key-value represantation on the console

//use console.assert to catch unset values or any comparisons

//use console.time() at the start of a loop or function or whatever and use
//console.timeEnd() before the loop closing bracket to see how much time it takes

//use debugger; on any part of your code and a debugging process will start on chrome
//where you can see in detail the state of your code.

/*
!=================================
!    JS ENUMS
!=================================
*/

//with object freeze you state that even if you try the values inside wont change
const GAME_STATES = Object.freeze{
    NOT_STARTED: "not started",
    PLAYING: "playing",
    FINISHED: "finished,
}

let gameState = GAME_STATES.NOT_STARTED;

gameState = GAME_STATES.PLAYING;

gameState = GAME_STATES.FINISHED;


/*
!=================================
!    JS ARRAY METHODS EXPERT
!=================================
*/

const characters = [
    {
        name: 'Luke Skywalker',
        height: 172,
        mass: 77,
        eye_color: 'blue',
        gender: 'male',
    },
    {
        name: 'Darth Vader',
        height: 202,
        mass: 136,
        eye_color: 'yellow',
        gender: 'male',
    },
    {
        name: 'Leia Organa',
        height: 150,
        mass: 49,
        eye_color: 'brown',
        gender: 'female',
    },
    {
        name: 'Anakin Skywalker',
        height: 188,
        mass: 84,
        eye_color: 'blue',
        gender: 'male',
    },
];

//***MAP***
//1. Get array of all names
const allNames = characters.map( character => character.name)
console.log(allNames);
//2. Get array of all heights
const allHeights = characters.map( character => character.height)
console.log(allHeights);
//3. Get array of objects with just name and height properties
minifiedRecords = characters.map( character => ({
    name: character.name,
    height: character.height,
}))
console.log(minifiedRecords);


//***REDUCE***
//1. Get total mass of all characters
const totalMass = characters.reduce((acc,cur) => {
    return acc + cur.mass;
},0)
console.log(totalMass);


//***FILTER***
//1. Get characters with mass greater than 100
const greater100Characters = characters.filter( 
    character => character.mass > 100
)
console.log(greater100Characters);
//2. Get characters with height less than 200
const less200Characters = characters.filter(
    character => character.height <200
)
console.log(greater100Characters);

//***SORT***
//1. Sort by mass
const byMass = characters.sort((a, b) => {
    return a.mass - b.mass;
})
//3. Sort by name
const byName = characters.sort((a,b) => {
    if(a.name < b.name) return -1;
    return 1;
} )

//***EVERY***
//1. Does every character have blue eyes?
const allBlueEyes = characters.every(
    character => character.eye_color ==='blue';
)
console.log(allBlueEyes);


//***SOME***
//1. Is there at least one male character?
const oneMaleCharacter = characters.some(
    character => character.gender = "male"
);
console.log(oneMaleCharacter);
//2. Is there at least one character with blue eyes?
const oneBlueEyes = characters.some(
    character => character.eye_color = "blue"
);
console.log(oneBlueEyes);
//3. Is there at least one character taller than 210?
const oneTaller210 = characters.some(
    character => character.height > 210
);
console.log(oneTaller210);
//4. Is there at least one character that has mass less than 50?
const oneMassLess50 = characters.some(
    character => character.mass < 50
);
console.log(oneMassLess50);