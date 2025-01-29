// src/components/Stars.jsx
import React from "react";
import styles from "./Stars.module.css"; // Import the CSS module

const Stars = ({ count = 100 }) => {
  // Check if the user prefers reduced motion
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
  // Create an array with 'count' elements
  const starsArray = Array.from({ length: count });

  // Define possible easing options for oscillation
  const oscillateOptions = ['ease-in-out', 'linear'];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
      }}
    >
      {starsArray.map((_, index) => {
        // Generate random size (1px to 4px)
        const size = Math.random() * 3 + 1;

        // Generate random movement direction and distance
        const angle = Math.random() * 360; // Degrees
        const distance = Math.random() * 100 + 100; // Pixels (100px to 200px)

        // Convert angle to x and y distances
        const moveX = distance * Math.cos((angle * Math.PI) / 180);
        const moveY = distance * Math.sin((angle * Math.PI) / 180);

        // Generate random durations (faster movement)
        const twinkleDuration = Math.random() * 2 + 1; // 1s to 3s
        const moveDuration = Math.random() * 10 + 5; // 5s to 15s
        const oscillateDuration = Math.random() * 4 + 2; // 2s to 6s

        // Generate random animation delays
        const twinkleDelay = Math.random() * 5; // 0s to 5s
        const moveDelay = Math.random() * 5; // 0s to 5s
        const oscillateDelay = Math.random() * 5; // 0s to 5s

        // Select random oscillate easing
        const oscillateEasing = oscillateOptions[Math.floor(Math.random() * oscillateOptions.length)];

        // Define the vertical oscillation distance
        const oscillateY = Math.random() * 10 + 5; // 5px to 15px

        // Style object with CSS variables for movement and oscillation
        const starStyle = {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${size}px`,
          height: `${size}px`,
          animationDelay: `${twinkleDelay}s, ${moveDelay}s, ${oscillateDelay}s`,
          '--twinkle-duration': `${twinkleDuration}s`,
          '--move-duration': `${moveDuration}s`,
          '--move-x': `${moveX}px`,
          '--move-y': `${moveY}px`,
          '--oscillate-duration': `${oscillateDuration}s`,
          '--oscillate-y': `${oscillateY}px`,
          '--oscillate-easing': `${oscillateEasing}`,
          animationPlayState: prefersReducedMotion ? 'paused' : 'running',
        };

        return (
          <div
            key={index}
            className={styles.star} // Apply our CSS module class
            style={starStyle}
          />
        );
      })}
    </div>
  );
};

export default Stars;
