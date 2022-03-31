import "./App.scss";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Gamepage from "./pages/Gamepage/Gamepage";

function App() {
  const [userName, setUserName] = useState("");
  const [levelsData, setLevelsData] = useState(null);
  const [newRecord, setNewRecord] = useState(null);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route
            exact
            path="/home"
            render={() => (
              <Homepage
                userName={userName}
                setUserName={setUserName}
                setLevelsData={setLevelsData}
                newRecord={newRecord}
              />
            )}
          />
          <Route
            path="/home-highscores"
            render={() => (
              <Homepage
                userName={userName}
                setUserName={setUserName}
                setLevelsData={setLevelsData}
                newRecord={newRecord}
              />
            )}
          />
          <Route
            path="/broken-bottts"
            render={() => (
              <Gamepage
                userName={userName}
                levelsData={levelsData}
                setNewRecord={setNewRecord}
              />
            )}
          />
          <Redirect path="*" to="/home" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
