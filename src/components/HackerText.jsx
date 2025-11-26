import { useEffect, useState, useRef } from 'react';

const HackerText = ({ text, className, speed = 30, triggerOnHover = true }) => {
  const [displayedText, setDisplayedText] = useState(text);
  const intervalRef = useRef(null);
  
  // A mix of uppercase, lowercase, numbers, and symbols for that "matrix/hacker" feel
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

  const animate = () => {
    let iteration = 0;
    clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setDisplayedText(prev => 
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            // Preserve spaces for readability during scramble
            if (text[index] === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      
      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
        setDisplayedText(text); // Ensure final text is clean
      }
      
      iteration += 1 / 3; // Controls how fast the "wave" of resolved text moves
    }, speed);
  };

  useEffect(() => {
    animate();
    return () => clearInterval(intervalRef.current);
  }, [text]);

  return (
    <span 
      className={className} 
      onMouseEnter={triggerOnHover ? animate : undefined}
      style={{ cursor: triggerOnHover ? 'default' : 'inherit' }}
    >
      {displayedText}
    </span>
  );
};

export default HackerText;
