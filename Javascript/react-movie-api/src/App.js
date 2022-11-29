import "./App.css";
//import { Counter } from "./Counter";
//import { Accordion } from "./Accordion";
//import { Input } from "./Input";
//import PropTypes from "prop-types";
import { MoviesList } from "./Movies/MoviesList";
import { Link, Route, Routes } from "react-router-dom";
import { Articles } from "./Articles";
import { About } from "./About";
import { Home } from "./Home";
import { Movie } from "./Movies/Movie";
import { MovieDetail } from "./Movies/MovieDetail";
function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Movies">Movies</Link>
          </li>
          <li>
            <Link to="/Articles">Articles</Link>
          </li>
          <li>
            <Link to="/About">About</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Movies" element={<MoviesList />} />
        <Route path="/Movies/:id" element={<MovieDetail />} />
        <Route path="/Articles" element={<Articles />} />
        <Route path="/About" element={<About />} />

        {/*
        <HelloWorld name="Don" />
        <HelloWorld name="Brains" />
        <Counter />
        <Accordion />
        <Input />
        */}
      </Routes>
    </div>
  );
}

/*function HelloWorld({ name, greeting = "Yo" }) {
  return (
    <h1>
      {greeting} {name}!
    </h1>
  );
}
HelloWorld.propTypes = {
  name: PropTypes.string,
  greeting: PropTypes.string,
};
*/
export default App;

//#*#*#*#*#*#*#*#*#*__NOTES__#*#*#*#*#*#*#*#*#*
//one of the key components to custom elements in react is the abillity to pass information into them from the parent to child component, thats happens through PROPS.
//props is a js object
//App is the parent node, HelloWorld component is a child node.
//prop types, tells the component what it "should accept". you should also import PropTypes.
//you can think of state as the data that lives in your component that changes and updates and makes your component interactive
//"conditional rendering" allows you to use IF-ELSE statements in React (multiple ways to do it)
//"cotrolled inputs", a way to allow you to microcontrol the data that is coming in and out of a text input. Also, how to interact with the current state instead of just relying on the logic of the setState alone.
//react doesnt include any loop method, so to achieve looping we can use JS array functions like map,reduce... etc
//we use 'useRef' to get access to virtualDOM(faster than the real DOM). ex when a state changes the page re-renders, when a ref changes it does not trigger a re-render or an update. Sometimes we use refs to update or change information without re-rendering the entire component. So, simply, when you want to access a DOM element you can simply fire up a ref to that element.
//useEffect has a great effect on how components re-render when they re-renter and what you can do with data that needs to change bases on those renders. (if we tell a comp. to go get some data fron an API its gonna require useEffect to go get that data, when that data arrives we can send them to state and actually use them.)
