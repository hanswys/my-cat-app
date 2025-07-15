import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

function App() {
  const [cats, setCats] = useState([]);
  const [index, setIndex] = useState(0);
  const [likedCats, setLikedCats] = useState([]);
  const [finished, setFinished] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [bgFlash, setBgFlash] = useState(null);

  useEffect(() => {
    const fetchCats = () => {
      const urls = [];
      for (let i = 0; i < 10; i++) {
        urls.push(`https://cataas.com/cat?${Date.now()}-${i}`);
      }
      setCats(urls);
    };
    fetchCats();
  }, []);

  const handleSwipe = (direction) => {
    setSwipeDirection(direction);
    if (direction === "right") {
      setLikedCats([...likedCats, cats[index]]);
      setBgFlash("rainbow");
    } else if (direction === "left") {
      setBgFlash("red");
    }
    setTimeout(() => {
      if (index + 1 < cats.length) {
        setIndex(index + 1);
      } else {
        setFinished(true);
      }
      setSwipeDirection(null);
      setBgFlash(null);
    }, 400); // Slightly longer for visible flash
  };

  // Animation variants for background
  const bgVariants = {
    initial: { background: "#fff" },
    rainbow: {
      background: [
        "#fff",
        "#ff0000",
        "#ff9900",
        "#ffff00",
        "#33ff00",
        "#00ffff",
        "#3300ff",
        "#ff00cc",
        "#fff"
      ],
      transition: { duration: 0.4 }
    },
    red: {
      background: ["#fff", "#ff0000", "#fff"],
      transition: { duration: 0.4 }
    }
  };

  if (finished) {
    return (
      <motion.div
        className="app"
        initial="initial"
        animate="initial"
        style={{ minHeight: "100vh" }}
      >
        <h2>You liked {likedCats.length} cat(s)!</h2>
        <div className="liked-cats">
          {likedCats.map((cat, i) => (
            <img key={i} src={cat} alt={`Liked Cat ${i}`} />
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="app"
      variants={bgVariants}
      initial="initial"
      animate={bgFlash || "initial"}
      style={{ minHeight: "100vh" }}
    >
      <h1>Do You Like This Cat?</h1>
      <div className="card-container">
        <AnimatePresence>
          {cats[index] && (
            <motion.img
              key={cats[index]}
              src={cats[index]}
              alt="Cat"
              initial={{
                x:
                  swipeDirection === "right"
                    ? window.innerWidth
                    : swipeDirection === "left"
                    ? -window.innerWidth
                    : 0,
                opacity: 0,
              }}
              animate={{ x: 0, opacity: 1 }}
              exit={{
                x:
                  swipeDirection === "right"
                    ? window.innerWidth
                    : swipeDirection === "left"
                    ? -window.innerWidth
                    : 0,
                opacity: 0,
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
                cursor: "grab",
              }}
            />
          )}
        </AnimatePresence>
      </div>
      <div className="buttons" style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: "2rem" }}>
        <motion.div
          whileTap={{ scale: 1.2, rotate: -20 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <IconButton
            color="error"
            size="large"
            onClick={() => handleSwipe("left")}
            aria-label="dislike"
          >
            <ThumbDownIcon fontSize="inherit" />
          </IconButton>
        </motion.div>
        <motion.div
          whileTap={{ scale: 1.2, rotate: 20 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <IconButton
            color="success"
            size="large"
            onClick={() => handleSwipe("right")}
            aria-label="like"
          >
            <ThumbUpIcon fontSize="inherit" />
          </IconButton>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default App;