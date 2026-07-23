import React from "react";

interface ContactPermissionProps {
  onAllow?: () => void;
  onSkip?: () => void;
}

const ContactPermission: React.FC<ContactPermissionProps> = ({
  onAllow,
  onSkip,
}) => {
  return (
    <div className="contact-permission">

      <div className="contact-icon">📱</div>

      <h2>Find Your Friends</h2>

      <p>
        Allow Mingle to access your contacts and discover
        people you already know who are on Mingle.
      </p>

      <button
        className="allow-btn"
        onClick={onAllow}
      >
        Allow Contacts
      </button>

      <button
        className="skip-btn"
        onClick={onSkip}
      >
        Not Now
      </button>

      <small>
        Your contacts are only used to help you find friends.
        You can change this permission anytime.
      </small>

    </div>
  );
};

export default ContactPermission;
