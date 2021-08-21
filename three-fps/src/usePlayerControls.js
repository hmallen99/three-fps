import { useEffect, useState } from "react"

const keys = { KeyW: "forward", KeyS: "backward", KeyA: "left", KeyD: "right", Space: "jump" }
const moveFieldByKey = (key) => keys[key]

const usePlayerControls = (velocity) => {
  const [movement, setMovement] = useState({
    forward: false, 
    backward: false, 
    left: false,
    right: false, 
    jump: {
      jump: false,
      jumpCount: 0,
      jumpHeld: false,
    }
  })
  useEffect(() => {
    const handleKeyPress = (e) => setMovement((m) => {
      if (moveFieldByKey(e.code) == "jump") {
        console.log(m.jump.jumpCount)
        if (m.jump.jumpHeld) {
          return {
            ...m,
            jump: { jump: false, jumpCount: m.jump.jumpCount, jumpHeld: true }
          }
        }
        else if (Math.abs(velocity.current[1]) > 0.05 && m.jump.jumpCount < 2) {
          return {
            ...m,
            jump: { jump: true, jumpCount: m.jump.jumpCount + 1, jumpHeld: true }
          }
        }
        else if (Math.abs(velocity.current[1]) > 0.05 && m.jump.jumpCount >= 2) {
          return {
            ...m,
            jump: { jump: false, jumpCount: m.jump.jumpCount + 1, jumpHeld: true}
          }
        }
        else {
          return {
            ...m,
            jump: { jump: true, jumpCount: 1, jumpHeld: true }
          }
        }
      }
      else {
        return {
          ...m,
        }
      }
    })

    const handleKeyDown = (e) => setMovement((m) => {
      
      if (moveFieldByKey(e.code) != "jump") {
        return { ...m, [moveFieldByKey(e.code)]: true }
      }
      else {
        return { ...m }
      }
    })

    const handleKeyUp = (e) => setMovement((m) => {
      if (moveFieldByKey(e.code) != "jump") {
        return { ...m, [moveFieldByKey(e.code)]: false }
      }
      else {
        return {
          ...m,
          jump: { jump: false, jumpCount: m.jump.jumpCount, jumpHeld: false }
        }
      }
    })

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)
    document.addEventListener("keypress", handleKeyPress)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
      document.removeEventListener("keypress", handleKeyPress)
    }
  }, [])
  return movement
}

export default usePlayerControls;