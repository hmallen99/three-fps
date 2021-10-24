import { useEffect, useState, useRef } from "react"


const keys : any = { Digit1: 0, Digit2: 1, Digit3: 2, Digit4: 3 }

/**
 * React hook that handles keyboard inputs for switching between inventory
 * items.
 * 
 * @returns inventory slot that the playerhas switched to and a ref to the
 * item in the slot
 */
const useInventoryControls = () => {
	const slotRef = useRef<any>()

	const [slot, setSlot] = useState({ slotRef: slotRef, nextSlot: 0 })

	useEffect(() => {
		const handleKeyDown = (e : KeyboardEvent) => setSlot(() => {
			if (e.code in keys) {
				const nextSlot = keys[e.code]
				return {
					slotRef: slotRef,
					nextSlot: nextSlot,
				}
			} else {
				return {
					...slot
				}
			}
		})

		document.addEventListener("keydown", handleKeyDown)
		return () => {
			document.removeEventListener("keydown", handleKeyDown)
		}
	})
	return slot
}

export default useInventoryControls