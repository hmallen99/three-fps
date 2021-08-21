import { useEffect, useState } from "react"


keys = { Key1: 0, Key2: 1, Key3: 2, Key4: 3 }
const getInventorySlot = (e) => keys[e.code]

const useInventoryControls = (velocity) => {
  const [slot, setSlot] = useState(0)
  useEffect(() => {
    const handleKeyDown = (e) => setSlot(getInventorySlot(e))

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])
  return slot
}

export default useInventoryControls;