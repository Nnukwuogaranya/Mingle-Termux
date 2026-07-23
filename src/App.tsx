import React from "react";

import "./App.css";

import HomeHeader from "./components/HomeHeader";
import SearchBar from "./components/SearchBar";
import DiscoverCards from "./components/DiscoverCards";
import PiHubCard from "./components/PiHubCard";
import WelcomeCard from "./components/WelcomeCard";
import CreatePost from "./components/CreatePost";
import Feed from "./components/Feed";
import FriendSuggestions from "./components/FriendSuggestions";
import Messenger from "./components/Messenger";
import BottomNavigation from "./components/BottomNavigation";

function App() {
  return (
    <div className="mingle-app">

      <HomeHeader />

      <main className="home-container">

        <SearchBar />

        <DiscoverCards />

        <PiHubCard />

        <WelcomeCard />

        <CreatePost />

        <Feed />

        <FriendSuggestions />

        <Messenger />

      </main>

      <BottomNavigation />

    </div>
  );
}

export default App;


