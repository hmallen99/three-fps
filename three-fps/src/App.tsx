import "./App.css"
import World from "./Game/World"
import Home from "./Webpage/Home"
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom"
import LoadoutPage from "./Webpage/LoadoutPage/LoadoutPage"
import AvatarPage from "./Webpage/AvatarPage/AvatarPage"
import ShopPage from "./Webpage/ShopPage/ShopPage"
import SettingsPage from "./Webpage/SettingsPage/SettingsPage"
import StartPage from "./Webpage/StartPage/StartPage"
import store from "./Game/Reducers/GameStore"
import { Provider } from "react-redux"


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
				<Route path="/settings">
					<SettingsPage />
				</Route>
				<Route path="/shop">
					<ShopPage />
				</Route>
				<Route path="/avatar">
					<AvatarPage />
				</Route>
				<Route path="/loadout">
					<LoadoutPage />
				</Route>
				<Route path="/start">
					<Provider store={store} >
						<StartPage />
					</Provider>
				</Route>
			</Switch>
		</Router>
	)
}