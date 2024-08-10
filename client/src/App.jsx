import "./App.css";
import { useEffect, useState } from "react";
import Game from "./components/Game";
import TranslationPairsManger from "./components/TranslationPairsManger";

function App() {
  const [isInGame, setIsInGame] = useState(true);
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

        setTranslationPairs(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (translationPairs.length > 0) {
    return (
      <>
        <h1>KoEn Slayer</h1>
        <button onClick={() => setIsInGame(!isInGame)}>
          {isInGame ? "Manage translation pairs" : "Return to game"}
        </button>

        {isInGame ? (
          <Game
            translationPairs={translationPairs.map((item) => [
              item.korean,
              item.english,
            ])}
          />
        ) : (
          <TranslationPairsManger
            translationPairs={translationPairs}
            setTranslationPairs={setTranslationPairs}
          />
        )}
      </>
    );
  }
}

export default App;
