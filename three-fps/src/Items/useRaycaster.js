import { useThree } from "@react-three/fiber"
import { useEffect, useState } from "react"
import { Raycaster } from "three"
import { getAPI } from "../storeAPI"

const raycaster = new Raycaster()

export const useGun = (damage, slot, ammo, parentID) => {
  const camera = useThree((state) => state.camera)
  const scene = useThree((state) => state.scene)

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (ammo > 0) {
        raycaster.setFromCamera({x: 0, y: 0}, camera)
        const intersects = raycaster.intersectObjects(scene.children)
    
        for(let i = 0; i < intersects.length; i++) {
          if (intersects[i].object.userData.id) {
            const api = getAPI(intersects[i].object.userData.id)
            api.doDamage(damage)
          }
        }
        getAPI(parentID).setAmmo(slot, ammo - 1)
      }
    }

    document.addEventListener("mousedown", handleMouseDown)

    return () => {
      document.removeEventListener("mousedown", handleMouseDown)
    }
  })

  return ammo
}