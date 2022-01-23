import "./Home.css"
import { ReactElement } from "react"
import { Link } from "react-router-dom"

export default function Home() : ReactElement {
	return (
		<div id="home-div">
			<h1>THREE ZOMBIES</h1>
			<h2>BY HENRY ALLEN</h2>
			<div id="vertical-center">
				<table id="button-table">
					<tr>
						<td>
							<Link to="/shop">
								<button className="button2 menu-button-secondary">SHOP</button>
							</Link>
						</td>
						<td>
							<Link to="/loadout">
								<button className="button2 menu-button-secondary">LOADOUT</button>
							</Link>
						</td>
						<td>
							<Link to="/start">
								<button className="button1 menu-button-primary">PLAY</button>
							</Link>
						</td>
						<td>
							<Link to="/avatar">
								<button className="button2 menu-button-secondary">AVATAR</button>
							</Link>
						</td>
						<td>
							<Link to="/settings">
								<button className="button2 menu-button-secondary">SETTINGS</button>
							</Link>
						</td>
					</tr>
				</table>
			</div>
		</div>
	)
}