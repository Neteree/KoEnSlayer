import "./App.css";
import React, { useState } from "react";

function App() {
  const [isInCombat, setIsBoxMoved] = useState(false);

  const handleAnimationEnd = (event) => {
    if (event.animationName == "walk") {
      const player = event.target;
      const weapon = player.querySelector(".weapon");

      player.style.animation = "idle 0.5s steps(3) 1";
      weapon.style.animation = "attack 0.5s steps(5) 1";
      weapon.style.opacity = 1;
    }

    if (event.animationName == "idle") {
      const player = event.target;
      const weapon = player.querySelector(".weapon");
      player.style.animation = "walkBack 0.75s steps(4) 1";
      weapon.style.animation = "none";
      weapon.style.opacity = 0;
      player.style.translate = 0;
    }

    if (event.animationName == "walkBack") {
      setIsBoxMoved(false);
    }
  };

  return (
    <>
      <div
        className="pixelated player"
        onAnimationEnd={handleAnimationEnd}
        style={{
          translate: isInCombat && "96px 0",
          animation: isInCombat && "walk 0.75s steps(4) 1",
        }}
      >
        <div className="pixelated weapon" style={{}} />
      </div>

      <button onClick={() => setIsBoxMoved(true)}>go</button>
    </>
  );
}

export default App;
