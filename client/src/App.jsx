import "./App.css";
import { useEffect, useState } from "react";
import Game from "./components/Game";
import TranslationPairsManger from "./components/TranslationPairsManger";

function App() {
  const [isInGame, setIsInGame] = useState(false);
  const [translationPairs, setTranslationPairs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>KoEn Slayer</h1>
      <button
        disabled={translationPairs.length == 0}
        onClick={() => translationPairs.length > 0 && setIsInGame(!isInGame)}
      >
        {isInGame ? "Manage translation pairs" : "Practice translation pairs"}
      </button>

      {isInGame ? (
        <Game
          translationPairs={translationPairs.map((translationPair) => [
            translationPair.korean,
            translationPair.english,
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

export default App;
