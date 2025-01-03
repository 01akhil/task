// src/hooks/useTypingEffect.js

import { useState, useEffect } from 'react';

const useTypingEffect = (text, speed = 32) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < text.length-1) {
        setDisplayedText((prev) => prev + text[index]);
        index += 1;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text]);

  return displayedText;
};

export default useTypingEffect;
