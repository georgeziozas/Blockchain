import trollface from "./troll-face.png";
export default function Header() {
  return (
    <header className="header">
      <img className="header--image" src={trollface} alt="meme troll face" />
      <h2 className="header--title">Meme Generator</h2>
    </header>
  );
}
