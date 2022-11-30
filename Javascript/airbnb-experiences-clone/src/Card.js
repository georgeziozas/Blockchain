import star from "./star.png";
export default function Card({
  img,
  rating,
  rating_num,
  country,
  desc,
  price,
}) {
  return (
    <div className="card">
      <img src={img} className="card--image" />
      <div className="card--stats">
        <img src={star} className="star--image" />
        <span>{rating}</span>
        <span>{rating_num}</span>
        <span>{country}</span>
      </div>
      <p>
        <b>{desc}</b>
      </p>
      <p>
        <b>{price}</b>
      </p>
    </div>
  );
}
