import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


function App() {
  const [cats, setCats] = useState([]);
  const [index, setIndex] = useState(0);
  const [likedCats, setLikedCats] = useState([]);
  const [finished, setFinished] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [bgFlash, setBgFlash] = useState(null);
  const [dragX, setDragX] = useState(0);
  const [likeButtonActive, setLikeButtonActive] = useState(false);
  const [dislikeButtonActive, setDislikeButtonActive] = useState(false);
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
    setLikeButtonActive(true); // trigger like button animation
    setLikedCats([...likedCats, cats[index]]);
    setBgFlash("rainbow");
    playLikeSound();
  } else if (direction === "left") {
    setDislikeButtonActive(true); // trigger dislike button animation
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
    setLikeButtonActive(false);      // reset like button animation
    setDislikeButtonActive(false);   // reset dislike button animation
  }, 400);
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

  // Progress calculation
  const progress = ((index + (finished ? 1 : 0)) / cats.length) * 100;

  if (finished) {
    return (
      <motion.div
        className="app"
        initial="initial"
        animate="initial"
        style={{ minHeight: "100vh", padding: "2rem 0" }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontWeight: 900,
              background: "linear-gradient(90deg, #10B981, #3B82F6, #F59E42)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 2px 12px rgba(59,130,246,0.15)",
              letterSpacing: 2,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
              userSelect: "none",
            }}
          >
            You liked {likedCats.length} cat{likedCats.length !== 1 && "s"}!
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: { xs: 2, md: 4 },
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100vw",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <Box
            sx={{
              width: { xs: 300, sm: 400 },
              minHeight: 400,
              bgcolor: "#f9fafb",
              borderRadius: 4,
              boxShadow: 3,
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: "#10B981" }}>
              Liked Cats
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
                width: "100%",
              }}
            >
              {likedCats.length === 0 && (
                <Typography variant="body1" sx={{ gridColumn: "span 2", color: "#aaa" }}>
                  No cats liked 😿
                </Typography>
              )}
              {likedCats.map((cat, i) => (
                <Box
                  key={i}
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: 2,
                    border: "3px solid #10B981",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 6,
                    },
                    aspectRatio: "1/1",
                    bgcolor: "#fff",
                  }}
                >
                  <img
                    src={cat}
                    alt={`Liked Cat ${i + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              width: { xs: 300, sm: 400 },
              minHeight: 400,
              bgcolor: "#f9fafb",
              borderRadius: 4,
              boxShadow: 3,
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: "#EF4444" }}>
              Disliked Cats
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
                width: "100%",
              }}
            >
              {cats.filter((cat) => !likedCats.includes(cat)).length === 0 && (
                <Typography variant="body1" sx={{ gridColumn: "span 2", color: "#aaa" }}>
                  No cats disliked 😺
                </Typography>
              )}
              {cats
                .filter((cat) => !likedCats.includes(cat))
                .map((cat, i) => (
                  <Box
                    key={i}
                    sx={{
                      borderRadius: 3,
                      overflow: "hidden",
                      boxShadow: 2,
                      border: "3px solid #EF4444",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: 6,
                      },
                      aspectRatio: "1/1",
                      bgcolor: "#fff",
                    }}
                  >
                    <img
                      src={cat}
                      alt={`Disliked Cat ${i + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </Box>
                ))}
            </Box>
          </Box>
        </Box>
        <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => {
              setIndex(0);
              setLikedCats([]);
              setFinished(false);
            }}
            style={{
              padding: "1rem 2.5rem",
              fontSize: "1.25rem",
              fontWeight: 700,
              borderRadius: "2rem",
              border: "none",
              background: "linear-gradient(90deg, #10B981, #3B82F6, #F59E42)",
              color: "#fff",
              boxShadow: "0 2px 12px rgba(59,130,246,0.15)",
              cursor: "pointer",
              transition: "background 0.2s, transform 0.2s",
            }}
          >
            Play Again
          </button>
        </Box>
      </motion.div>
    );
  }

  return (
    <>
      <audio ref={likeSoundRef} src="./public/like.mp3" />
      <audio ref={dislikeSoundRef} src="./public/dislike.mp3" />

      {/* Progress Bar */}
      <div
        style={{
          height: 8,
          width: "100vw",
          background: "#eee",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 10,
        }}
        aria-label="progress"
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #10B981, #3B82F6, #F59E42)",
            transition: "width 0.3s",
          }}
        />
      </div>

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
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography
              variant="h2"
              align="center"
              sx={{
                fontWeight: 800,
                background: "linear-gradient(90deg, #10B981, #3B82F6, #F59E42)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 2px 12px rgba(59,130,246,0.15)",
                letterSpacing: 2,
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                userSelect: "none",
              }}
            >
              Do You Like This Cat?
            </Typography>
          </Box>
          <div
            className="card-container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100vw",
              height: "60vh",
              position: "relative",
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
                  onDrag={(e, info) => setDragX(info.point.x - window.innerWidth / 2)}
                  onDragEnd={(e, info) => {
                    setDragX(0);
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
                    background: "#fff",
                    cursor: "grab",
                    objectFit: "cover",
                    boxShadow:
                      dragX > 60
                        ? "0 0 32px 8px #10B98188"
                        : dragX < -60
                        ? "0 0 32px 8px #EF444488"
                        : "0 8px 32px rgba(0,0,0,0.25)",
                    transition: "box-shadow 0.2s",
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
              animate={dislikeButtonActive ? { scale: 1.8, rotate: -20 } : { scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              whileTap={{ scale: 1.8, rotate: -20 }}
            >
              <IconButton
                color="error"
                size="large"
                onClick={() => handleSwipe("left")}
                aria-label="dislike"
                sx={{ fontSize: 60, width: 80, height: 80 }}
              >
                <ThumbDownIcon fontSize="inherit" sx={{ fontSize: 60 }} />
              </IconButton>
            </motion.div>
            <motion.div
              animate={likeButtonActive ? { scale: 1.8, rotate: 20 } : { scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              whileTap={{ scale: 1.8, rotate: 20 }}
            >
              <IconButton
                color="success"
                size="large"
                onClick={() => handleSwipe("right")}
                aria-label="like"
                sx={{ fontSize: 60, width: 80, height: 80 }}
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
