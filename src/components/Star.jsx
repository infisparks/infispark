// src/components/Stars.jsx
import React from "react";

const Stars = ({ count = 50 }) => {
  const stars = Array.from({ length: count });

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((_, index) => {
        const size = Math.random() * 3 + 1; // Size between 1px and 4px
        const style = {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${size}px`,
          height: `${size}px`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${Math.random() * 5 + 5}s`,
        };

        return (
          <div
            key={index}
            className="absolute bg-white rounded-full opacity-75 animate-twinkle"
            style={style}
          ></div>
        );
      })}
    </div>
  );
};

export default Stars;
