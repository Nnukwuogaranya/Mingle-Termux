import "./Stories.css";

const stories = [
  {
    id: 1,
    name: "Your Story",
    image: "https://i.pravatar.cc/150?img=12",
    online: true,
    add: true,
  },
  {
    id: 2,
    name: "Grace",
    image: "https://i.pravatar.cc/150?img=32",
    online: true,
  },
  {
    id: 3,
    name: "Daniel",
    image: "https://i.pravatar.cc/150?img=53",
    online: true,
  },
  {
    id: 4,
    name: "Chioma",
    image: "https://i.pravatar.cc/150?img=47",
    online: true,
  },
  {
    id: 5,
    name: "Samuel",
    image: "https://i.pravatar.cc/150?img=15",
    online: true,
  },
];

function Stories() {
  return (
    <section className="stories">
      {stories.map((story) => (
        <div className="story-card" key={story.id}>
          <div className="story-ring">
            <img src={story.image} alt={story.name} />
            {story.add ? (
              <span className="add-story">+</span>
            ) : (
              <span className="online"></span>
            )}
          </div>

          <p>{story.name}</p>
        </div>
      ))}
    </section>
  );
}

export default Stories;
