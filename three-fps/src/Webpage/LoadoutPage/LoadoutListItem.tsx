import { ReactElement } from "react"

export type LoadoutListItemProps = {
	name: string,
	maxAmmo: number,
	damage: number,
	assetID: string,
	onClick: (assetIDToDisplay: string) => void,
}

export default function LoadoutListItem(props: LoadoutListItemProps) : ReactElement {

	return (
		<div>
			<button onClick={() => props.onClick(props.assetID)} >
				<h1>{props.name}</h1>
				<h2>Damage: {props.damage}</h2>
				<h2>Max Ammo: {props.maxAmmo}</h2>
			</button>
		</div>
	)
}