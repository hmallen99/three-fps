import { Player } from "./Player/Player"
import { Ground } from "./Terrain/Ground"
import { Cube } from "./Terrain/Cube"
import React, { ReactElement } from "react"
import { Zombie } from "./Zombies/Zombie"
import { useSelector } from "react-redux"
import { RootState } from "./Reducers/GameStore"

const destructibleComponents : any = {
	"Player": Player,
	"Cube": Cube,
	"Zombie": Zombie
}

/**
 * All of the objects in the game, including the terrain, destructibles,
 * and Players
 *
 * @returns All the objects in the Game, wrapped in a store provider
 * that handles updates to the objects
 */
function GameContainer() : ReactElement {
	const destructibles = useSelector((state: RootState) => state.destructibles.destructibles)
	const gameChildren = []

	for (const name in destructibles) {
		const data = destructibles[name]

		const gameComponent = destructibleComponents[data.componentType]
		gameChildren.push(React.createElement(gameComponent, data.props))
	}

	return (
		<>
			<Ground />
			{gameChildren}
		</>
	)
}

export default GameContainer