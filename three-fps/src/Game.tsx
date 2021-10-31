import { Player } from "./Player/Player"
import { Ground } from "./Terrain/Ground"
import { Cube } from "./Terrain/Cube"
import { Provider } from "react-redux"
import store from "./Reducers/objectStore"
import { ReactElement } from "react"

/**
 * All of the objects in the game, including the terrain, destructibles,
 * and Players
 * 
 * @returns All the objects in the Game, wrapped in a store provider
 * that handles updates to the objects
 */
function Game() : ReactElement {
	return (
		<Provider store={store}>
			<Ground />
			<Player objectID={"player1"} />
			<Cube position={[0, 0.5, -10]} objectID={"object2"}/>
			<Cube position={[10, 0.5, -10]} objectID={"object3"}/>
		</Provider>
	)
}

export default Game