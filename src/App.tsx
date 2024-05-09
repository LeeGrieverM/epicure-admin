import HomePage from './components/HomePage/HomePage'
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import {paths} from './data/constants';

function App() {

  return (
    <Router>
    <Routes>
    <Route
            path={`${paths.root}`}
            element={
                <HomePage
                />
            }
        />
        <Route
            path={`${paths.restaurants}`}
            element={
                <HomePage
                />
            }
        />
        <Route
            path={`${paths.chefs}`}
            element={
                <HomePage />
            }
        />
        <Route
            path={`${paths.dishes}`}
            element={
                <HomePage />
            }
        />
    </Routes>
</Router>
  )
}

export default App
