import React, { createContext, useContext, useState } from "react";
import Profile from "./Components/Profile";
import Settings from "./Components/Settings";

export const ThemeContext = createContext();

export function App() {
  const [lightTheme, setTheme] = useState(true);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      return !prevTheme;
    });
  };

  return (
    <ThemeContext.Provider value={lightTheme}>
      <div className="App">
        <button onClick={toggleTheme}>Toggle Theme</button>
        <div>
          <Profile></Profile>
          <ThemeContext.Provider value={!lightTheme}>
            <Settings></Settings>
          </ThemeContext.Provider>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
