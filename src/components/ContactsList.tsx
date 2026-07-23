import React from "react";

const contacts = [
  {
    name: "Esther Grace",
    status: "On Mingle",
    contact: true,
  },
  {
    name: "John Okeke",
    status: "On Mingle",
    contact: true,
  },
  {
    name: "Chinedu",
    status: "Invite",
    contact: false,
  },
  {
    name: "Samuel Obi",
    status: "Invite",
    contact: false,
  },
];

const ContactsList = () => {
  return (
    <div className="contacts-card">

      <h2>📱 Your Contacts</h2>

      {contacts.map((person, index) => (
        <div className="contact-item" key={index}>

          <div>
            <h4>{person.name}</h4>

            <small>
              {person.contact
                ? "💜 On Mingle"
                : "Not on Mingle"}
            </small>
          </div>

          <button>
            {person.contact
              ? "Add Friend"
              : "Invite"}
          </button>

        </div>
      ))}

    </div>
  );
};

export default ContactsList;
