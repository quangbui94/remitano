import { Switch } from "react-router-dom";
import RouteWrapper from "./components/RouteWrapper";
import Layout from "./components/Layout/Layout";
import Home from "./routes/Home/Home";
import Share from "./routes/Share/Share";

const App = () => {
  return (
    <Switch>
      <RouteWrapper exact path="/" component={Home} layout={Layout} />
      <RouteWrapper path="/share" component={Share} layout={Layout} />
    </Switch>
  );
};

export default App;
