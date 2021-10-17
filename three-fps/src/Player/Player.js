import { useSelector } from "react-redux";
import { PlayerController } from "./PlayerController";

export function Player(props) {
  const health = useSelector((state) => state.objects[props.objectID].health)
  const ammo = useSelector((state) => state.objects[props.objectID].ammo)

  return (
    <PlayerController 
      objectID={props.objectID} 
      health={health}
      ammo={ammo}
      configs={[
        {
          damage: 20,
          color: "green",
        },
        {
          damage: 10,
          color: "red",
        },
        {
          damage: 40,
          color: "yellow",
        },
        {
          damage: 25,
          color: "blue",
        }
      ]}
      parentID={props.objectID}
      {...props} 
    />
  )
}