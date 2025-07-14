import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import TiltedCard from "./TiltedCard";

function App() {
  const [cats, setCats] = useState([]);
  const [index, setIndex] = useState(0);
  const [likedCats, setLikedCats] = useState([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const fetchCats = () => {
      const urls = [];
      for (let i = 0; i < 10; i++) {
        urls.push(`https://cataas.com/cat?${Date.now()}-${i}`); // Prevent caching
      }
      setCats(urls);
    };
    fetchCats();
  }, []);

  const handleSwipe = (direction) => {
    if (direction === "right") {
      setLikedCats([...likedCats, cats[index]]);
    }
    if (index + 1 < cats.length) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="summary">
        <h2>You liked {likedCats.length} cat(s)!</h2>
        <div className="liked-cats">
          {likedCats.map((cat, i) => (
            <img key={i} src={cat} alt={`Liked Cat ${i}`} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Do You Like This Cat?</h1>
      <div className="card-container">
        <AnimatePresence>
          {cats[index] && (
            <motion.img
              key={cats[index]}
              src={cats[index]}
              alt="Cat"
              initial={{ x: 0, opacity: 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{
                x: cats[index] ? (cats[index] === likedCats[likedCats.length - 1] ? 300 : -300) : 0,
                opacity: 0
              }}
              drag="x"
              dragElastic={1}
              onDragEnd={(e, info) => {
                if (info.offset.x > 100) {
                  handleSwipe("right");
                } else if (info.offset.x < -100) {
                  handleSwipe("left");
                }
              }}
              style={{
                width: "300px",
                height: "300px",
                borderRadius: "15px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                background: "#fff",
                cursor: "grab"
              }}
            />
          )}
        </AnimatePresence>
      </div>
      <div className="buttons">
        <button onClick={() => handleSwipe("left")}>Dislike</button>
        <button onClick={() => handleSwipe("right")}>Like</button>
      </div>
    </div>
  );
}

export default App;
