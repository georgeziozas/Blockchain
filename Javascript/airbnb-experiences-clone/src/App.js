import data from "./data";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Card from "./Card";
function App() {
  const cards = data.map((item) => {
    return (
      <Card
        key={item.id}
        img={item.img}
        rating={item.rating}
        rating_num={item.rating_num}
        country={item.country}
        desc={item.desc}
        price={item.price}
      />
    );
  });
  return (
    <div>
      <Navbar />
      <Hero />
      {cards}
    </div>
  );
}

export default App;
