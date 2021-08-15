import './App.css';
import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, FlyControls } from '@react-three/drei'


function Box(props) {
  const mesh = useRef()

  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  })

  return (
    <mesh
      {...props}
      ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  )
}


function App() {
  // TODO: Add custom camera
  

  return (
    <div id="canvas-container">
      <Canvas>
        <PerspectiveCamera makeDefault position = {[0, 0, 10]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
        <OrbitControls />
        <FlyControls autoForward={false} dragToLook={false} movementSpeed={1.0} rollSpeed={1.0} />
      </Canvas>
    </div>
  );
}

export default App;
