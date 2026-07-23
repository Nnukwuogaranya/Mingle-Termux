export default function Post() {
  return (
    <div className="post">

      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "15px"
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "#6a1b9a",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            marginRight: "12px"
          }}
        >
          JP
        </div>

        <div>
          <h3>PST Juddy Praise</h3>
          <small>Just now</small>
        </div>
      </div>

      <p>
        🎉 Welcome to Mingle!

        We are building a premium social network where people don't just
        connect... they belong.

        The journey has just begun. 🚀💜
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px"
        }}
      >
        <button className="outline-btn">👍 Like</button>

        <button className="outline-btn">💬 Comment</button>

        <button className="outline-btn">📤 Share</button>
      </div>

    </div>
  );
}
