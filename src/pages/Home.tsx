import Header from "../components/Header";
import Stories from "../components/Stories";
import Post from "../components/Post";

export default function Home() {
  return (
    <div className="home-page">

      <Header />

      <main className="home-content">

        <section className="welcome-banner">
          <h1>Welcome to Mingle 💜</h1>

          <p>
            Where People Don't Just Connect...
            They Belong.
          </p>
        </section>

        <Stories />

        <Post />
        <Post />
        <Post />

      </main>

    </div>
  );
}
