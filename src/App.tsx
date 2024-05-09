import HomePage from "./components/HomePage/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { paths } from "./data/constants";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={`${paths.root}`} element={<HomePage />} />
        <Route path={`${paths.dashboard}`} element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
