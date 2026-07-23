import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="section-title">

      <h2>{title}</h2>

      {subtitle && (
        <p>{subtitle}</p>
      )}

    </div>
  );
};

export default SectionTitle;
