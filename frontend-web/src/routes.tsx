import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./Pages/Home";
import Records from "./Pages/Records";
import Charts from "./Pages/Charts";

const Routes = () => (
	<Router>
		<Header />
		<Switch>
			<Route path="/" exact>
				<Home />
			</Route>
			<Route path="/records">
				<Records />
			</Route>
			<Route path="/charts">
				<Charts />
			</Route>
		</Switch>
	</Router>
);

export default Routes;
