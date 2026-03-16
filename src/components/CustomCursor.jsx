import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  
  const [stars, setStars] = useState([]);
  const starIdRef = useRef(0);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });

      // Add a new star periodically on mouse move
      if (Math.random() > 0.6) {
        const newStar = {
          id: starIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 4 + 2, // Random size between 2 and 6
        };
        setStars((prevStrs) => [...prevStrs.slice(-15), newStar]); // Keep only the last 15 stars
      }
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === "A" ||
        e.target.tagName === "BUTTON" ||
        e.target.closest("button") ||
        e.target.closest("a")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Clean up stars over time even when not moving
  useEffect(() => {
    const interval = setInterval(() => {
      setStars((prev) => prev.slice(1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
    },
    hover: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1.5,
      backgroundColor: "transparent",
      border: "2px solid hsl(var(--primary))",
    },
  };

  return (
    <>
      <div className="hidden md:block">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed top-0 left-0 bg-primary pointer-events-none z-[90]"
            style={{
              x: star.x - star.size / 2,
              y: star.y - star.size / 2,
              width: star.size,
              height: star.size,
              borderRadius: "50%",
              boxShadow: "0 0 10px 2px hsl(var(--primary))",
            }}
          />
        ))}

        <motion.div
          className="fixed top-0 left-0 w-8 h-8 rounded-full bg-primary/30 pointer-events-none z-[100] flex items-center justify-center backdrop-blur-[2px]"
          variants={variants}
          animate={isHovering ? "hover" : "default"}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 28,
            mass: 0.5,
          }}
        >
          {!isHovering && <div className="w-2 h-2 rounded-full bg-primary pointer-events-none"></div>}
        </motion.div>
      </div>
    </>
  );
};
