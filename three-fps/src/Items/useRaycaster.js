import { useThree } from "@react-three/fiber"
import { useEffect } from "react"
import { Raycaster } from "three"
import { useDispatch } from "react-redux"
import { objectActions } from "../Reducers/objectSlice"

const raycaster = new Raycaster()

export const useGun = (damage, slot, ammo, parentID) => {
  const camera = useThree((state) => state.camera)
  const scene = useThree((state) => state.scene)
  const dispatch = useDispatch()

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (ammo > 0) {
        raycaster.setFromCamera({x: 0, y: 0}, camera)
        const intersects = raycaster.intersectObjects(scene.children)
        var doesIntersect = false
        var intersectID = null

        dispatch(objectActions.decrementAmmo({
          objectID: parentID,
          ammo: 1,
          slot: slot
        }))

        for(let i = 0; i < intersects.length; i++) {
          if (intersects[i].object.userData.id) {
            doesIntersect = true
            intersectID = intersects[i].object.userData.id
            break;
          }
        }
        
        if (!doesIntersect) {
          return
        }
        dispatch(objectActions.decrementHealth({
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

  return ammo
}