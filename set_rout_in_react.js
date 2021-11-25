import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./data/routes";

<Router>
        <Switch>
          {routes.map((route, index) => (
            <Route {...route} key={index} />
          ))}
        </Switch>
      </Router>


////////////////////////////////////////////////////
// Route file :-
import { Redirect } from "react-router";

import firstLog "../firstLog";
import secondlog from "../secondlog";
import Home from "../home";


function route(path, component, exact = true) {
  return { path, component, exact };
}

const routes = [
  route("/", () => <Redirect to="/loginpage" />),
   route("/mypage", Home),
  route("/first/login", firstLog),
  route("/second/page", secondlog),
  
];

export default routes;


























