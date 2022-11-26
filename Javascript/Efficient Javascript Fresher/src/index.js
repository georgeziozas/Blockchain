import "./styles.css";
import SEARCH_URL from "./consts.js";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;

// #*#*#*#*#*#*#*#*#FUNCTIONS#*#*#*#*#*#*#*#*#*#

//1. Function declaration
//hoisted
function sayHi() {
  return console.log("say hi");
}
sayHi();

//2. Function expression
//Anonymous function, not named
//not hoisted
//can be passed around and used
const sayHiyo = function () {
  return console.log("say hiyo");
};
sayHiyo();

//3. Arrow functions
const sayHibro = () => {
  return console.log("say hi bro");
};
sayHibro();

// #*#*#*#*#*#*#*#*#DESTRUCTING#*#*#*#*#*#*#*#*#*#

//Destructuring allows you a way to essentially pull out items from an array or an object and assign them to a variable

//1. Array Destructuring
const newArray = ["hi", "scott", "new item1", "new item2"];
const a = newArray[0];
const b = newArray[1];
//imstead of this, we can now do:
const [c, d, ...e] = newArray;
console.log(c);
console.log(d);
console.log(e);
//...e is a spread operator, it essentially tells us, hey give me 'c','d' and then everything else. So 'e' will be an array.

//2. Object Destructuring
const makePerson = (name, age, job) => {
  return {
    name: name,
    age: age,
    job: job
  };
};
console.log(makePerson("George", 25, "Blockchain Dev"));
//a bit of a better way to do it syntax-wise
const makePerson1 = (name, age, job) => {
  return {
    name,
    age,
    job
  };
};
console.log(makePerson1("George1", 251, "Blockchain Dev1"));

const dev = makePerson1("George1", 251, "Blockchain Dev1");
const dev_name = dev.name;
const dev_age = dev.age;
const dev_job = dev.job;
//better way to do it and write more consistent code
//const {name,age,job} = dev;
//or even better if we want
const { name, ...rest } = dev;
console.log(name, rest);

// #*#*#*#*#*#*#*#*#NAMED PARAMETERS#*#*#*#*#*#*#*#*#*#

const makeAnotherPerson = ({ firstName, age, job, nationality, lastName }) => {
  return {
    name: firstName + " " + lastName,
    age,
    job,
    nationality
  };
};

const anotherDev = makeAnotherPerson({
  firstName: "george",
  lastName: "ziozas",
  age: 25,
  job: "Blockchain Dev",
  nationality: "Greece"
});

// #*#*#*#*#*#*#*#*#NAMING THINGS#*#*#*#*#*#*#*#*#*#

//BE Clear, Searchable & Obvious

//1. WRONG WAY
const hireDev1 = ({ devInfo }) => {
  const hiredDevInfo = {
    hired: true,
    ...devInfo
  };
  return hiredDevInfo;
};
console.log(hireDev1({ devInfo: anotherDev }));

//2. CORRECT WAY
const hireDev2 = ({ dev }) => {
  const hiredDev = {
    hired: true,
    ...dev
  };
  return hiredDev;
};
console.log(hireDev2({ anotherDev }));

// #*#*#*#*#*#*#*#*#IMMUTABLE & PURE FUNCTIONS#*#*#*#*#*#*#*#*#*#

//1. Immutable vs Mutable
//Can't be changed vs Can be changed
let myFirstName = "george";
const myFullName = myFirstName + "brains";
//Using 'let' here doesnt make sense, you should only use const and leave let for special cases

//2. Pure Functions
//Always return the same thing, with the same input

//Pure Function
const addTwo = (x) => x + 2;
console.log(addTwo(2));
console.log(addTwo(2));
console.log(addTwo(2));

//Not Pure Function
let multi = 3;
const addThree = (x) => x + multi;
console.log(addThree(2));
multi = 4;
console.log(addThree(2));
multi = 5;
console.log(addThree(2));

