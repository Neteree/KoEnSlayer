import "./App.css";
import shuffle from "./util/shuffle";
import { useEffect, useState } from "react";
import Player from "./components/Player";
import Enemy from "./components/Enemy";
import TranslationForm from "./components/TranslationForm";

function App() {
  const [isInCombat, setIsInCombat] = useState(false);
  const [translationInput, setTranslationInput] = useState("");
  const [translationPair, setTranslationPair] = useState([]);
  const [translationPairs, setTranslationPairs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://localhost:7245/api/TranslationPairs"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const transformedData = data.map((item) => [item.korean, item.english]);

        setTranslationPairs(transformedData);
        setTranslationPair(shuffle(shuffle(transformedData)[0]));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
