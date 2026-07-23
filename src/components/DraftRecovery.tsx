import React from "react";

const DraftRecovery = () => {
  return (
    <div className="draft-recovery-card">

      <h2>📝 Draft Saved</h2>

      <p>
        We found an unfinished post.
      </p>

      <p>
        Continue writing where you stopped.
      </p>

      <div className="draft-actions">
        <button>Continue</button>
        <button>Delete Draft</button>
      </div>

    </div>
  );
};

export default DraftRecovery;
