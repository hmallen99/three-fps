import { Player } from './Player/Player'
import { Ground } from './Terrain/Ground'
import { Cube } from './Terrain/Cube'
import { Provider } from 'react-redux'
import store from './Reducers/objectStore'


function Game() {
  return (
    <Provider store={store}>
      <Ground />
      <Player objectID={"player1"} />
      <Cube position={[0, 0.5, -10]} objectID={"object2"}/>
      <Cube position={[10, 0.5, -10]} objectID={"object3"}/>
    </Provider>
  )
}

export default Game;