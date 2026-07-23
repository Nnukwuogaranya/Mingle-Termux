import React, { useState } from "react";

const interests = [
  "Business",
  "Technology",
  "Music",
  "Sports",
  "Education",
  "Christianity",
  "Entertainment",
  "Fashion",
  "Health",
  "Travel",
  "Finance",
  "Pi Network",
];

const InterestSelector = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    if (selected.includes(interest)) {
      setSelected(selected.filter((item) => item !== interest));
    } else {
      setSelected([...selected, interest]);
    }
  };

  return (
    <div className="interest-card">

      <h2>Choose Your Interests</h2>

      <p>
        Help us personalize your Mingle experience.
      </p>

      <div className="interest-grid">
        {interests.map((interest) => (
          <button
            key={interest}
            className={
              selected.includes(interest)
                ? "interest active"
                : "interest"
            }
            onClick={() => toggleInterest(interest)}
          >
            {interest}
          </button>
        ))}
      </div>

    </div>
  );
};

export default InterestSelector;
