import { useEffect, useState } from "react"

const keys : any = { KeyW: "forward", KeyS: "backward", KeyA: "left", KeyD: "right", Space: "jump" }
const moveFieldByKey = (key : string) => keys[key]

/**
 * A React Hook that handles keyboard inputs for moving the character.
 * WASD are movements, Space is jump. Players can press space twice in
 * a row to double jump.
 * 
 * WASD adapted in part from Maksim Ivanov 
 * "React Minecraft": https://www.youtube.com/watch?v=Lc2JvBXMesY&t=124s
 * 
 * @param {*} velocity Player's current velocity, used to improve responsiveness
 * of jumping when just returning to the ground
 * @returns a dictionary of movements, set to true if currently in action
 */
const useMovementControls = (velocity: React.MutableRefObject<number[]>) => {
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
		const handleKeyPress = (e : KeyboardEvent) => setMovement((m) => {
			if (moveFieldByKey(e.code) === "jump") {
				if (m.jump.jumpHeld) {
					return {
						...m,
						jump: { jump: false, jumpCount: m.jump.jumpCount, jumpHeld: true }
					}
				}
				else if (Math.abs(velocity.current[1]) > 0.5 && m.jump.jumpCount < 2) {
					return {
						...m,
						jump: { jump: true, jumpCount: m.jump.jumpCount + 1, jumpHeld: true }
					}
				}
				else if (Math.abs(velocity.current[1]) > 0.5 && m.jump.jumpCount >= 2) {
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
					jump: { jump: false, jumpCount: m.jump.jumpCount, jumpHeld: true }
				}
			}
		})

		const handleKeyDown = (e : KeyboardEvent) => setMovement((m) => {
      
			if (moveFieldByKey(e.code) !== "jump") {
				return { ...m, [moveFieldByKey(e.code)]: true }
			}
			else {
				return { ...m }
			}
		})

		const handleKeyUp = (e : KeyboardEvent) => setMovement((m) => {
			if (moveFieldByKey(e.code) !== "jump") {
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
	})
	return movement
}

export default useMovementControls