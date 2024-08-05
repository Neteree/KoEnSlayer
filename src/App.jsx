import "./App.css";
import shuffle from "./util/shuffle";
import { useState } from "react";
import Player from "./components/Player";
import Enemy from "./components/Enemy";

function App() {
  const translationPairs = [
    ["hello", "안녕하세요"],
    ["water", "물"],
  ];

  const [isInCombat, setIsInCombat] = useState(false);
  const [translationInput, setTranslationInput] = useState("");
  const [translationPair, setTranslationPair] = useState(
    shuffle(shuffle(translationPairs)[0])
  );

  const handleTranslation = (event) => {
    setTranslationInput(event.target.value);
  };

  return (
    <>
      <Player
        translationInput={translationInput}
        translation={translationPair[0]}
        setNewTranslationPair={() =>
          setTranslationPair(shuffle(shuffle(translationPairs)[0]))
        }
        isInCombat={isInCombat}
        setIsInCombat={setIsInCombat}
      />
      <Enemy
        translationInput={translationInput}
        translationPair={translationPair}
        isInCombat={isInCombat}
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsInCombat(true);
        }}
      >
        <div className="translation-box">
          <label className="translation-label" htmlFor="translation">
            Translation Input:
          </label>
          <input
            id="translation"
            type="text"
            value={translationInput}
            onChange={handleTranslation}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </>
  );
}

export default App;
