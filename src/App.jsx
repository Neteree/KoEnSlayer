import "./App.css";
import { useState } from "react";
import Player from "./components/Player";
import Enemy from "./components/Enemy";

function App() {
  const [isInCombat, setIsInCombat] = useState(false);
  return (
    <>
      <Player isInCombat={isInCombat} setIsInCombat={setIsInCombat} />
      <Enemy isInCombat={isInCombat} setIsInCombat={setIsInCombat} />
      <button className="button" onClick={() => setIsInCombat(true)}>
        go
      </button>
    </>
  );
}

export default App;
