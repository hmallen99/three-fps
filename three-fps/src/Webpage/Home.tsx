import { ReactElement } from "react"
import { Link } from "react-router-dom"

export default function Home() : ReactElement {
	return (
		<div>
			<h1>Three FPS</h1>
			<h2>By Henry Allen</h2>
			<Link to="/world">
				<button>Enter the Game</button>
			</Link>
		</div>
	)
}