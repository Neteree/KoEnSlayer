import "./App.css";
import { motion } from "framer-motion";

function App() {
  return (
    <motion.div
      style={{
        width: 100,
        height: 100,
        background: "red",
      }}
      initial={{ x: 320 }}
      animate={{ y: 250 }}
      transition={{ duration: 2, repeat: 0 }}
    />
  );
}

export default App;
