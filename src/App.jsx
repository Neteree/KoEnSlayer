import "./App.css";
import shuffle from "./util/shuffle";
import { useState } from "react";
import Player from "./components/Player";
import Enemy from "./components/Enemy";
import TranslationForm from "./components/TranslationForm";

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

  return (
    <>
      <Player
        translationInput={translationInput}
        setTranslationInput={setTranslationInput}
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

      <TranslationForm
        translationInput={translationInput}
        setTranslationInput={setTranslationInput}
        setIsInCombat={setIsInCombat}
      />
    </>
  );
}

export default App;
