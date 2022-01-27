const playerPositions : any = {
	player1: {x: 0, y: 10, z: 0}
}

// player position getter and setter. Used in a frame loop, so not ideal to use selectors
// TODO: add a nearest player getter

export function getPosition(player: string) : {x : number, y : number, z : number} {
	return playerPositions[player]
}

export function setPosition(player: string, pos: {x : number, y : number, z : number}) : void {
	playerPositions[player] = pos
}