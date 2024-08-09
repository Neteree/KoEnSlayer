import "./Game.css";
import shuffle from "../util/shuffle";
import { useEffect, useState } from "react";
import Player from "./Player";
import Enemy from "./Enemy";
import TranslationForm from "./TranslationForm";

function Game({ translationPairs }) {
  const [isInCombat, setIsInCombat] = useState(false);
  const [translationInput, setTranslationInput] = useState("");
  const [translationPair, setTranslationPair] = useState([]);

  useEffect(() => {
    setTranslationPair(shuffle(shuffle(translationPairs)[0]));
  }, []);

  return (
    <div className="game">
      <div>
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
      </div>
    </div>
  );
}

export default Game;