//3. Advantages of using pure functions:
//a. It makes your code more testable
//b. You will never have unitended consicouencies

// #*#*#*#*#*#*#*#*#BENEFITS OF SMALLER FUNCTIONS#*#*#*#*#*#*#*#*#*#

//WRONG WAY
/*const cart = [10, 5, 15];

const fakeAPICharge = (total) => true;
const fakeSendRecipt = (total) => true;

const checkout = (cart) => {
  let total = cart.reduce((tempTotal, item) => tempTotal + item);
  total = total + 10;
  const orderSuccess = fakeAPICharge(total);
  if (orderSuccess) {
    fakeSendRecipt({
      email: "fakeemail@gmail.com",
      total
    });
  }
  return orderSuccess;
};

checkout(cart);
*/

//CORRECT WAY
const cart = [10, 5, 15];

const SHIPPING_COST = 10;

const fakeAPICharge = (total) => true;
const fakeSendRecipt = (total) => true;

const getSubTotal = (cart) =>
  cart.reduce((tempTotal, item) => tempTotal + item);
const getTotal = (subTotal) => subTotal + SHIPPING_COST;
const sendRecipt = ({ email, total }) =>
  fakeSendRecipt({
    email,
    total
  });

const checkout = (cart) => {
  const subTotal = getSubTotal(cart);
  const total = getTotal(subTotal);
  const orderSuccess = fakeAPICharge(total);
  if (orderSuccess) {
    sendRecipt({ email: "fakeemail@gmail.com", total });
  }
  return orderSuccess;
};

console.log(checkout(cart));

// #*#*#*#*#*#*#*#*#The DOM + MDN Docs#*#*#*#*#*#*#*#*#*#

const div1 = document.getElementById("app");
const exampleAttr = div1.getAttribute("id");
const title = div1.getAttribute("title");

const body = document.body;
/* Create a new div Element */
let div = document.createElement("div");

/* Add the text Hello World */
div.textContent = "Hello World";

/* Add the text Hello World */
div.innerText = "hey";
body.append(div);

const div2 = document.getElementById("app");
div2.dataset.id = "1234";
div2.dataset.name = "John Doe";

//https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction

// #*#*#*#*#*#*#*#*#INTERACTING WITH THE DOM#*#*#*#*#*#*#*#*#*#

const logo = document.querySelector("#logo");
//logo.innerText = "YO!";

const heading = document.createElement("h1");
heading.innerHTML = "<span>Hello</span>" + document.URL;
document.body.appendChild(heading);

// #*#*#*#*#*#*#*#*#JAVASCRIPT & THE DOM#*#*#*#*#*#*#*#*#*#

// Generate random color
// // RGB 0-255
// Apply to dom
// update color on event

const generateColorValue = () => Math.floor(Math.random() * 256);

const createColor = () => {
  const red = generateColorValue();
  const green = generateColorValue();
  const blue = generateColorValue();
  return `rgb(${red}, ${green}, ${blue})`;
};

const applyColorToBody = (color) => {
  return (document.body.style.backgroundColor = color);
};

const addRandomColorToBg = () => {
  const color = createColor();
  return applyColorToBody(color);
};

addRandomColorToBg();

// #*#*#*#*#*#*#*#*#EVENTS addEventListener VS Event Methods#*#*#*#*#*#*#*#*#*#

const newColorsBtn = document.getElementById("new-colors");
//newColors.onclick = () => addRandomColorToBg();

//The problem with 'onclick' is that if you create 2 of the same, the one will override the other one.
//While with 'addEventListener' you can create multiple for different use cases.

//newColors.addEventListener("click", addRandomColorToBg);
//newColors.addEventListener("click", () => console.log("hi"));

// #*#*#*#*#*#*#*#*#SetTimeout VS SetInterval#*#*#*#*#*#*#*#*#*#

const newColors = document.getElementById("new-colors");
//newColors.addEventListener("click", addRandomColorToBg);

