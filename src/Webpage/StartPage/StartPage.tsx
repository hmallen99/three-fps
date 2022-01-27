import { ReactElement } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { destructibleActions } from "../../Game/Reducers/destructibleSlice"

const defaultConfig = {
	object2: {
		componentType: "Cube",
		props: {
			position: [0, 0.5, -10],
			objectID: "object2",
		},
		health: 100,
	},
	object3: {
		componentType: "Cube",
		props: {
			position: [10, 0.5, -10],
			objectID: "object3",
		},
		health: 100,
	},
	zombie1: {
		componentType: "Zombie",
		props: {
			position: [20, 0.5, -10],
			objectID: "zombie1",
			speed: 3,
		},
		health: 100,
	},
	zombie2: {
		componentType: "Zombie",
		props: {
			position: [20, 0.5, 0],
			objectID: "zombie2",
			speed: 3,
		},
		health: 100,
	}
}


export default function StartPage(props: any) : ReactElement {
	const dispatch = useDispatch()

	const loadGame = () => {
		dispatch(destructibleActions.addDestructibles(defaultConfig))
	}

	return (
		<div>
			<h1>Start Game</h1>
			<table id="button-table">
				<tr>
					<td>
						<button className="button2 menu-button-secondary" onClick={loadGame}>LOAD GAME</button>
					</td>
					<td>
						<Link to="/world">
							<button className="button1 menu-button-primary">START GAME</button>
						</Link>
					</td>
				</tr>
			</table>
		</div>
	)
}