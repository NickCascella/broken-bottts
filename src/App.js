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
import { ThemeProvider } from "@mui/system";
import theme from "./utils/theme";

function App() {
  const [userName, setUserName] = useState("");
  const [levelsData, setLevelsData] = useState(null);
  const [newRecord, setNewRecord] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="app">
          <Switch>
            <Route
              path="/home/:param"
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
            <Redirect path="*" to="/home/main" />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
