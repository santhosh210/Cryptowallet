// src/App.tsx

import React from "react";
import Dashboard from "./components/dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
// import Login from "./pages/loginPage";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <Navbar logos={""} email={""} avatars={""} />
        <Dashboard />
        <Footer />
        {/* <Login /> */}
      </main>
    </div>
  );
};

export default App;
