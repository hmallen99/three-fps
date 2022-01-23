import { Player } from "./Player/Player"
import { Ground } from "./Terrain/Ground"
import { Cube } from "./Terrain/Cube"
import { Provider } from "react-redux"
import store from "./Reducers/GameStore"
import { ReactElement } from "react"
import { Zombie } from "./Zombies/Zombie"

/**
 * All of the objects in the game, including the terrain, destructibles,
 * and Players
 *
 * @returns All the objects in the Game, wrapped in a store provider
 * that handles updates to the objects
 */
function GameContainer() : ReactElement {
	return (
		<Provider store={store}>
			<Ground />
			<Player position={[0, 1, 0]} objectID={"player1"} />
			<Cube position={[0, 0.5, -10]} objectID={"object2"}/>
			<Cube position={[10, 0.5, -10]} objectID={"object3"}/>
			<Zombie position={[20, 0.5, -10]} objectID={"zombie1"} speed={3}/>
		</Provider>
	)
}

export default GameContainer