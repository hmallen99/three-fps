import { useThree } from "@react-three/fiber"
import { useEffect, useState } from "react"
import { Raycaster } from "three"
import { getItem } from "../UUID"

const raycaster = new Raycaster()

export const useSingleDamage = (damage) => {
  const camera = useThree((state) => state.camera)
  const scene = useThree((state) => state.scene)

  useEffect(() => {
    const handleMouseDown = (e) => {
      raycaster.setFromCamera({x: 0, y: 0}, camera)
      const intersects = raycaster.intersectObjects(scene.children)
  
      for(let i = 0; i < intersects.length; i++) {
        if (intersects[i].object.userData.id) {
          const item = getItem(intersects[i].object.userData.id)
          item.doDamage(damage)
        }
      }
    }

    document.addEventListener("mousedown", handleMouseDown)

    return () => {
      document.removeEventListener("mousedown", handleMouseDown)
    }
  })
}

export const useMultipleDamage = (damage, rate) => {
  return null
}