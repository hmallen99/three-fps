import { useThree } from "@react-three/fiber"
import { useEffect } from "react"
import { Raycaster } from "three"
import { useDispatch } from "react-redux"
import { destructibleActions } from "../Reducers/destructibleSlice"

const raycaster = new Raycaster()

/**
 * This React hook handles weapon firing. On the user's click,
 * it will decrement the ammo in this weapon, then send out a ray from
 * the center of the screen, and try to damage the first object that it
 * intersects with.
 *
 * @param {*} damage Amount of damage that this weapon does
 * @param {*} slot Which inventory slot this weapon is in
 * @param {*} ammo Current amount of ammo in this inventory slot
 * @param {*} parentID objectID of parent holding this item
 * @returns
 */
export const useGun = (damage: number, slot: number, ammo: number, parentID: string) : void => {
	const camera = useThree((state) => state.camera)
	const scene = useThree((state) => state.scene)
	const dispatch = useDispatch()

	useEffect(() => {
		const handleMouseDown = () => {
			if (ammo > 0) {
				raycaster.setFromCamera({x: 0, y: 0}, camera)
				const intersects = raycaster.intersectObjects(scene.children)
				let doesIntersect = false
				let intersectID = null

				dispatch(destructibleActions.decrementAmmo({
					objectID: parentID,
					ammo: 1,
					slot: slot
				}))

				for(let i = 0; i < intersects.length; i++) {
					if (intersects[i].object.userData.id) {
						doesIntersect = true
						intersectID = intersects[i].object.userData.id
						break
					}
				}

				if (!doesIntersect) {
					return
				}

				dispatch(destructibleActions.decrementHealth({
					objectID: intersectID,
					damageAmount: damage
				}))
			}
		}

		document.addEventListener("mousedown", handleMouseDown)

		return () => {
			document.removeEventListener("mousedown", handleMouseDown)
		}
	})
}