import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

const CAT_API_URL = 'https://cataas.com/cat?json=true';

function App() {
  const [cats, setCats] = useState([]);
  const [index, setIndex] = useState(0);
  const [likedCats, setLikedCats] = useState([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const fetchCats = async () => {
      const fetchedCats = [];
      for (let i = 0; i < 10; i++) {
        const res = await fetch(CAT_API_URL);
        const data = await res.json();
        fetchedCats.push(`https://cataas.com${data.url}`);
      }
      setCats(fetchedCats);
    };
    fetchCats();
  }, []);

  const handleSwipe = (direction) => {
    if (direction === 'right') {
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
              className="cat-card"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.x > 100) {
                  handleSwipe('right');
                } else if (info.offset.x < -100) {
                  handleSwipe('left');
                }
              }}
            />
          )}
        </AnimatePresence>
      </div>
      <div className="buttons">
        <button onClick={() => handleSwipe('left')}>Dislike</button>
        <button onClick={() => handleSwipe('right')}>Like</button>
      </div>
    </div>
  );
}

export default App;