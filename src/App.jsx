import "./App.css";
import { useState } from "react";
import Player from "./components/Player";
import Enemy from "./components/Enemy";

function App() {
  const [isInCombat, setIsInCombat] = useState(false);
  const [translation, setTranslation] = useState("");

  const handleTranslation = (event) => {
    setTranslation(event.target.value);
  };

  return (
    <>
      <Player
        translation={translation}
        isInCombat={isInCombat}
        setIsInCombat={setIsInCombat}
      />
      <Enemy isInCombat={isInCombat} setIsInCombat={setIsInCombat} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsInCombat(true);
          console.log(translation);
        }}
      >
        <div className="translation-box">
          <label className="translation-label" htmlFor="translation">
            Translation:
          </label>
          <input
            id="translation"
            type="text"
            value={translation}
            onChange={handleTranslation}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </>
  );
}

export default App;