// Set Interval vs Set Timeout
// const log = () => console.log("is in timeout");
// setTimeout(log, 1000);
// setTimeout(addRandomColorToBg, 5000);
// Set Timeout, happens once

// Set Interval, happens over and over
const interval = setInterval(addRandomColorToBg, 2000);

// Clear interval stops firing
//newColors.addEventListener("click", () => clearInterval(interval));

// #*#*#*#*#*#*#*#*#PROMISES#*#*#*#*#*#*#*#*#*#

const chargeCard = () =>
  new Promise((resolve, reject) => {
    if (true) {
      //resolve is actually a function
      return resolve(true);
    }
    return resolve(false);
  });
chargeCard(); //this returns a promise, now we need to know how to resolve it.

chargeCard()
  .then((val) => {
    console.log(val); //true, it returns the result of the resolve, if it happens.
  })
  .catch((err) => {
    console.log(err); //it returns the result of the reject, if it happens.
  });

// #*#*#*#*#*#*#*#*#ASYNC/AWAIT#*#*#*#*#*#*#*#*#*#

//async/await uses promises under the hood.
//a function needs to return a promise to 'await'
//await means 'i will just wait for this thing to finish before continuing.

const chargeCard1 = () =>
  new Promise((resolve, reject) => {
    if (true) {
      //resolve is actually a function
      return resolve(true);
    }
    return resolve(false);
  });

const chargeCC = async (ccNumber) => {
  try {
    const res = await chargeCard1(ccNumber);
    console.log("hey" + res);
    return res;
  } catch (err) {
    console.log(err);
  }
};
console.log(chargeCC("12"));

// #*#*#*#*#*#*#*#*#ARRAY FUNCTIONS#*#*#*#*#*#*#*#*#*#

const numbers = [1, 2, 3, 4, 5, 6];

//the every method takes a predicate function and returns true if ALL the elements in the array pass the test
const allAboveThree = numbers.every((n) => n > 3);
console.log(allAboveThree);

//the some methods takes a predicate function andreturn true if ANY of the elements in the array pass the test
const hasAboveThree = numbers.some((n) => n > 3);
console.log(hasAboveThree);

//the reduce method takes a callback with (at least) two arguments: An accumulator and the current element
//for each iteration the return value of the callback function is passed on as the accumulator argument of the next iteration.
const sum = numbers.reduce((acc, n) => acc + n);
console.log(sum);

//the find method behaves similarly to the filter method, but it only returns a single element.
//This method will stop at the first element that passes the test and return that. If none exists it will return undefined
const even = numbers.find((n) => n === 3);
console.log(even);

//The filter method creates a new array containing only the elements that pass the test, implemented by the callback function.
//we call this type of callback a predicate function.
const even1 = numbers.filter((n) => n % 2 === 0);
console.log(even1);

//the foreach method excecutes a provided function once for each array element.
//the callback function does not expect a return value.
const allAbove = numbers.forEach((n) => console.log(n));
console.log(allAbove);

//the find index method behaves similarly to the find method, but it retunrs an index instead of the element
//this method will stop at the first element that passes thetest and return its index.
//if none exists it will retu
const findThree = numbers.findIndex((n) => n === 3);
console.log(findThree);

//the map method creates a new array populated with the return value of the callback function for each element in the array
const doubled = numbers.map((val) => val * 2);
console.log(doubled);

//the flat map method applies a callback to each element of the array and then flatten the result into an array.
//it combines flat and map in one function
const numberss = [[1], [2], [3], [4], [5]];
const flattenedDoubles = numberss.flatMap((n) => n * 2);
console.log(flattenedDoubles);

//the includes method check if an array includes a certain value among its elements, returning true or false
const hasNumberFour = numbers.includes(4);
console.log(hasNumberFour);

//the fill method replaces all the elements in an array to a given value.
const populateWithFour = numbers.fill(4);
console.log(populateWithFour);

