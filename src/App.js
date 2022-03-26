import "./App.scss";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";

function App() {
  const [userName, setUserName] = useState("");
  const [levelsData, setLevelsData] = useState(null);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route
            path="/home"
            render={() => (
              <Homepage
                userName={userName}
                setUserName={setUserName}
                setLevelsData={setLevelsData}
              />
            )}
          />
          <Redirect exact from="/" to="/home" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
