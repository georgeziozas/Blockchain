const SEARCH_URL = "https://openlibrary.org/search.json?q=";

//1. export default SEARCH_URL;
//with default, it doesnt matter the name you are going to give it once importing it.
//if you remove 'default' them you will have to follow the name convention.

//2.
export { SEARCH_URL };

//3.
//If we use normal export and we still want to have a deifferent name when we import it we can use the trick: import{SEARCH_URL as myURL}
