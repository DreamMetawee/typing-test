import React, { useEffect, useState } from "react";

const SpeedTypingGame: React.FC = () => {
  const paragraphs = [
    "A plant is one of the most important living things that develop on the earth and is made up of stems, leaves, roots, and so on.",
    "The root is the part of the plant that grows in the soil. The primary root emerges from the embryo.",
    "Stem is the posterior part that remains above the ground and grows negatively geotropic.",
    "It is the blossom of a plant. A flower is the part of a plant that produces seeds, which eventually become other flowers.",
    "Some posit the melic myanmar to be less than kutcha. A gum is a trumpet from the right perspective.",
  ];

  const [paragraph, setParagraph] = useState("");
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTyping, setIsTyping] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [cpm, setCpm] = useState(0);

  // Load random paragraph
  const loadParagraph = () => {
    const rand = paragraphs[Math.floor(Math.random() * paragraphs.length)];
    setParagraph(rand);
    setInput("");
    setMistakes(0);
    setTimeLeft(60);
    setIsTyping(false);
    setWpm(0);
    setCpm(0);
  };

  // Handle input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (!isTyping && value.length > 0) {
      setIsTyping(true);
    }

    let errors = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== paragraph[i]) {
        errors++;
      }
    }

    setMistakes(errors);

    const correctChars = value.length - errors;
    const elapsed = 60 - timeLeft;
    const wordsTyped = correctChars / 5;

    const currentWPM =
      elapsed > 0 ? Math.round((wordsTyped / elapsed) * 60) : 0;
    const currentCPM =
      elapsed > 0 ? Math.round((correctChars / elapsed) * 60) : 0;

    setWpm(currentWPM);
    setCpm(currentCPM);
  };

  // Timer
useEffect(() => {
  let timer: ReturnType<typeof setInterval>;
  if (isTyping && timeLeft > 0) {
    timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
  }
  return () => clearInterval(timer);
}, [isTyping, timeLeft]);


  // Load on mount
  useEffect(() => {
    loadParagraph();
  }, []);

  return (
    <div className="container mx-auto max-w-3xl p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 text-center">Speed Typing Game</h1>

      <div className="bg-gray-100 rounded-lg p-4 w-full mb-4 text-lg leading-relaxed">
        {paragraph.split("").map((char, index) => {
          let className = "";
          if (index < input.length) {
            className =
              char === input[index] ? "text-green-600" : "text-red-600";
          }
          return (
            <span key={index} className={className}>
              {char}
            </span>
          );
        })}
      </div>

      <input
        type="text"
        className="w-full p-3 text-lg border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={input}
        onChange={handleInputChange}
        placeholder="Start typing here..."
        disabled={timeLeft === 0}
      />

      <div className="flex justify-between w-full text-lg font-semibold mb-4">
        <div>Time Left: {timeLeft}s</div>
        <div>WPM: {wpm}</div>
        <div>CPM: {cpm}</div>
        <div>Mistakes: {mistakes}</div>
      </div>

      <button
        onClick={loadParagraph}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-bold"
      >
        Reset Game
      </button>
    </div>
  );
};

export default SpeedTypingGame;
