import "./Enemy.css";

function Player({ isInCombat, setIsInCombat }) {
  const handleAnimationEnd = (event) => {
    const player = event.target;

    if (event.animationName == "enemy-walk") {
      player.style.animation = "enemy-idle 0.5s steps(3) 1";
    }

    if (event.animationName == "enemy-idle") {
      player.style.animation = "enemy-walk-back 0.75s steps(3) 1";
      player.style.translate = "192px 0";
    }
  };

  return (
    <>
      <div
        className="pixelated enemy"
        onAnimationEnd={handleAnimationEnd}
        style={{
          translate: isInCombat && "108px 0",
          animation: isInCombat && "enemy-walk 0.75s steps(3) 1",
        }}
      ></div>
    </>
  );
}

export default Player;
