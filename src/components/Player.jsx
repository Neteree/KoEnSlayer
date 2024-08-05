import { useState } from "react";
import "./Player.css";

function Player({
  translationInput,
  setTranslationInput,
  translation,
  setNewTranslationPair,
  isInCombat,
  setIsInCombat,
}) {
  const [score, setScore] = useState(0);

  const handleAnimationEnd = (event) => {
    const player = event.target;
    const weapon = player.querySelector(".weapon");

    if (event.animationName == "walk") {
      if (translation == translationInput.toLowerCase()) {
        player.style.animation = "idle 0.5s steps(3) 1";
        weapon.style.animation = "attack 0.5s steps(5) 1";
        weapon.style.opacity = 1;
        setScore((previousScore) => previousScore + 1);
      } else {
        player.style.animation = "hit 0.5s steps(5) 1";
        setScore((previousScore) => previousScore - 1);
      }
    }

    if (event.animationName == "idle" || event.animationName == "hit") {
      player.style.animation = "walk-back 0.75s steps(4) 1";
      player.style.translate = "0 0 ";
      weapon.style.animation = "none";
      weapon.style.opacity = 0;
    }

    if (event.animationName == "walk-back") {
      setTranslationInput("");
      setNewTranslationPair();
      setIsInCombat(false);
    }
  };

  return (
    <>
      <p>Score: {score}</p>
      <div
        className="pixelated player"
        onAnimationEnd={handleAnimationEnd}
        style={{
          translate: isInCombat && "96px 0",
          animation: isInCombat && "walk 0.75s steps(4) 1",
        }}
      >
        <pre className="player-translation">
          {translationInput == "" ? "Translation Input" : translationInput}
        </pre>
        <div className="weapon" />
      </div>
    </>
  );
}

export default Player;
