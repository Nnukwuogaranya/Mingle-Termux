import React from "react";

const ImageCropper = () => {
  return (
    <div className="cropper-page">

      <h2>Adjust Your Photo</h2>

      <div className="crop-preview">

        <div className="crop-circle">
          Profile Preview
        </div>

      </div>

      <div className="crop-buttons">

        <button>📷 Camera</button>

        <button>🖼 Gallery</button>

      </div>

      <div className="crop-controls">

        <button>➖ Zoom Out</button>

        <button>➕ Zoom In</button>

        <button>⟲ Rotate</button>

        <button>Reset</button>

      </div>

      <button className="save-photo">
        Save Photo
      </button>

    </div>
  );
};

export default ImageCropper;
