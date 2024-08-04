import "./Player.css";

function Player({ isInCombat, setIsInCombat }) {
  const handleAnimationEnd = (event) => {
    const player = event.target;
    const weapon = player.querySelector(".weapon");

    if (event.animationName == "walk") {
      player.style.animation = "idle 0.5s steps(3) 1";
      weapon.style.animation = "attack 0.5s steps(5) 1";
      weapon.style.opacity = 1;
    }

    if (event.animationName == "idle") {
      player.style.animation = "walkBack 0.75s steps(4) 1";
      player.style.translate = 0;
      weapon.style.animation = "none";
      weapon.style.opacity = 0;
    }

    if (event.animationName == "walkBack") {
      setIsInCombat(false);
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
        <div className="weapon" />
      </div>
    </>
  );
}

export default Player;