//the sort method is used to sort the elements of an array and returning the sorting array.
//this method mutates the original array.
const newNumbers = numbers.sort((a, b) => a - b);
console.log(newNumbers);

//the flat method creates a new array with all sub-array elements flattened into it
//you can specify a depth, the default is 1.
const flattened = numberss.flat(1);
console.log(flattened);

//the reverse method reverses the order of the elements in the array.
const reversed = numbers.reverse();
console.log(reversed);

// #*#*#*#*#*#*#*#*#THIS KEYWORD#*#*#*#*#*#*#*#*#*#

//'this' is used mostly whenever you want to refer to something in an object or a class

console.log(this);

const logGreeting = function () {
  console.log(this);
};

const test = {
  testFunc: function () {
    console.log(this);
  },
  testFuncTwo: () => {
    console.log(this);
  },
  testFuncThree: function () {
    ["hi", "hello"].map(() => {
      console.log(this);
    });
  },
  testFuncFour: function () {
    ["hi", "hello"].map(logGreeting.bind(this));
    //'bind': it binds the context to the function that calls it
  }
};
test.testFunc();
test.testFuncTwo(); //wtih arrow funcs you cannot use 'this'
test.testFuncThree();
test.testFuncFour();

// #*#*#*#*#*#*#*#*#THIS KEYWORD#*#*#*#*#*#*#*#*#*#

//'this' is used mostly whenever you want to refer to something in an object or a class

console.log(this);

const logGreeting1 = function () {
  console.log(this);
};

const test1 = {
  testFunc: function () {
    console.log(this);
  },
  testFuncTwo: () => {
    console.log(this);
  },
  testFuncThree: function () {
    ["hi", "hello"].map(() => {
      console.log(this);
    });
  },
  testFuncFour: function () {
    ["hi", "hello"].map(logGreeting.bind(this));
    //'bind': it binds the context to the function that calls it
  }
};
test1.testFunc();
test1.testFuncTwo(); //wtih arrow funcs you cannot use 'this'
test1.testFuncThree();
test1.testFuncFour();

// #*#*#*#*#*#*#*#*#CLASSES#*#*#*#*#*#*#*#*#*#

class Team {
  constructor(name) {
    this.name = name;
  }

  celebrate() {
    console.log("lets dance");
  }
}

class HockeyTeam extends Team {
  constructor(name) {
    super(name);
    this.type = "Hockey";
  }

  scoreGoal() {
    console.log("he shoots, he scores");
  }
}

class FootballTeam extends Team {
  constructor(name) {
    super(name);
    this.type = "Football";
  }

  touchdown() {
    console.log("Go for two!");
  }
}

const wings = new HockeyTeam("Red Wings");
const lions = new FootballTeam("Lions");

wings.scoreGoal();
lions.touchdown();
wings.celebrate();
lions.celebrate();

console.log(wings, lions);

// #*#*#*#*#*#*#*#*#FETCH API#*#*#*#*#*#*#*#*#*#

const SEARCH_QUERY = "Javascript";
const API_URL = `${SEARCH_URL}${SEARCH_QUERY}`;

fetch(API_URL)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });

// #*#*#*#*#*#*#*#*#ASYNC IIFE#*#*#*#*#*#*#*#*#*#

//IIFE stand for: Imidiatelly Invoked Function Expression
// we can create and IIFE with async await that runs automatically

(async () => {
  try {
    const SEARCH_QUERY = "Javascript";
    const SEARCH_URL = "https://openlibrary.org/search.json?q=";
    const API_URL = `${SEARCH_URL}${SEARCH_QUERY}`;

    const res = await fetch(API_URL);
    const data = await res.json();

    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
})();

// #*#*#*#*#*#*#*#*#MODULES, IMPORT & EXPORT#*#*#*#*#*#*#*#*#*#

//Modules are a great way to share code among files.
