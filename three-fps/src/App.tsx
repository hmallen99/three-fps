import "./App.css"
import World from "./World"
import Home from "./Home"
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom"


export default function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/world">
					<World />
				</Route>
			</Switch>
		</Router>
	)
}