import "./App.css";
import { motion } from "framer-motion";
import React, { useState } from "react";

function App() {
  const [isBoxMoved, setIsBoxMoved] = useState(false);

  const handleButtonClick = () => {
    setIsBoxMoved(true);
  };

  return (
    <>
      <button onClick={handleButtonClick}>{isBoxMoved ? "on" : "off"}</button>
      <motion.div
        style={{
          width: 100,
          height: 100,
          background: "red",
        }}
        animate={{ y: isBoxMoved ? 320 : 0 }}
        transition={{ duration: 2, repeat: 0 }}
      />
    </>
  );
}

export default App;
