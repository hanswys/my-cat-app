import React, { useState, useEffect, useRef } from "react";
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

  // Refs for audio
  const likeSoundRef = useRef(null);
  const dislikeSoundRef = useRef(null);

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

  // Play sound effects on button click
  const playLikeSound = () => {
    if (likeSoundRef.current) {
      likeSoundRef.current.currentTime = 0;
      likeSoundRef.current.play();
    }
  };
  const playDislikeSound = () => {
    if (dislikeSoundRef.current) {
      dislikeSoundRef.current.currentTime = 0;
      dislikeSoundRef.current.play();
    }
  };

  const handleSwipe = (direction) => {
    setSwipeDirection(direction);
    if (direction === "right") {
      setLikedCats([...likedCats, cats[index]]);
      setBgFlash("rainbow");
      playLikeSound();
    } else if (direction === "left") {
      setBgFlash("red");
      playDislikeSound();
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
        "#fff",
      ],
      transition: { duration: 0.4 },
    },
    red: {
      background: ["#fff", "#ff0000", "#fff"],
      transition: { duration: 0.4 },
    },
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
        <div
          style={{
            display: "flex",
            gap: "2rem",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100vw",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              width: 400,
              height: 400,
              minWidth: 400,
              maxWidth: 400,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3 style={{ textAlign: "center" }}>Liked Cats</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "1fr 1fr",
                gap: "1rem",
                width: "100%",
                height: "100%",
              }}
            >
              {likedCats.map((cat, i) => (
                <img
                  key={i}
                  src={cat}
                  alt={`Liked Cat ${i + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "15px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    border: "3px solid #10B981",
                  }}
                />
              ))}
            </div>
          </div>
          <div
            style={{
              width: 400,
              height: 400,
              minWidth: 400,
              maxWidth: 400,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3 style={{ textAlign: "center" }}>Disliked Cats</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "1fr 1fr",
                gap: "1rem",
                width: "100%",
                height: "100%",
              }}
            >
              {cats
                .filter((cat) => !likedCats.includes(cat))
                .map((cat, i) => (
                  <img
                    key={i}
                    src={cat}
                    alt={`Disliked Cat ${i + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "15px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      border: "3px solid #EF4444",
                    }}
                  />
                ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <audio ref={likeSoundRef} src="./public/like.mp3" />
      <audio ref={dislikeSoundRef} src="./public/dislike.mp3" />

      <motion.div
        className="app"
        variants={bgVariants}
        initial="initial"
        animate={bgFlash || "initial"}
        style={{ minHeight: "100vh" }}
      >
        <div
          style={{
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1 style={{ marginBottom: "1rem", marginTop: 0, fontSize: "2.5rem" }}>
            Do You Like This Cat?
          </h1>
          <div
            className="card-container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100vw",
              height: "60vh",
            }}
          >
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
                    width: "80vw",
                    height: "80vh",
                    maxWidth: "500px",
                    maxHeight: "500px",
                    borderRadius: "25px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                    background: "#fff",
                    cursor: "grab",
                    objectFit: "cover",
                  }}
                />
              )}
            </AnimatePresence>
          </div>
          <div
            className="buttons"
            style={{
              marginTop: "1rem", // reduced margin
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
            }}
          >
            <motion.div
              whileTap={{ scale: 1.8, rotate: -20 }} // bigger scale
              transition={{ type: "spring", stiffness: 300 }}
            >
              <IconButton
                color="error"
                size="large"
                onClick={() => handleSwipe("left")}
                aria-label="dislike"
                sx={{ fontSize: 60, width: 80, height: 80 }} // increase button size
              >
                <ThumbDownIcon fontSize="inherit" sx={{ fontSize: 60 }} />
              </IconButton>
            </motion.div>
            <motion.div
              whileTap={{ scale: 1.8, rotate: 20 }} // bigger scale
              transition={{ type: "spring", stiffness: 300 }}
            >
              <IconButton
                color="success"
                size="large"
                onClick={() => handleSwipe("right")}
                aria-label="like"
                sx={{ fontSize: 60, width: 80, height: 80 }} // increase button size
              >
                <ThumbUpIcon fontSize="inherit" sx={{ fontSize: 60 }} />
              </IconButton>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default App;
