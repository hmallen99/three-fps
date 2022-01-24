import { ReactElement } from "react"

export type LoadoutListItemProps = {
	name: string,
	maxAmmo: number,
	damage: number,
	onClick: () => null,
}

export default function LoadoutListItem(props: LoadoutListItemProps) : ReactElement {

	return (
		<div>
			<button onClick={props.onClick} >
				<h1>{props.name}</h1>
				<h2>Damage: {props.damage}</h2>
				<h2>Max Ammo: {props.maxAmmo}</h2>
			</button>
		</div>
	)
}