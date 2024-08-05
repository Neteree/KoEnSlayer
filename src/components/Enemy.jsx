import "./Enemy.css";

function Enemy({ translationInput, translationPair, isInCombat }) {
  const handleAnimationEnd = (event) => {
    const player = event.target;

    if (event.animationName == "enemy-walk") {
      if (translationPair[0] == translationInput.toLowerCase()) {
        player.style.animation = "enemy-hit 0.5s steps(4) 1";
      } else {
        player.style.animation = "enemy-attack 0.5s steps(2) 1";
      }
    }

    if (
      event.animationName == "enemy-attack" ||
      event.animationName == "enemy-hit"
    ) {
      player.style.animation = "enemy-walk-back 0.75s steps(3) 1";
      player.style.translate = "192px 0";
    }
  };

  return (
    <div
      className="pixelated enemy"
      onAnimationEnd={handleAnimationEnd}
      style={{
        translate: isInCombat && "96px 0",
        animation: isInCombat && "enemy-walk 0.75s steps(3) 1",
      }}
    >
      <pre className="enemy-translation">{translationPair[1]}</pre>
    </div>
  );
}

export default Enemy;
