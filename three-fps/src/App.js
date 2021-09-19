import './App.css';
import { Canvas } from '@react-three/fiber'
import { Sky, PointerLockControls } from '@react-three/drei'
import { Player } from './Player/Player'
import { Ground } from './Terrain/Ground'
import { Cube } from './Terrain/Cube'
import { Physics } from '@react-three/cannon'



function App() {
  return (
    <div id="canvas-container" style={{"height" : "100%"}}>
      <Canvas
        shadows
        gl={{ alpha: false }}
        camera={{ fov: 85 }}>
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Physics gravity={[0, -30, 0]} defaultContactMaterial={{contactEquationStiffness: 1e10}}>
          <Ground />
          <Player />
          <Cube position={[0, 0.5, -10]} />
          <Cube position={[10, 0.5, -10]} />
        </Physics>
        <PointerLockControls />
      </Canvas>
    </div>
  );
}

export default App;
