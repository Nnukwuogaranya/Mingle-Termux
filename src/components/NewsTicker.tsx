import React, { useEffect, useState } from "react";

const news = [
  "🟣 Welcome to Mingle Alpha 1.0",
  "🌍 Connect with people around the world.",
  "💼 Explore businesses in Marketplace.",
  "📰 Follow the latest Pi Network updates.",
  "💜 Where People Don't Just Connect... They Belong.",
];

const NewsTicker = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % news.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="news-ticker">
      <span>{news[index]}</span>
    </div>
  );
};

export default NewsTicker;
