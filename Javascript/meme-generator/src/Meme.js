import { useState, useEffect } from "react";

export default function Meme() {
  const [memeImage, setMemeImage] = useState({
    meme: {
      topText: "",
      bottomText: "",
      randomImage: "",
    },
  });

  const [allMemeImages, setAllMemeImages] = useState([]);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemeImages.length);
    const url = allMemeImages[randomNumber].url;
    setMemeImage((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMemeImage((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemeImages(data.data.memes));
  }, []);

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Shut up"
          className="form--input"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="and take my money"
          className="form--input"
          onChange={handleChange}
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image!
        </button>
      </div>
      <div>
        <img src={memeImage.randomImage} className="meme--image" alt="meme" />
      </div>
    </main>
  );
}
