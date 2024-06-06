import { useState } from "react";
import "./App.css";
import P_WinningResult from "./pages/P_WinningResult";

function App() {
  const [count, setCount] = useState(0);

  return <P_WinningResult />;
}

export default App;
